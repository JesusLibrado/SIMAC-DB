<?php
session_start();
require('config.php');

unset($_SESSION);
session_destroy();
mysqli_close($conexion);

header("Location: ../index.php");
die();
?>