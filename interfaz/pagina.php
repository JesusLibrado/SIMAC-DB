<?php
	session_start();
	include_once('php/config.php');

	if(!isset($_SESSION['usuario']) and $_SESSION['estado'] != 'Autenticado') {
		header('Location: index.php');
	} else {
		$usuario = $_SESSION['usuario'];
		require('php/sesiones.php');
	}

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
	<link rel="stylesheet" type="text/css" href="estilos/main.css">
</head>
<body>
	<div id="menu">
		<img src="logo/logo-min.jpeg">
		<h3 class="font-b">Bienvenido, <?php echo $usuario?>!</h3>
		<div class="navbar-menu font-b topBotomBordersOut">
			<a href="#empleado">Empleados</a>
			<a href="#empresa" target="_self">Empresas</a>
			<a href="php/cerrar-sesion.php"><i class="fa fa-user-times" aria-hidden="true"></i></a>
		</div>
	</div>

	<div class="modal" id="empleado">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close">&times</span>
				<p class="font-a">Empleados</p>
			</div>
			<div class="modal-body font-b">
				<div class="tabla">
					<?php
						$sql = "select rfc, nombre, apellido, activo from empleado";
						$resultado = mysqli_query($con, $sql);
						if(mysqli_num_rows($resultado)>0){
							while($fila=mysqli_fetch_assoc($resultado)){
								echo '<a href="#" id="'.$fila['rfc_empresa'].'" class="more-info"><i class="fa fa-plus-square-o" aria-hidden="true"></i></a> '.$fila['nombre'].' '.$fila['apellido'];
							}
						}else
							echo '<p class="not-found">Tabla vacía</p>';
					?>
				</div>
			</div>
		</div>
	</div>

	<div class="modal" id="empresa" name="rfc_empresa">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close">&times</span>
				<p class="font-a">Empresas</p>
			</div>
			<div class="modal-body font-b">
				<div class="tables">
					<div class="extra-buttons">
						<a href="#">
							<i class="fa fa-user-plus fa-lg" aria-hidden="true"></i>
						</a>
						<a href="#">
							<input type="text" id="inputSearch" class="font-b" placeholder="buscar">
							<i class="fa fa-search-plus fa-lg" aria-hidden="true"></i>
						</a>
					</div>
					<?php
						$tabla = "empresa";
						$sql = "select rfc_empresa, nombre, numero_cuenta from $tabla";
						$resultado = mysqli_query($con, $sql);
						if(mysqli_num_rows($resultado)>0){
							echo '<div class="table">
									<div class="table-row">
										<div class="table-head">Nombre </div>
										<div class="table-head">No. de cuenta</div>
										<div class="table-head"></div>
									</div>';
							while($fila=mysqli_fetch_assoc($resultado)){
								echo '<div class="table-row">
										<div class="table-cell">
											'.$fila['nombre'].'
										</div>
										<div class="table-cell">
											'.$fila['numero_cuenta'].'
										</div>
										<div class="table-cell">
											<button id="'.$fila['rfc_empresa'].'" class="more-info btnMasInfo">
												<i class="fa fa-info-circle fa-2x fa-lg" aria-hidden="true"></i>
											</button>
											<button id="'.$fila['rfc_empresa'].'" class="delete-button btnBorrarElemento">
												<i class="fa fa-times-circle fa-2x fa-lg" aria-hidden="true"></i>
											</button>
										</div>
									</div>';
							}
							echo '</div>';
						}else
							echo '<p class="not-found">Tabla vacía</p>';
					?>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="extras/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>