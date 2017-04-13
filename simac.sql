create database if not exists simac;

	create table if not exists simac.trabajo(
		folio int primary key,
		servicio enum(
			'Reparacion',
			'Fabricacion',
			'Suministros',
			'Cambios',
			'Instalacion',
			'Otros') not null,
		descripcion varchar(500)
	);

	create table if not exists simac.empresa(
		rfc_empresa varchar(13) primary key,
		nombre varchar(50),
		banco varchar(30),
		numero_cuenta bigint not null,
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
		fecha_entrega_deseada date
	);