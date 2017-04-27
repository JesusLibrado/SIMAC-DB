<?php
	include_once('config.php');

	$sql = $_GET['metodo']();

	if(!mysqli_query($con,$sql))
		die("No fue posible realizar la accion: ".mysqli_error($con));

	function empresaEliminar(){
		$id = $_GET['id'];
		return "delete from empresa where rfc = '".$id."'";
	}

	function empleadoEliminar(){
		$id = $_GET['id'];
		return "delete from empleado where rfc = '".$id."'";
	}

	function facturaEliminar(){
		$id = $_GET['id'];
		return "delete from factura where folio = ".$id;
	}

	function cotizacionEliminar(){
		$id = $_GET['id'];
		return "delete from cotizacion where folio = ".$id;
	}

	
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
	
	/*
	function insertarEmpleado(){

	}
	*/
		
?>