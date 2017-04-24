<?php
	include_once('config.php');

	$sql = $_POST['metodo']();

	$resultado=mysqli_query($con,$sql);

	if(!$resultado)
		die("");

	$array = array(mysqli_num_rows($resultado));

	$i = 0;

	if(mysqli_num_rows($resultado)>0){

		while($fila = mysqli_fetch_array($resultado, MYSQLI_NUM)){
			$array[$i] = $fila;
			$i++;
		}
		echo json_encode($array);
		mysqli_free_result($resultado);
	}else
		die("");

	function selectEmpresaId(){
		$id = $_POST['id'];
		return "select * from empresa where rfc_empresa = '".$id."'";
	}

	function empresa(){
		return "select rfc_empresa, nombre, numero_proveedor from empresa";
	}

	function empleado(){
		return "select rfc, nombre, apellido from empleado";
	}
?>