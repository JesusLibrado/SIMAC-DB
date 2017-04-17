<?php
	$server="localhost";
	$user="root";
	$pwd="Lucas12:32";

	$con=mysqli_connect($server,$user,$pwd);

	if(!$con)
		die("Conexion fallida: ".mysqli_connect_error() . PHP_EOL);

	mysqli_close($con);
?>