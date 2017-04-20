<?php
	echo $_GET['metodo']($_GET['id']);

	function hola($id){
		echo "Probando metodo: '".urldecode($id)."'";
	}
?>

<a href="php/prueba.php?metodo=hola&id='.urlencode($fila['rfc_empresa']).'">Clickeame</a>