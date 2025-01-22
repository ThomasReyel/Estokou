<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('produtos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("nome");
            $table->string("fornecedor");
            $table->boolean("fragilidade");
            $table->integer("quantidade");
            $table->float("valorCompra");
            $table->float("valorVenda");
        });
    }
    public function down()
    {
        Schema::dropIfExists('produtos');
    }
};
