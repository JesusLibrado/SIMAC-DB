create database if not exists simac;

	create table if not exists simac.empleado(
		rfc varchar(13),
		curp varchar(18) not null,
		nss varchar(11),
		activo boolean,
		salario float,
		fecha_contratacion date not null,
		jefe varchar(13) DEFAULT 'CAEF6805309K4',
		nombre varchar(50),
		apellido varchar(50),

		PRIMARY KEY(rfc),
		FOREIGN KEY(jefe)
			REFERENCES simac.empleado(rfc)
			ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;

	create table if not exists simac.trabajo(
		folio int,
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
		descripcion varchar(500),

		PRIMARY KEY (folio)
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;

	create table if not exists simac.empresa(
		rfc varchar(13),
		nombre varchar(50),
		banco varchar(30),
		numero_cuenta bigint,
		numero_proveedor int,

		PRIMARY KEY (rfc)
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;

	create table if not exists simac.cotizacion(
		folio int,
		fecha date,
		condiciones_pago varchar(75),
		monto float,
		rfc_solicitante varchar(13) not null,
		folio_trabajo int,
		fecha_entrega_deseada date,
		numero_orden_compra int,

		PRIMARY KEY (folio),
		FOREIGN KEY (rfc_solicitante)
			REFERENCES simac.empresa (rfc)
			ON UPDATE CASCADE,
		FOREIGN KEY (folio_trabajo)
			REFERENCES simac.trabajo (folio)
			ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;

	create table if not exists simac.factura(
		folio int,
		monto float,
		fecha date,
		forma_pago enum(
			'Deposito',
			'Efectivo',
			'Transferencia',
			'Otro') not null,
		folio_trabajo int not null,
		rfc_empresa varchar(13) not null,

		PRIMARY KEY(folio),
		FOREIGN KEY (folio_trabajo)
			REFERENCES simac.trabajo(folio)
			ON UPDATE CASCADE,
		 FOREIGN KEY (rfc_empresa)
			REFERENCES simac.empresa(rfc)
			ON UPDATE CASCADE
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;
	
	create table if not exists simac.direccion_empleado(
		rfc_empleado varchar(13) not null,
		municipio varchar(25),
		colonia varchar(20),
		calle varchar(20),
		numero int,
		telefono varchar(15),

		FOREIGN KEY (rfc_empleado)
			REFERENCES simac.empleado(rfc)
			ON UPDATE CASCADE ON DELETE CASCADE
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;
	
	create table if not exists simac.info_contacto_empleado(
		rfc_empleado varchar(13) not null,
		num_celular varchar(15),
		correo_electronico varchar(70),

		FOREIGN KEY (rfc_empleado)
			REFERENCES simac.empleado(rfc)
			ON UPDATE CASCADE ON DELETE CASCADE
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;
	
	create table if not exists simac.realiza(
		folio_trabajo int,
		rfc_empleado varchar(13), 

		PRIMARY KEY (folio_trabajo, rfc_empleado),
		FOREIGN KEY (folio_trabajo)
			REFERENCES simac.trabajo (folio)
			ON UPDATE CASCADE ON DELETE CASCADE,
		FOREIGN KEY (rfc_empleado)
			REFERENCES simac.empleado (rfc)
			ON UPDATE CASCADE ON DELETE CASCADE
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;
	
	create table if not exists simac.gasto(
		fecha date,
		total float not null,
		material float,
		mano_obra float,
		luz float,
		gasolina float,
		registrado_por varchar(13),
		
		PRIMARY KEY (fecha),
		FOREIGN KEY (registrado_por)
			REFERENCES simac.empleado (rfc)
			ON UPDATE CASCADE 
	)ENGINE=InnoDB DEFAULT CHARACTER SET=UTF8;