<?php

use App\Models\Usuario;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\EstoqueController;
use App\Http\Controllers\MovimentacaoController;
use App\Models\Estoques;
use App\Models\Pacotes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('usuarios', UsuarioController::class);
Route::apiResource('produtos', ProdutoController::class);
Route::apiResource('estoques', EstoqueController::class);
Route::apiResource('movimentacaos', MovimentacaoController::class);