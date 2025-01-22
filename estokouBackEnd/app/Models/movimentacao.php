<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Movimentacao extends Model
{
    use HasFactory;
    
    protected $fillable = [
     'id_estoque',"id_prod",'quantidadeMovi','operacao',"data","valorTotal"
    ];
    
}
