/* 1.-
	Descripcion y folio de trabajos y fecha de cotizacion de trabajos tipo x realizados entre d1 y d2
		Donde x es una cadena de enum en la tabla trabajo, representando el tipo de servicio otorgado e.g. reparacion, fabricacion, etc
		d1 y d2 son variables date para delimitar el periodo de busqueda en la tabla cotizacion 
*/
		select t.descripcion, t.folio, c.fecha 
    	from trabajo t INNER JOIN cotizacion c 
		ON c.folio_trabajo = t.folio 
    	where t.servicio = 'x' and c.fecha between 'd1' and 'd2';
    
/*	2.- 
	Folio, monto y fecha de facturas generadas entre d1 y d2 con monto menor o igual a f2 y mayor o igual a f1
		Donde d1 y d2 son variables date que delimitan el periodo de busqueda
		f1 y f2 es el rango inclusivo del monto de las facturas  
*/	
		select f.folio, f.monto, f.fecha 
    	from factura f 
    	where f.monto <= f2 and f.monto >= f1 and f.fecha between 'd1' and 'd2';

/*	3.-
	Monto total del gasto acumulado entre d1 y d2
		donde d1 y d2 son variabels date que delimitan el periodo de busqueda
		la cantidad deseada es la suma de los montos totales de todos los gastos ubicados en el periodo 
*/
		select sum(g.total) as 'Gasto acumulado' 
    	from gasto g 
   		where g.fecha between 'd1' and 'd2';
    
/*	4.-
	Fecha de contratacion y Antiguedad del empleado t 
		donde t es el nombre y el apellido del trabajador
		la antiguedad se calcula usando la fecha actual y la fecha de contratacion en la tupla correspondiente de t
*/
 		select e.fecha_contratacion, datediff(e.fecha_contratacion, curdate()) as 'Antiguedad (días)'
		from empleado e 
		where e.nombre = 'tnombre' and e.apellido = 'tapellido';
	
/*	5.-
	Nombre y apellidos de empleados que han participado en algun trabajo cuya cotizacion fue solicitada por una empresa x
		donde x es el nombre de la empresa
*/
		select distinct e.nombre, e.apellido 
		from empleado e 
		INNER JOIN (realiza r INNER JOIN (empresa em INNER JOIN cotizacion c ON em.rfc = c.rfc_solicitante) 
		ON r.folio_trabajo = c.folio_trabajo) ON e.rfc = r.rfc_empleado 
		where em.nombre = 'x';	
	
/*	6.-
	Nombre y appellido de los empleados bajo supervision de x
		donde x es el nombre y apellido de un trabajador
		el rfc de este trabajador es el que aparece en el atributo "jefe" de los empleados que queremos
*/	
		select e.nombre, e.apellido 
		from empleado e INNER JOIN empleado e1 ON e.jefe = e1.rfc 
		where e1.nombre = 'xnombre' and e1.apellido = 'xapellido';
	
/*	7.-
	Folio, fecha y nombre de la empresa solicitante de las Cotizaciones realizadas entre d1 y d2
		donde d1 y d2 son variables date que delimitan el periodo de busqueda
*/
		select c.folio, c.fecha, em.nombre 
		from cotizacion c INNER JOIN empresa em ON c.rfc_solicitante = em.rfc 
		where c.fecha between 'd1' and 'd2';
	
/*	8.-	
	nombre y apellido de todos los empleados que particiaron en un trabajo x
		donde x es el folio del trabajo
*/
		select e.nombre, e.apellido 
		from empleado e INNER JOIN realiza r ON r.rfc_empleado = e.rfc 
		where r.folio_trabajo = x;
	
/*	9.-
	folio de trabajo, servicio, folio de cotizacion y fecha de cotizacion en los que participó un empleado x
		donde x es el nombre y apellido del empleado
*/	
		select t.folio as 'folio trabajo', t.servicio, c.folio as 'folio cotizacion', c.fecha as 'fecha cotizacion'
		from cotizacion c INNER JOIN(trabajo t INNER JOIN (empleado e INNER JOIN realiza r ON e.rfc = r.rfc_empleado) 
		ON t.folio = r.folio_trabajo) ON c.folio_trabajo = t.folio 
		where e.nombre = 'xnombre' and e.apellido = 'xapellido';

