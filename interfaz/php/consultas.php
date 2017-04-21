<?php
	include_once('config.php');

	$sql = $_GET['metodo']();

	$resultado=mysqli_query($con,$sql);

	if(mysqli_num_rows($resultado)>0){
		echo json_encode(mysqli_fetch_array($resultado, MYSQLI_BOTH));
		mysqli_free_result($resultado);
	}else
		die("No hay resultados para esta consulta ".mysqli_error($con));

	function selectEmpresa(){
		$id = $_GET['id'];
		return "select * from empresa where rfc_empresa = '".urldecode($id)."'";
	}		
?>