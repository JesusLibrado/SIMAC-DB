<?php
	include('config.php');

	$_POST['metodo']();

	function eliminarEmpresa(){

		$id = $_POST['id'];

		$sql = "delete from empresa where rfc_empresa = '$id'";
		$resultado=mysqli_query($con, $sql);

		if(mysqli_num_rows($resultado)>0)
			echo "Se hizo";
		else echo "NO SE HIZO";
	}

		
?>