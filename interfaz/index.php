<?php
	session_start();

	if(isset($_SESSION['usuario']) and $_SESSION['estado'] == 'autenticado'){
		include('pagina.php');
		die();
	}else{
		include('login.php');
		die();
	}
?>