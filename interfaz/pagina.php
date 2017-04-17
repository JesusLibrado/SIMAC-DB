<?php
	session_start();

	if(!isset($_SESSION['usuario']) and $_SESSION['estado'] != 'Autenticado') {
		header('Location: index.php');
	} else {
		$estado = $_SESSION['usuario'];
		$salir = '<a href="recursos/salir.php" target="_self">Cerrar sesión</a>';
		require('php/sesiones.php');
	};
?>

<!DOCTYPE html>
<html>	
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<title>Página principal de SIMAC</title>

	<link href="https://fonts.googleapis.com/css?family=Alegreya+Sans|Cuprum" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="extras/font-awesome/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="estilos/fonts.css">
	<link rel="stylesheet" type="text/css" href="estilos/navbar-menu.css">
</head>
<body>

	<div class="benvenida">
		<p>Bienvenido, <?php echo $_SESSION['usuario']?>!</p>
	</div>
	<div id="navbar-menu">
		<nav>
			<ul>
				<li><a href="#nuevo-empleado"><i class="fa fa-user-plus" aria-hidden="true"></i></a></li>
			</ul>
		</nav>
	</div>

	<div class="modal" id="nuevo-empleado">
		
	</div>

	<script type="text/javascript" src="extras/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>