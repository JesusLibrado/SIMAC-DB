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

	<div class="modal" id="empresa">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close">&times</span>
				<p class="font-a">Empresas</p>
			</div>
			<div class="modal-body font-b">
					<div class="extra-buttons">
						<a href="#">
							<i class="fa fa-user-plus fa-lg" aria-hidden="true"></i>
							<i class="fa fa-times fa-lg" aria-hidden="true" style="display: none; color: #D50000"></i>
						</a>
						<button>
							<input type="text" id="inputSearch" class="font-b" placeholder="buscar">
							<i class="fa fa-search-plus fa-2x" aria-hidden="true"></i>
						</button>
					</div>
				<div class="tabla" style="display: block">
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
											<button class="more-info btnMasInfo">
												<i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>
											</button>
											<button class="delete-button delete-empresa" id="'.urlencode($fila['rfc_empresa']).'">
												<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
											</button>
										</div>
									</div>';
							}
							echo '</div>';
						}else
							echo '<p class="not-found">Tabla vacía</p>';
					?>
				</div>
				<div class="nuevo-elemento" id="nuevaEmpresa" style="display: none">
					<p>Hola</p>
				</div>
			</div>
		</div>
	</div>

	<script type="text/javascript" src="extras/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>