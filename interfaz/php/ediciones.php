<?php
	include_once('config.php');

	$sql = $_GET['metodo']();

	if(!mysqli_query($con,$sql))
		die("No fue posible realizar la accion: ".mysqli_error($con));

	function empresaEliminar(){
		$id = $_GET['id'];
		return "delete from empresa where rfc = '".$id."'";
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

	function empleadoEliminar(){
		$id = $_GET['id'];
		return "delete from empleado where rfc = '".$id."'";
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

	function facturaEliminar(){
		$id = $_GET['id'];
		return "delete from factura where folio = ".$id;
	}

	function cotizacionEliminar(){
		$id = $_GET['id'];
		return "delete from cotizacion where folio = ".$id;
	}

	function trabajoEliminar(){
		$id = $_GET['id'];
		return "delete from trabajo where folio = ".$id;
	}
	
	
		
?>