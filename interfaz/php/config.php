<?php
	$server="localhost";
	$user="root";
	$pwd="Lucas12:32";
	$db = "simac";

	$con=mysqli_connect($server,$user,$pwd,$db);

	if(!$con)
		die("Conexion fallida: ".mysqli_connect_error() . PHP_EOL);
?>