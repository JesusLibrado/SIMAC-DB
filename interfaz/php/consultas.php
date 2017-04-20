<?php
	include_once('config.php');

	$sql = $_GET['metodo']($_GET['id']);

	if(!mysqli_query($con,$sql))
		die("No fue posible realizar la accion: ");

	function eliminarEmpresa($id){
		return "delete from empresa where rfc_empresa = '".urldecode($id)."'";
	}

	function eliminarEmpleado($rfc){
		return "delete from empleado where rfc = '".urldecode($rfc)."'"	;
	}

	/*
	function insertarEmpresa();

	function insertarEmpleado();
	*/	
		
?>