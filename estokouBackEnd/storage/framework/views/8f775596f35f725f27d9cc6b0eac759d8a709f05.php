<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Bom dia</h1>
    <form action="http://localhost:8000/api/pacotes" method="POST">
        <input type="number" placeholder="id do Usuário" name="id_estoque">
        <input type="text" placeholder="nome" name="nome">
        <input type="number" placeholder="peso" name="peso">
        <input type="number" placeholder="quantidade" name="quantidade">
        <input type="checkbox" name="fragilidade" id="1">
        <input type="hidden" name="_token" value="<?php echo e(csrf_token()); ?>" />
        <button>Enviar</button>
    </form>


</body>
</html><?php /**PATH D:\Users\Downloads\Códigos\projeto\estokou1\resources\views/pack.blade.php ENDPATH**/ ?>