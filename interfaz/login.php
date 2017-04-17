<?php
	session_start();
	require('php/sesiones.php');
?>

<!DOCTYPE html>
<html>	
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>SIMAC</title>

	<link href="https://fonts.googleapis.com/css?family=Alegreya+Sans|Cuprum" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="estilos/fonts.css">
	<link rel="stylesheet" type="text/css" href="estilos/login.css">
</head>
<body>

	<div class="login">
		<img src="logo/logo-min.jpeg">
		<input type="text" id="loginUsuario" class="input-100 font-b" placeholder="Usuario" readonly>
		<input type="password" id="loginContrasena" class="input-100 font-b" placeholder="Contraseña">
		<button id="btnLogin" class="font-b">Entrar</button>
		<br>
		<div class="mensaje font-a"></div>
	</div>

	<script type="text/javascript" src="extras/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>