<?php

namespace App\Http\Controllers;

use App\Models\Movimentacao;
use Illuminate\Http\Request;
use App\Models\Estoque;
use App\Models\Produto;
use Illuminate\Support\Facades\DB;

class MovimentacaoController extends Controller
{
    public function index()
    {
        $idEstoque = request()->input('id_estoque');
        $movimentacao = DB::table('movimentacaos');
        if ($idEstoque) {
            $movimentacao->where('id_estoque', '=', $idEstoque);
        }
        return $movimentacao->get();
    }

    public function store(Request $request)
    {
        $idEstoque = $request->input('id_estoque');
        $estoque = Estoque::find($idEstoque);
        $idproduto = $request->input('id_prod');
        $produto = Produto::find($idproduto);
        if ($estoque) {
            $data = $request->input('data');
            $quantidadeMovi = $request->input('quantidadeMovi');
            $valorTotal = $request->input('valorTotal');
            $operacao = $request->input('operacao');
            // Nesse caso, como operação é um booleano, consideramos que true vai somar a quantidade e false vai subtrair
            if ($operacao == null) {
                $operacao = false;
            } else {
                $operacao = true;
            }
            /* 
            Aqui ele impede do usuário subtrair uma quantidade de um produto que não existe ou subtrair uma
            quantidade maior que a existente no produto
            */
            if (!$produto && !$operacao || $produto && $produto->quantidade < $quantidadeMovi && !$operacao) {
                return response(
                    ['error' => 'Você não pode subtrair de um produto que não existe ou subtrair uma quantidade maior que a existente'],
                    404
                );
                /* 
            Aqui atualiza a quantidade de produtos, adicionando ou subtraindo ao produto existente a quantidade
            informada na movimentação
            */
            } else if ($produto && $operacao == true) {
                $produto->quantidade += $quantidadeMovi;
                $produto->save();
            } else if ($produto && $operacao == false) {
                $produto->quantidade -= $quantidadeMovi;
                $produto->save();

                //Aqui cria um produto, caso ele não exista
            } else if (!$produto && $operacao) {
                $produto = Produto::create(['nome' => '???', 'quantidade' => $quantidadeMovi, 'preco' => 0, 'fragilidade' => false]);
            }
            $movimentacao = Movimentacao::create(['id_estoque' => $estoque->id, 'id_prod' => $produto->id, 'quantidadeMovi' => $quantidadeMovi, 'valorTotal' => $valorTotal, 'data' => $data, 'operacao' => $operacao]);

            return response(
                ['location' => route('movimentacaos.show', $movimentacao->id)],
                201
            );
        }
        return response(
            ['error' => 'Estoque nao encontrado'],
            404
        );
    }

    public function show(Movimentacao $movimentacao)
    {
        return response($movimentacao, 200);
    }


    public function update(Request $request, Movimentacao $movimentacao)
    {
        $idEstoque = $request->input('id_estoque');
        # TODO: Avisar ao usuário que ele não pode trocar o id do estoque, caso ele tente
        if ($idEstoque != $movimentacao->id_estoque) {
            return response('O id informado é diferente do original', status: 400);
        }
        $idproduto = request()->input('id_prod');
        if ($idproduto != $movimentacao->id_prod) {
            return response('O id do produto informado é diferente do original', status: 400);
        }
        $operacao = request()->input('operacao');
        if ($operacao == null) {
            $operacao = false;
        } else {
            $operacao = true;
        }
        if ($operacao)
            $movimentacao->operacao = $operacao;

        $quantidadeMovi = request()->input('quantidadeMovi');
        if ($quantidadeMovi)
            $movimentacao->quantidadeMovi = $quantidadeMovi;

        $data = request()->input('data');
        if ($data)
            $movimentacao->data = $data;

        $valorTotal = request()->input('valorTotal');
        if ($valorTotal)
            $movimentacao->valorTotal = $valorTotal;

        $movimentacao->save();
    }

    public function destroy(Movimentacao $movimentacao)
    {
        $movimentacao->delete();
    }
}
