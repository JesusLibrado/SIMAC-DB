<?php
	session_start();

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
		<p class="font-b">SIMAC</p>
		<div class="navbar-menu font-b topBotomBordersOut">
			<a href="#empleado">Empleados</a>
			<a href="#empresa">Empresas</a>
			<a href="#gasto">Gastos</a>
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
				<div class="informacion" style="display: block">
					
				</div>
				<div class="nuevo-elemento nuevaEmpresa" style="display: none">
					<p>Agregar Nuevo</p>
					<input type="text" id="nuevaEmpresaRFC" placeholder="RFC">
					<input type="text" id="nuevaEmpresaNombre" placeholder="Nombre">
					<input type="text" id="nuevaEmpresaBanco" placeholder="Banco">
					<input type="number" id="nuevaEmpresaNumeroCuenta" placeholder="Numero de cuenta">
					<input type="number" id="nuevaEmpresaNumeroProveedor" placeholder="Numero de proveedor">
					<button id="btnNuevaEmpresa">Aceptar</button>
				</div>
				<div id="empresaConfirmarEliminar" class="modal">
					<div class="confirmar-elemento">
						<div class="modal-header">
							<h6 class="font-b">¿Eliminar?</h6>
						</div>
						<div class="confirmar-buttons">
							<button class="confirmar-continuar">Borrar</button>
							<button class="confirmar-cancelar">Cancelar</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>


	<div class="modal" id="empleado">
		<div class="modal-content">
			<div class="modal-header">
				<span class="close">&times</span>
				<p class="font-a">Empleados</p>
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
				<div class="informacion" style="display: block">
					
				</div>
				<div class="nuevo-elemento" id="nuevoEmpleado" style="display: none">
					<p>Agregar Nuevo</p>
					<input type="text" id="nuevoEmpleadoRFC" placeholder="RFC">
					<input type="text" id="nuevoEmpleadoCurp" placeholder="Curp">
					<input type="text" id="nuevoEmpleadoNss" placeholder="Numero de S.S">
					<input type="text" id="nuevoEmpleadoNombre" placeholder="Nombre">
					<input type="text" id="nuevoEmpleadoApellido" placeholder="Apellido">
					<input type="number" id="nuevoEmpleadoSalario" placeholder="Salario">
					<input type="date" id="nuevoEmpleadoFechaContratacion" placeholder="Fecha de contratacion">
					<input type="text" id="nuevoEmpleadoJefe" value="CAEF6805309K4" readonly>
					<br>
					<label for="nuevoEmpleadoActivo">¿Activo?</label>	
					<input type="checkbox" id="nuevoEmpleadoActivo">
					<button id="btnNuevoEmpleado">Aceptar</button>
				</div>
				<div class="modal" id="infoEmpleado">
					<div class="info-elemento" id="empleadoInfo">
						<div class="modal-header">
							<span class="close-popup">&times</span>
							<p class="font-a"></p>
						</div>
						<div class="info">

						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>

	<section class="container font-b">
		<div class="tabs font-a">
			<a class="tab-link" href="#factura">Facturas</a>
			<a class="tab-link" href="#cotizacion">Cotizaciones</a>
			<a class="tab-link" href="#trabajo">Trabajos</a>
		</div>

		<div class="tabs-section">
			<div id="factura" class="tab-content">
				
			</div>
			<div id="cotizacion" class="tab-content">

			</div>
			<div id="trabajo" class="tab-content">

			</div>
		</div>
	</section>

	<div class="float-right">
		<a class="agregar font-a" id="agregarNuevo">Agregar</a>
		<div class="filtros">
			<div id="facturaFiltro">
			
			</div>
			<div id="cotizacionFiltro">
						
			</div>
			<div id="trabajoFiltro">
						
			</div>
		</div>
	</div>

	<div class="modal" id="facturaAgregar">
		<div class="nuevo-form">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Agregar Factura</p>
			</div>
			<div class="form font-b">
				<input type="text" id="nuevaFacturaFolio" placeholder="Folio">
				<input type="number" id="nuevaFacturaMonto" placeholder="Monto">
				<input type="date" id="nuevaFacturaFecha" placeholder="Fecha">
				<select name="nuevaFacturaFormaPago">
					<option value="Deposito">Deposito</option>
					<option value="Efectivo">Efectivo</option>
					<option value="Transferencia">Transferencia</option>
					<option value="Otro">Otro</option>
				</select>
				<select class="foliosTrabajo" name="facturaFolioTrabajo">
					
				</select>
				<select class="rfcsEmpresa" name="facturaRfcEmpresa">

					
				</select>
			</div>
		</div>
	</div>
<!--Parte de rafiki, agregar nueva cotizacion-->
	<div class="modal" id="cotizacionAgregar">
		<div class="nuevo-form">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Agregar Cotizacion</p>
			</div>
			<div class="form font-b">
				<input type="number" id="nuevaCotizacionFolio" placeholder="Folio">
				<input type="date" id="nuevaCotizacionMonto" placeholder="Fecha">
				<input type="text" id="nuevaCotizacionCondicionPago" placeholder="Condicion de pago">
				<input type="text" id="nuevaCotizacionMonto" placeholder="Monto">

				<select class="rfcsEmpresa" name="cotizacionRFCSolicitante">

				</select>
				<select class="foliosTrabajo"  name="cotizacionFolioTrabajo">
					
				</select>
				<input type="date" id="nuevaCotizacionFechaEntregaDeseada" placeholder="Fecha de entrega deseada">
				<input type"number" id="nuevaCotizacionNumeroOrdenCompra" placeholder="Numero de orden de compra">
			</div>
		</div>
	</div>
<!--Parte de rafiki, agregar nuevo trabajo-->
	<div class="modal" id="trabajoAgregar">
		<div class="nuevo-form">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Agregar Trabajo</p>
			</div>
			<div class="form font-b">
				<input type="number" id="nuevoTrabajoFolio" placeholder="Folio">
				<select name="trabajoServicio">
					<option value="Reparacion">Reparacion</option>
					<option value="Fabricacion">Fabricacion</option>
					<option value="Limpieza">Limpieza</option>
					<option value="Mantenimiento">Mantenimiento</option>
					<option value="Maquinado">Maquinado</option>
					<option value="Suministro">Suministro</option>
					<option value="Cambios">Cambios</option>
					<option value="Instalacion">Instalacion</option>
					<option value="Otros">Otros</option>
				</select>
				<input type="text" id="nuevoTrabajoDescripcion" placeholder="Descripcion">
			</div>
		</div>
	</div>
<!--Termina parte de rafiki-->

	<div class="modal" id="infoPopUp">
		<div class="info-elemento">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a"></p>
			</div>
			<div class="info font-b">

			</div>
		</div>
	</div>

	<div id="confirmarEliminar" class="modal">
		<div class="confirmar-elemento">
			<div class="modal-header">
				<h6 class="font-b">¿Eliminar?</h6>
			</div>
			<div class="confirmar-buttons">
				<button class="confirmar-continuar">Borrar</button>
				<button class="confirmar-cancelar">Cancelar</button>
			</div>
		</div>
	</div>
		

	<script type="text/javascript" src="extras/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>