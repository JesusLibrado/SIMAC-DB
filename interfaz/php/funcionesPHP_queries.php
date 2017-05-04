<?php

	include_once('config.php');

	$sql = $_POST['metodo']();

	$resultado=mysqli_query($con,$sql);

	if(!$resultado)
		die("");

	$array = array(mysqli_num_rows($resultado));

	$i = 0;

	if(mysqli_num_rows($resultado)>0){

		while($fila = mysqli_fetch_array($resultado, MYSQLI_BOTH)){
			$array[$i] = $fila;
			$i++;
		}
		echo json_encode($array);
		mysqli_free_result($resultado);
	}else
		die("");

	//Descripcion y folio de trabajos y fecha de cotizacion de trabajos tipo x realizados entre d1 y d2
	function trabajoTipoXRealizadosEntre()
	{
		$x = $_POST['tipo']; //x es una string que solo puede ser: 'Reparacion','Fabricacion','Limpieza','Mantenimiento','Maquinado','Suministro','Cambios','Instalacion','Otros'

		//d1 y d2 son strings en formato sql date 'yyyymmdd' e.g. '20170426'
		$d1 = $_POST['fecha1']; //[d1,d2]
		$d2 = $_POST['fecha2'];	

		return "select t.descripcion, t.folio, c.fecha 
    	from trabajo t INNER JOIN cotizacion c 
		ON c.folio_trabajo = t.folio 
    	where t.servicio = '".$x."' and c.fecha between '".$d1."' and '".$d2."'";
	}

//QUERIES EN PESTAÑA EMPLEADOS

	//Nombre y apellidos de empleados que han participado en algun trabajo cuya cotizacion fue solicitada por una empresa x
	function empleadosQueTrabajaronParaEmpresaX()
	{
		//string del nombre de la empresa
		$x = $_POST['nombre'];

		return "select distinct e.nombre, e.apellido 
		from empleado e 
		INNER JOIN (realiza r INNER JOIN (empresa em INNER JOIN cotizacion c ON em.rfc = c.rfc_solicitante) 
		ON r.folio_trabajo = c.folio_trabajo) ON e.rfc = r.rfc_empleado 
		where em.nombre = '".$x."'";
	}
	//Antiguedad de cierto empleado
	function antiguedadEmpleado()
	{
		//string del nombre y apellido del empleado
		$nombre = $_POST['nombre'];
		$apellido = $_POST['apellido']; 

		return "select e.fecha_contratacion, datediff(e.fecha_contratacion, curdate()) as 'Antiguedad (días)'
		from empleado e 
		where e.nombre = '".$nombre."' and e.apellido = '".$apellido."'";
	}
	//Nombre y appellido de los empleados bajo supervision de x
	function empleadoConJefeX()
	{
		//string del nombre y apellido del jefe
		$nombre = $_POST['nombre'];
		$apellido = $_POST['apellido']; 

		return "select e.nombre, e.apellido 
		from empleado e INNER JOIN empleado e1 ON e.jefe = e1.rfc 
		where e1.nombre = '".$nombre."' and e1.apellido = '".$apellido."'";
	}
	//Empleados que participaron en trabajo con folio X
	function empleadoTrabajaronEnX()
	{
		//int que es el folio del trabajo
		$x = $_POST['folio'];

		return "select e.nombre, e.apellido 
		from empleado e INNER JOIN realiza r ON r.rfc_empleado = e.rfc 
		where r.folio_trabajo = ".$x;
	}
	//la direccion de un empleado x
	function direccionEmpleadoX()
	{
		//string del nombre y apellido del empleado
		$nombre = $_POST['nombre'];
		$apellido = $_POST['apellido']; 

		return "select dir.municipio, dir.colonia, dir.calle, dir.numero, dir.telefono 
		from direccion_empleado dir INNER JOIN empleado e 
		ON e.rfc = dir.rfc_empleado 
		where e.nombre = '".$nombre."' and e.apellido = '".$apellido."'";
	}
	//la informacion de contacto de un empleado x
	function infoContactoEmpleadoX()
	{
		//string del nombre y apellido del empleado
		$nombre = $_POST['nombre'];
		$apellido = $_POST['apellido'];

		return "select con.num_celular, con.correo_electronico 
		from info_contacto_empleado con INNER JOIN empleado e 
		ON e.rfc = con.rfc_empleado 
		where e.nombre = '".$nombre."' and e.apellido = '".$apellido."'";
	}
	//nombre, apellido, fecha de contratacion y rfc de todos los empleados activos
	function empleadoActivos()
	{
		return "select e.nombre, e.apellido, e.fecha_contratacion, e.rfc
		from empleado e  
		where e.activo = 1";
	}

	//nombre, apellido, fecha de contratacion y rfc de todos los empleados no activos
	function empleadoNoActivos()
	{
		return "select e.nombre, e.apellido, e.fecha_contratacion, e.rfc
		from empleado e 
		where e.activo = 0";
	}

//QUERIES EN PESTAÑA EMPRESA

	//Folio, fecha y nombre de la empresa solicitante de las Cotizaciones realizadas entre d1 y d2
	function cotizacioneEntre()
	{
		//d1 y d2 son strings en formato sql date 'yyyymmdd' e.g. '20170426'
		$d1 = $_POST['fecha1']; //[d1,d2]
		$d2 = $_POST['fecha2'];	

		return "select c.folio, c.fecha, em.nombre 
		from cotizacion c INNER JOIN empresa em ON c.rfc_solicitante = em.rfc 
		where c.fecha between '".$d1."' and '".$d2."'";
	}

