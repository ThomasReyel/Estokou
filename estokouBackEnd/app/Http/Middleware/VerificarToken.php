<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Http;

class VerificarToken
{
    /**
     * Verifica se tem um token SUAP válido na seção.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        # A autorização é feita com o token Bearer do SUAP
        $suap_token = $request->bearerToken();
        # Se a requisição não tem o token, retorna erro
        if (empty($suap_token)) {
            return response()->json([
                'tipo' => 'erro',
                'conteudo' => 'Token SUAP não informado.'
            ], 400);
        }

        /* Sempre que uma requisição chega, é necessário verificar se o token 
           SUAP é válido. Esse processo, porém, gera um atraso nas 
           requisições.
           Para evitar esse atraso, abrimos mão de um pouco de segurança e
           verificamos o token apenas de vez em quando.
           Guardamos todos os tokens verificados na memória cache do servidor,
           durante um curto período.
           Quando o período acaba, o token some do cache e repetimos a
           verificação. */
        $verificado = Cache::has($suap_token);
        if (!$verificado) {
            /* *Alerta de Gambiarra*: Não consegui encontrar na documentação
                do SUAP um URI para verificar esse tipo de token. Tem um que
                funciona, mas para outros tokens.
                A alternativa que pensei foi enviar uma requisição HEAD para
                um URI que necessitasse de autenticação. Dessa forma, se
                desse 200 OK, o token estaria válido. Porém o SUAP não aceita 
                requisições HEAD. Então tive que mandar esse GET mesmo.
                Funciona. Viva a gambiarra. */
            $resp = Http::acceptJson()
                ->withToken($suap_token)
                ->get('https://suap.ifrn.edu.br/api/v2/minhas-informacoes/meus-dados/')
                ->getStatusCode();
            $invalido = $resp != 200;
            # Se não está no cache, precisa ser verificado no SUAP
            # Retorna erro se o token expirou ou é inválido
            if ($invalido) {
                return response()->json([
                    'tipo' => 'erro',
                    'conteudo' => 'Token inválido ou expirado.'
                ], $resp);
            }

            # Se o token é válido, salva em cache. O cache exige que associemos
            # algum valor ao token, por isso passamos o valor true.
            # O parâmetro seconds é o tempo que demoraremos para verificar o
            # token novamente.
            Cache::put($suap_token, true, $seconds=10);
        }

        # Passou na verificação
        return $next($request);
    }
}