/*	10.-
	nombre, apellido, fecha de contratacion y rfc de todos los empleados activos
*/
		select e.nombre, e.apellido, e.fecha_contratacion, e.rfc
		from empleado e  
		where e.activo = 1; 

/*	11.-
	nombre, apellido, fecha de contratacion y rfc de todos los empleados no activos
*/
		select e.nombre, e.apellido, e.fecha_contratacion, e.rfc
		from empleado e 
		where e.activo = 0;
	
/*	12.-
	la direccion de un empleado x
		donde x es el nombre y apellido del empleado
*/
		select dir.municipio, dir.colonia, dir.calle, dir.numero, dir.telefono 
		from direccion_empleado dir INNER JOIN empleado e 
		ON e.rfc = dir.rfc_empleado 
		where e.nombre = 'xnombre' and e.apellido = 'xapellido';
	
/*	13.-
	la informacion de contacto de un empleado x
		donde x es el nombre y apellido del empleado
*/
		select con.num_celular, con.correo_electronico 
		from info_contacto_empleado con INNER JOIN empleado e 
		ON e.rfc = con.rfc_empleado 
		where e.nombre = 'xnombre' and e.apellido = 'xapellido';
	
/*	14.-
	todos los gastos diarios que ha registrado el empleado x 
		donde x es el nombre y apellido del empleado
*/
		select g.fecha, g.mano_obra, g.luz, g.gasolina, g.material, g.total 
		from gasto g INNER JOIN empleado e 
		ON g.registrado_por = e.rfc 
		where e.nombre = 'xnombre' and e.apellido = 'xapellido';

/*	15.-
	el folio, monto y fecha de todas las facturas pagadas por la empresa x
		donde x es el nombre de la empresa
*/	
		select f.folio, f.fecha, f.monto 
		from factura f INNER JOIN empresa em 
		ON f.rfc_empresa = em.rfc
		where em.nombre = 'xnombre';

/*	16.-
	el folio, monto, fecha de cada factura correspondiente a un trabajo x
		donde x es el folio del trabajo
*/
		select distinct (f.folio), f.fecha, f.monto 
		from factura f INNER JOIN trabajo t 
		ON f.folio_trabajo = x;

/*	17.-
	todas las facturas con fecha x
*/
		select f.folio, f.monto 
		from factura f 
		where f.fecha = 'x';

/*	18.-
	la cotizacion con un folio x
*/	
		select * 
		from cotizacion c 
		where c.folio = x;

/*	19.-
	el trabajo con un folio x
*/
		select * 
		from trabajo t 
		where t.folio = x;

/*	20.-
	la factura con folio x
*/
		select * 
		from factura f 
		where f.folio = xfolio;
	
/*	21.-
	lista todas las facturas
*/
		select * from factura;

/*	22.-
	lista todos los empleados
*/
		select * from empleado;

/*	23.-
	lista todos los trabajos
*/
		select * from trabajo;

/*	24.-
	lista todas las cotizaciones
*/
		select * from cotizacion;

/*	25.-
	lista todas las empresas
*/
		select * from empresas;

/*	26.-
	lista todos los gastos
*/
		select * from gastos;

/*	27.-
	el maximo gasto en el periodo [d1,d2]
		donde d1 y d2 son variables date que delimitan el periodo de busqueda
*/
		select max(g.total), g.fecha 
		from gasto g 
		where g.fecha between 'd1' and 'd2';

/*	28.-
	El acumulado del monto de todas las facturas de un trabajo con folio x, así como el monto de la cotizacion de dicho trabajo 
*/
	select sum(f.monto) as 'cantidad facturada', c.monto as 'costo del trabajo'
	from cotizacion c INNER JOIN factura f ON f.folio_trabajo = c.folio_trabajo 
	where c.folio_trabajo = x;

/*	29.-
	Desglose del gasto de cierto dia x
*/
	select g.material, g.mano_obra, g.luz, g.gasolina, g.total 
	from gasto g 
	where g.fecha = 'x';