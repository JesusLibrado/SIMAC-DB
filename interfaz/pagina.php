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


<!--Botones de queries-->
	<div class="float-right">
		<a class="agregar font-a" id="agregarNuevo">Agregar</a>
		<div class="filtros">
			<div id="facturaFiltro">
				<button class="search-btn font-a" id="facturaEntreConMonto">Buscar entre fechas y montos</button>
				<button class="search-btn font-a" id="facturasPagadasPorEmpresa">Por empresa</button>
				<button class="search-btn font-a" id="facturasDeTrabajo">Por folio de trabajo</button>
				<button class="search-btn font-a" id="facturasDeFecha">Buscar por fecha</button>
				<button class="search-btn font-a" id="facturaConFolio">Buscar folio</button>
			</div>
			<div id="cotizacionFiltro">
				<button class="search-btn font-a" id="cotizacionConFolio">Buscar folio</button>
			</div>
			<div id="trabajoFiltro">
				<button class="search-btn font-a" id="trabajosDeEmpleado">Trabajos de empleado</button>
				<button class="search-btn font-a" id="trabajoConFolio">Buscar trabajos por folio</button>
				<button class="search-btn font-a" id="acumuladoEnFacturasDeTrabajo">Acumulado facturado de un trabajo</button>
			</div>
		</div>
	</div>

<!--AGREGA FACTURAS-->
	<div class="modal" id="facturaAgregar">
		<div class="nuevo-form">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Agregar Factura</p>
			</div>
			<div class="form font-b">
				<input type="number" id="nuevaFacturaFolio" placeholder="Folio">
				<input type="text" id="nuevaFacturaMonto" placeholder="Monto">
				<input type="date" id="nuevaFacturaFecha" value="" placeholder="Fecha">
				<select id="nuevaFacturaFormaPago" class="font-b">
					<option value="Deposito">Deposito</option>
					<option value="Efectivo">Efectivo</option>
					<option value="Transferencia">Transferencia</option>
					<option value="Otro">Otro</option>
				</select>
				<select class="foliosTrabajo font-b" id="nuevaFacturaFolioTrabajo">
					
				</select>
				<select class="rfcsEmpresa font-b" id="nuevaFacturaRfcEmpresa">

				</select>
				<button id="btnNuevaFactura">Aceptar</button>
			</div>
		</div>
	</div>

<!--AGREGA COTIZACION-->
	<div class="modal" id="cotizacionAgregar">
		<div class="nuevo-form">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Agregar Cotizacion</p>
			</div>
			<div class="form font-b">
				<input type="number" id="nuevaCotizacionFolio" placeholder="Folio">
				<input type="date" id="nuevaCotizacionFecha" placeholder="Fecha">
				<input type="text" id="nuevaCotizacionCondicionPago" placeholder="Condicion de pago">
				<input type="text" id="nuevaCotizacionMonto" placeholder="Monto">

				<select class="rfcsEmpresa font-b" id="nuevaCotizacionRFCSolicitante">

				</select>
				<select class="foliosTrabajo font-b"  id="nuevaCotizacionFolioTrabajo">
					
				</select>
				<input type="date" id="nuevaCotizacionFechaEntregaDeseada" placeholder="Fecha de entrega deseada">
				<input type"number" id="nuevaCotizacionNumeroOrdenCompra" placeholder="Numero de orden de compra">
				<button id="btnNuevaCotizacion">Aceptar</button>
			</div>
		</div>
	</div>

<!--AGREGA TRABAJO-->
	<div class="modal" id="trabajoAgregar">
		<div class="nuevo-form">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Agregar Trabajo</p>
			</div>
			<div class="form font-b">
				<input type="number" id="nuevoTrabajoFolio" placeholder="Folio">
				<select id="trabajoServicio" class="font-b">
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
				<textarea id="nuevoTrabajoDescripcion" class="font-b" placeholder="Descripcion"></textarea>
				<button id="btnNuevoTrabajo">Aceptar</button>
			</div>
		</div>
	</div>

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

	<div class="modal" id="infoContacto">
		<div class="info-elemento">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Contacto</p>
			</div>
			<div class="info font-b">

			</div>
			<div class="map font-b">
				
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

	<div class="modal" id="queryPopUp">
		<div class="info-elemento">
			<div class="modal-header">
				<span class="close-popup">&times</span>
				<p class="font-a">Consulta de factura</p>
			</div>
			<div class="info font-b">

			</div>
		</div>
	</div>

	<script type="text/javascript" src="extras/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="js/script.js"></script>
</body>
</html>