//QUERIES EN PESTAÑA GASTO 

	//Monto total de los gastos acumulado entre d1 y d2
	function gastoAcumuladoEntre()
	{
		//d1 y d2 son strings en formato sql date 'yyyymmdd' e.g. '20170426'
		$d1 = $_POST['fecha1']; //[d1,d2]
		$d2 = $_POST['fecha2'];	

		return "select sum(g.total) as 'Gasto acumulado' 
    	from gasto g 
   		where g.fecha between '".$d1."' and '".$d2."';";
	}
	//todos los gastos diarios que ha registrado el empleado x 
	function gastosRegistradosPorEmpleadoX()
	{
		//string del nombre y apellido del empleado
		$nombre = $_POST['nombre'];
		$apellido = $_POST['apellido'];

		return "select g.fecha, g.mano_obra, g.luz, g.gasolina, g.material, g.total 
		from gasto g INNER JOIN empleado e 
		ON g.registrado_por = e.rfc 
		where e.nombre = '".$nombre."' and e.apellido = '".$apellido."'";
	}
	//el maximo gasto en el periodo [d1,d2]
	function maxGastoEntre()
	{
		//d1 y d2 son strings en formato sql date 'yyyymmdd' e.g. '20170426'
		$d1 = $_POST['fecha1']; //[d1,d2]
		$d2 = $_POST['fecha2'];	

		return "select max(g.total), g.fecha 
		from gasto g 
		where g.fecha between '".$d1."' and '".$d2."'";
	}
	//Desglose del gasto de cierto dia x
	function gastoDiaX()
	{
		//x es una string en formato sql date 'yyyymmdd' e.g. '20170426'
		$x = $_POST['fecha'];

		return "select g.material, g.mano_obra, g.luz, g.gasolina, g.total 
		from gasto g 
		where g.fecha = '".$x."'";
	}

//QUERIES EN PESTAÑA FACTURAS

	//Folio, monto y fecha de facturas generadas entre d1 y d2 con monto menor o igual a f2 y mayor o igual a f1
	function facturaGeneradasEntreConMontoEntre()
	{
		//d1 y d2 son strings en formato sql date 'yyyymmdd' e.g. '20170426'
		$d1 = $_POST['fecha1']; //[d1,d2]
		$d2 = $_POST['fecha2'];	

		//f1 y f2 son los valores float inclusivos de los montos 
		$f1 = $_POST['monto1']; //[f1,f2]
		$f2 = $_POST['monto2'];

		return "select f.folio, f.monto, f.fecha 
    	from factura f 
    	where f.monto <= ".$f2." and f.monto >= ".$f1." and f.fecha between '".$d1."' and '".$d2."'";
	}	
	//el folio, monto y fecha de todas las facturas pagadas por la empresa x
	function facturaPagadasPorEmpresaX()
	{
		//string del nombre de la empresa
		$x = $_POST['id'];

		return "select f.folio, em.nombre, f.monto 
		from factura f INNER JOIN empresa em 
		ON f.rfc_empresa = em.rfc
		where f.rfc_empresa = '".$x."'";
	}

	//el folio, monto, fecha de cada factura correspondiente a un trabajo x
	function facturaDeTrabajoX()
	{
		//int del folio del trabajo
		$x = $_POST['folio'];

		return "select distinct(f.folio), f.fecha, f.monto 
		from factura f INNER JOIN trabajo t 
		ON f.folio_trabajo = ".$x;
	}
	//todas las facturas con fecha x
	function facturaFechaX()
	{
		$x = $_POST['fecha']; //string en formato sql date 'yyyymmdd' e.g. '20170426'

		return "select f.folio, f.fecha, f.monto 
		from factura f 
		where f.fecha = '".$x."'";
	}
	//la factura con folio x
	function facturaFolioX()
	{
		//int del folio de la factura
		$x = $_POST['folio'];

		return "select * 
		from factura f 
		where f.folio = ".$x;
	}

//QUERIES EN PESTAÑÁ TRABAJO

	//Info de trabajo y cotizacion donde trabajo un empleado x
	function trabajoDeEmpleadoX()
	{
		//string del nombre y apellido del empleado
		$rfc = $_POST['rfc'];

		return "select t.folio, t.servicio, c.folio, c.fecha
		from cotizacion c INNER JOIN(trabajo t INNER JOIN (empleado e INNER JOIN realiza r ON e.rfc = r.rfc_empleado) 
		ON t.folio = r.folio_trabajo) ON c.folio_trabajo = t.folio 
		where e.rfc = '".$rfc."'";
	}
	//el trabajo con un folio x
	function trabajoFolioX()
	{
		//int del folio del trabajo
		$x = $_POST['folio'];

		return "select * 
		from trabajo t 
		where t.folio = ".$x;
	}
	//El acumulado del monto de todas las facturas de un trabajo con folio x, así como el monto de la cotizacion de dicho trabajo
	function acumuladoFacturasDeTrabajoX()	
	{
		//int del folio del trabajo
		$x = $_POST['folio'];

		return "select sum(f.monto) as 'cantidad facturada', c.monto as 'costo del trabajo'
		from cotizacion c INNER JOIN factura f ON f.folio_trabajo = c.folio_trabajo 
		where c.folio_trabajo = ".$x;
	}

//QUERIES EN PESTAÑA COTIZACION

	//la cotizacion con un folio x
	function cotizacionFolioX()
	{
		//int del folio de la cotizacion
		$x = $_POST['folio'];

		return "select c.folio, e.nombre, c.monto, c.fecha from cotizacion c inner join empresa e where c.rfc_solicitante=e.rfc and c.folio=".$x;
	}
?>