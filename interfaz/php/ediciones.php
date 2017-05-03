<?php
	include_once('config.php');

	$sql = $_GET['metodo']();

	if(!mysqli_query($con,$sql))
		die("No fue posible realizar la accion: ".mysqli_error($con));

//INSERTS
	function insertarEmpresa(){
		$rfc = $_GET['id'];
		$nombre = $_GET['nombre'];
		$banco = $_GET['banco'];
		$numero_proveedor = $_GET['num_proveedor'];
		$numero_cuenta = $_GET['num_cuenta'];

		return "insert into empresa values(
					'".$rfc."',
					'".$nombre."',
					'".$banco."',
					".$numero_cuenta.",
					".$numero_proveedor."
					)";
	}

	function insertarCotizacion()
	{
		$folio = $_GET['folio'];
		$fecha = $_GET['fecha'];
		$condiciones_pago = $_GET['condicionesPago'];
		$monto = $_GET['monto'];
		$rfc_solicitante = $_GET['rfcSolicitante'];
		$folio_trabajo = $_GET['folioTrabajo'];
		$fecha_entrega_deseada = $_GET['fechaEntregaDeseada'];
		$numero_orden_compra = $_GET['NumeroOrdenCompra'];

		return "insert into cotizacion values(
			".$folio.",
			'".$fecha."',
			'".$condiciones_pago."',
			".$monto.",
			'".$rfc_solicitante."',
			".$folio_trabajo.",
			'".$fecha_entrega_deseada."',
			".$numero_orden_compra."
		)";
	}

	function insertarTrabajo()
	{
		$folio = $_GET['folio'];
		$servicio = $_GET['servicio'];
		$descripcion = $_GET['descripcion'];

		return "insert into trabajo values(
			".$folio.",
			'".$servicio."',
			'".$descripcion."'
		)";
	}

	function insertarFactura()
	{
		$folio = $_GET['id'];
		$monto = $_GET['monto'];
		$fecha = $_GET['fecha'];
		$forma_pago = $_GET['formaPago'];
		$folio_trabajo = $_GET['folioTrabajo'];
		$rfc_empresa = $_GET['rfcEmpresa'];

		return "insert into factura values(
			".$folio.",
			".$monto.",
			'".$fecha."',
			'".$forma_pago."',
			".$folio_trabajo.",
			'".$rfc_empresa."'
		)";
	}

	function insertaRealiza()
	{
		$folio_trabajo = $_GET['folioTrabajo'];
		$rfc_empleado = $_GET['rfcEmpleado'];

		return "insert into realiza values(
			".$folio_trabajo.",
			'".$rfc_empleado."'
		)";
	}

	function insertGasto()
	{
		$fecha = $_GET['fecha'];
		$total = $_GET['total'];
		$material = $_GET['material'];
		$mano_obra = $_GET['manoObra'];
		$luz = $_GET['luz'];
		$gasolina = $_GET['gasolina'];
		$registrado_por = $_GET['registradoPor'];

		return "insert into gasto values(
			'".$fecha."',
			".$total.",
			".$material.",
			".$mano_obra.",
			".$luz.",
			".$gasolina.",
			'".$registrado_por."'
		)";
	}

	function insertInfoContactoEmpleado()
	{
		$rfc_empleado = $_GET['rfcEmpleado'];
		$num_celular = $_GET['numCelular'];
		$correo_electronico = $_GET['email'];

		return "insert into info_contacto_empleado values(
			'".$rfc_empleado."',
			'".$num_celular."',
			'".$fecha."'
		)";
	}

	function insertDireccionEmpleado()
	{
		$rfc_empleado = $_GET['rfcEmpleado'];
		$municipio = $_GET['municipio'];
		$colonia = $_GET['colonia'];
		$calle = $_GET['calle'];
		$numero = $_GET['numero'];
		$telefono = $_GET['telefono'];

		return "insert into direccion_empleado values(
			'".$rfc_empleado."',
			'".$municipio."',
			'".$colonia."',
			'".$calle."',
			".$numero.",
			'".$telefono."'
		)";
	}

	function insertarEmpleado(){
		$rfc = $_GET['id'];
		$curp = $_GET['curp'];
		$nss = $_GET['nss'];
		$activo = $_GET['activo'];
		$salario = $_GET['salario'];
		$fecha_contratacion = $_GET['fecha_contratacion'];
		$jefe = $_GET['jefe'];
		$nombre = $_GET['nombre'];
		$apellido = $_GET['apellido'];

		return "insert into empleado values(
					'".$rfc."',
					'".$curp."',
					'".$nss."',
					".$activo.",
					".$salario.",
					'".$fecha_contratacion."',
					'".$jefe."',
					'".$nombre."',
					'".$apellido."'
					)";

	}

//DELETES

//para poder eliminar tuplas que tienen campos referenciados, primero hay que eliminar las tuplas con esas referencias foraneas
	function facturaEliminar(){
		$id = $_GET['id'];
		return "delete from factura where folio = ".$id;
	}

	function empresaEliminar(){
		$id = $_GET['id'];
		return "delete from empresa where rfc = '".$id."'";
	}

	function empleadoEliminar(){
		$id = $_GET['id'];
		return "delete from empleado where rfc = '".$id."'";
	}

	function cotizacionEliminar(){
		$id = $_GET['id'];
		return "delete from cotizacion where folio = ".$id;
	}

	function trabajoEliminar(){
		$id = $_GET['id'];
		return "delete from trabajo where folio = ".$id;
	}
	
	function gastoEliminar()
	{
		$id = $_GET['id'];
		return "delete from gasto where fecha = '".$id."'";
	}

	function realizaEliminar()
	{
		$id = $_GET['id'];
		$id2 = $_GET['id2'];
		return "delete from realiza where rfc_empleado = '".$id."' and folio_trabajo = ".$id2;
	}

	function direccionEliminar()
	{
		$id = $_GET['id'];
		return "delete from direccion_empleado where rfc_empleado = '".$id."'";
	}

	function contactoEliminar()
	{
		$id = $_GET['id'];
		return "delete from info_contacto_empleado where rfc_empleado = '".$id."'";
	}
?>