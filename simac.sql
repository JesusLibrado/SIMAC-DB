create database if not exists simac;

	create table if not exists simac.trabajo(
		folio int primary key,
		servicio enum(
			'Reparacion',
			'Fabricacion',
			'Limpieza',
			'Mantenimiento',
			'Maquinado',
			'Suministro',
			'Cambios',
			'Instalacion',
			'Otros') not null,
		descripcion varchar(500)
	);

	create table if not exists simac.empresa(
		rfc_empresa varchar(13) primary key,
		nombre varchar(50),
		banco varchar(30),
		numero_cuenta bigint,
		numero_proveedor int
	);

	create table if not exists simac.cotizacion(
		folio int primary key,
		fecha date not null,
		condiciones_pago varchar(75),
		monto float,
		rfc_solicitante varchar(13) 
			references simac.empresa(rfc_empresa),
		folio_trabajo int references simac.trabajo(folio),
		fecha_entrega_deseada date,
		numero_orden_compra int
	);

	create table if not exists simac.factura(
		folio int primary key,
		monto float,
		fecha date,
		forma_pago enum(
			'Deposito',
			'Efectivo',
			'Transferencia') not null,
		folio_trabajo int 
			references simac.trabajo(folio),
		rfc_solicitante varchar(13)
			references simac.empresa(rfc_empresa)
	);
	
	create table if not exists simac.empleado(
		rfc varchar(13) primary key,
		curp varchar(18) not null,
		nss varchar(11),
		activo boolean,
		salario float,
		fecha_contratacion date,
		jefe varchar(13) 
			references simac.empleado(rfc),
		nombre varchar(50),
		apellido varchar(50)
	);
	
	create table if not exists simac.direccion_empleado(
		rfc_empleado varchar(13)
			references simac.empleado(rfc),
		municipio varchar(25),
		colonia varchar(20),
		calle varchar(20),
		numero int,
		telefono varchar(15)
	);
	
	create table if not exists simac.info_contacto_empleado(
		rfc_empleado varchar(13)
			references simac.empleado(rfc),
		num_celular varchar(15),
		correo_electronico varchar(70)
	);
	
	create table if not exists simac.realiza(
		folio_trabajo int
			references simac.trabajo(folio),
		rfc_empleado varchar(13)
			references simac.empleado(rfc),
		primary key (folio_trabajo, rfc_empleado)
	);
	
	create table if not exists simac.gasto(
		fecha date primary key,
		total float not null,
		material float,
		mano_obra float,
		luz float,
		gasolina float,
		registrado_por varchar(13)
	);
