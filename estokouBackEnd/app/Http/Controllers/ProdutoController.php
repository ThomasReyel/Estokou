<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class ProdutoController extends Controller
{

    public function index()
    {
        $id = request()->input('id');
        $produtos = DB::table('produtos');
        if ($id) {
            $produtos->where('id', '=', $id);
        }
        return $produtos->get();
    }

    public function store(Request $request)
    {
        $nome = $request->input('nome');
        $fornecedor = $request->input('fornecedor');
        $quantidade = $request->input('quantidade');
        $valorCompra = $request->input('valorCompra');
        $valorVenda = $request->input('valorVenda');
        $fragilidade = $request->input('fragilidade');
        if ($fragilidade == null) {
            $fragilidade = false;
        } else {
            $fragilidade = true;
        }
        $p = Produto::create(['nome' => $nome, 'fornecedor' => $fornecedor, 'quantidade' => $quantidade, 'valorCompra' => $valorCompra, 'valorVenda' => $valorVenda, 'fragilidade' => $fragilidade]);
        $id = $p->id;
        return response(
            ['location' => route('produtos.show', $id)],
            201
        );
    }

    public function show(Produto $produto)
    {
        return response($produto, 200);
    }

    public function update(Produto $produto)
    {
        $nome = request()->input('nome');
        if ($nome)
            $produto->nome = $nome;
        $fornecedor = request()->input('fornecedor');
        if ($fornecedor)
            $produto->fornecedor = $fornecedor;
        $valorCompra = request()->input('valorCompra');
        if ($valorCompra)
            $produto->valorCompra = $valorCompra;
        $valorVenda = request()->input('valorVenda');
        if ($valorVenda)
            $produto->valorVenda = $valorVenda;
        $quantidade = request()->input('quantidade');
        if ($quantidade)
            $produto->quantidade = $quantidade;
        $fragilidade = request()->input('fragilidade');
        if ($fragilidade) {
            $produto->fragilidade = $fragilidade;
        }
        $produto->save();
    }

    public function destroy(Produto $produto)
    {
        $produto->delete();
    }
}
