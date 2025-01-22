<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{

    public function index()
    {
        $email = request()->input('email');
        $usuario = DB::table('usuarios');
        if ($email) {
            $usuario->where('email', '=', $email);
        }
        return $usuario->get();
    }

    public function store(Request $request)
    {
        $nome = $request->input('nome');
        $email = $request->input('email');
        $senha = $request->input('senha');
        $verificadorUsuario = Usuario::where('email', $email)->first();
        if ($verificadorUsuario) {
            return response(
                ['error' => 'Já existe um usuário com esse email'],
                409
            );
        } else {
            $p = Usuario::create(['nome' => $nome, 'email' => $email, 'senha' => $senha]);
            $id = $p->id;
            return response(
                ['location' => route('usuarios.show', $id)],
                201
            );
        }
    }

    public function show(Usuario $usuario)
    {
        return $usuario;
    }

    public function update(Usuario $usuario)
    {
        $nome = request()->input('nome');
        if ($nome)
            $usuario->nome = $nome;
        $email = request()->input('email');
        if ($email)
            $usuario->email = $email;
        $senha = request()->input('senha');
        if ($senha)
            $usuario->senha = $senha;
        $usuario->save();
    }

    public function destroy(Usuario $usuario)
    {
        $usuario->delete();
    }
}
