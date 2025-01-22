<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Bom dia</h1>
    <form action="http://localhost:8000/api/usuarios" method="POST">
        <input type="text" placeholder="nome" name="nome">
        <input type="text" placeholder="email" name="email">
        <input type="password" placeholder="senha" name="senha">
        <input type="hidden" name="_token" value="<?php echo e(csrf_token()); ?>" />
        <button>Enviar</button>
    </form>


</body>
</html><?php /**PATH D:\Users\Downloads\Projeto\Estokou\estokouBackEnd\resources\views/welcome.blade.php ENDPATH**/ ?>