<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('movimentacaos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->integer("id_estoque");
            $table->integer("id_prod");
            $table->date("data");
            $table->float("valorTotal");
            $table->integer("quantidadeMovi");
            $table->boolean("operacao");
        });
    }
    public function down()
    {
        Schema::dropIfExists('movimentacaos');
    }
};
