<?php
	require('config.php');
	$usuario = $_POST['usuario'];
	$pwd = $_POST['pwd'];

	if($usuario=="admin" and $pwd=="hola"){
		session_start();
		$_SESSION['usuario'] = $usuario;
		$_SESSION['estado'] = 'autenticado';
	}else{
		echo mysqli_error($con);
	}
?>