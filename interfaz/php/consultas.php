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
		return "select * from empresa";
	}

	function selectEmpleadoId(){
		$id = $_POST['id'];
		return "select * from empleado where rfc = '".$id."'";
	}

	function empleado(){
		return "select * from empleado";
	} 

	function selectFacturaId(){
		$id = $_POST['id'];
		return "select * from factura where folio = '".$id."'";
	}

	function factura(){
		return "select f.folio, e.nombre, f.monto, f.fecha, f.forma_pago, f.folio_trabajo from factura f inner join empresa e on f.rfc_empresa = e.rfc";
	}

	function cotizacion(){
		return "select c.folio, e.nombre, c.monto, c.fecha, c.numero_orden_compra from cotizacion c inner join empresa e on c.rfc_solicitante = e.rfc";
	}
?>