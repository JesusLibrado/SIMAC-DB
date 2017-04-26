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
		return "select * from empresa where rfc = '".$id."'";
	}

	function empresa(){
		return "select rfc, nombre, numero_proveedor from empresa";
	}

	function selectEmpleadoId(){
		$id = $_POST['id'];
		return "select * from empleado where rfc = '".$id."'";
	}

	function empleado(){
		return "select rfc, nombre, apellido from empleado";
	} 

	function selectFacturaId(){
		$id = $_POST['id'];
		return "select * from factura where folio = '".$id."'";
	}

	function factura(){
		return "select f.folio, e.nombre, f.monto, f.fecha from factura f inner join empresa e on f.rfc_empresa = e.rfc";
	}
?>