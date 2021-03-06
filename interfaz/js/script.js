$(document).ready(function(){

	/******Tabs******/

	$(function(){
		$('.tabs-section div').hide();
		$('.filtros div').hide();
		$('.tab-link:first').addClass(' tab-active');
		link = $('.tab-link:first').attr('href');
		$(link).fadeIn();
		elemento = link.substring(1, link.length);
		$("#nuevo-"+elemento).show();
		displayIn(elemento);
		$('.filtros:first').show();
		$('.filtros div:first').show();
		$('.tab-link').on('click', function(event){
			$('.tabs-section div').hide();
			$(link+'Filtro').hide();
			$('.tab-link').removeClass(' tab-active');
			$(this).addClass(' tab-active');
			link = $(this).attr('href');
			$(link).fadeIn();
			elemento = link.substring(1, link.length);
			$("#nuevo-"+elemento).show();
			displayIn(elemento);
			$(link+'Filtro').show();
		});
	});

	/*****FILTROS*****/

	$('#selectTrabajo').change(function(event){
		event.preventDefault();
		alert($(this).val());
	});


	/*****Modal*****/

	
	$('.modal').hide();
	var link;
	var infoPopup = '#infoPopUp';
	var elemento;
	var id;
	var confirmarPopup = $('#confirmarEliminar');

	$('.navbar-menu a').click(function(event){
		link = $(this).attr('href');
		elemento = link.substring(1, link.length);
		displayIn(elemento);
		$(link).fadeIn(400);
	});

	$(".close").click(function(event){
        $(link).fadeOut(400);
        $('.tab-link:first').click();
    });

    $('.close-popup').click(function(){
    	$(infoPopup).hide(400);
    	$(link+"Agregar").hide(400);
    	$('#infoContacto').fadeOut();
    	$('#queryPopUp').fadeOut();
    });

	$('.extra-buttons a').click(function(event){
		event.preventDefault();
		$('.nuevo-elemento').toggle();
		$('.informacion').toggle();
		$(this).children().toggle();
	});


	/*****DisplayIn*****/
	
	function displayIn(elemento){
		$.ajax({
			url: 'php/consultas.php',
			type: 'POST',
			data: {metodo: elemento}
		}).done(function(array){
			if(array==''){
				$(link).html('<p class="not-found">Tabla vacía</p>');
			}else{
				var data = $.parseJSON(array);
				var titulos, indices;
				var ubicacion;
				switch(elemento){
					case "empresa":
							titulos = ['Nombre', 'No. de proveedor'];
							indices = [1,4];
							ubicacion = $(link+' .informacion');
						break;
					case "empleado":
							titulos = ['Nombre', 'Apellido'];
							indices = [7,8];
							ubicacion = $(link+' .informacion');
						break;
					case "factura":
							titulos = ['Empresa', '<i class="fa fa-usd" aria-hidden="true"></i>', '<i class="fa fa-calendar" aria-hidden="true"></i>'];
							indices = [1,2,3];
							ubicacion = $(link);
						break;
					case "cotizacion":
							titulos = ['Solicitante', '<i class="fa fa-usd" aria-hidden="true"></i>', '<i class="fa fa-calendar" aria-hidden="true"></i>', 'Orden'];
							indices = [1,2,3,4];
							ubicacion = $(link);
						break;
					case "trabajo":
							titulos=['Folio', 'Servicio'];
							indices=[0,1];
							ubicacion = $(link);
						break;
				}
				renderHorizontal(data, elemento, ubicacion, titulos, indices);
			}
		});
	}

	/*****Render*****/

	function renderHorizontal(array, elemento, ubicacion, titulos, indices){
		array.reverse();
		var render = '<div class="table">'+
						'<div class="table-row">';
		var cellDiv = '<div class="table-cell">';
		var rowDiv = '<div class="table-row">';
		var headDiv = '<div class="table-head">';
		var closeDiv = '</div>';

		var buttons;


		$.each(titulos, function(i, value){
			render+= headDiv+
						titulos[i]+
					closeDiv;
		});

		render+= rowDiv+closeDiv+closeDiv;

		$.each(array, function(i, value){
			var id = array[i][0];
			render+=rowDiv;
			buttons = '<button class="more-info info" id="'+id+'">'+
							'<i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>'+
						'</button>'+
						'<button class="delete-button borrar" id="'+id+'">'+
							'<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>'+
						'</button>';

			if(elemento=="empleado"){
				buttons += '<button class="contacto-button contacto" id="'+id+'">'+
								'<i class="fa fa-address-card fa-2x" aria-hidden="true"></i>'+
							'</button>'+
							'<button class="contacto-button realiza" id="'+id+'">'+
								'<i class="fa fa-briefcase fa-2x" aria-hidden="true"></i>'+
							'</button>';
			}

			$.each(indices, function(j, val){
				render+= cellDiv+
							array[i][val]+
						closeDiv;
			});
			
			render+=cellDiv+
						buttons+
					closeDiv+
				closeDiv;
		});

		render+=closeDiv;

		ubicacion.html(render);
	}

	function renderInfo(array, elemento, titulos, indices){
		var render = '<div class="table">';
		var cellDiv = '<div class="table-cell">';
		var rowDiv = '<div class="table-row">';
		var headDiv = '<div class="table-head">';
		var closeDiv = '</div>';
			
		$.each(array, function(i, value){
			$.each(titulos, function(j, val){
				render+=rowDiv+
							headDiv+
								titulos[j]+
							closeDiv+
							cellDiv+
								array[i][indices[j]]+
							closeDiv+
						closeDiv;
			});
		});

		render+=closeDiv;

		$(infoPopup+' .info').html(render);
	}

	function renderContacto(array, ubicacion){
		var render = '<div class="table">';
		var cellDiv = '<div class="table-cell">';
		var rowDiv = '<div class="table-row">';
		var headDiv = '<div class="table-head">';
		var closeDiv = '</div>';

		$.each(array, function(i, value){
			render+=rowDiv;
			$.each(array[i], function(j, val){
				render+=cellDiv+
							val+
						closeDiv;
				return(j<1);
			});
			render+=closeDiv;
		});
		render+=closeDiv;
		ubicacion.html(render);
	}


	/*****Borrar POPup*****/

	function continueDeleting(id, metodo, elemento){
		$.ajax({
			url: 'php/ediciones.php',
			type: 'GET',
			data: { id, metodo }
		}).done(function(res){
			if(res != ''){
				alert("Error: "+res);
			}else{
				displayIn(elemento);
			}
		});
	}

	$(document).on('click', '.borrar', function(event){
		event.preventDefault();
		id = $(this).attr('id');
		confirmarPopup.toggle();		
	});

	$('.confirmar-continuar').click( function(){
		continueDeleting(id, elemento+'Eliminar', elemento);
		confirmarPopup.toggle();
	});

	$('.confirmar-cancelar').click( function(){
		confirmarPopup.toggle();
	});

	/*Info*/

		$(document).on('click', '.info', function(event){
			event.preventDefault();
			id = $(this).attr('id');

			$.ajax({
				url: 'php/consultas.php',
				type: 'POST',
				data: {
						id: id,
						metodo: elemento+'Id'
				}
			}).done(function(res){
				if(res==' '){
					alert("Error: "+res);
				}else{
					var data = $.parseJSON(res);
					var titulos;
					var indices;
					switch(elemento){
						case "empresa":
								$(infoPopup+' .modal-header p').html(data[0].nombre);
								titulos=['RFC', 'Banco', 'No. de cuenta', 'No. de proveedor'];
								indices=[0,2,3,4];
							break;
						case "empleado":
								$(infoPopup+' .modal-header p').html(data[0].nombre+' '+data[0].apellido);
								titulos=['RFC', 'Curp', 'No. Servicio Social', 'Activo', 'Salario', 'Fecha de contrato', 'Jefe'];
								indices=[0,1,2,3,4,5,6];
							break;
						case "factura":
								$(infoPopup+' .modal-header p').html('Folio: '+data[0].folio);
								titulos=['<i class="fa fa-usd" aria-hidden="true"></i>', '<i class="fa fa-calendar" aria-hidden="true"></i>', 'Forma de pago', 'Folio de trabajo', 'Folio de empresa'];
								indices=[1,2,3,4,5];
							break;
						case "cotizacion":
								$(infoPopup+' .modal-header p').html('Folio: '+data[0].folio);
								titulos=['<i class="fa fa-calendar" aria-hidden="true"></i>', 'Condiciones de pago', '<i class="fa fa-usd" aria-hidden="true"></i>', 'RFC de solicitante', 'Folio de trabajo', 'Fecha de entrega deseada', 'No. de orden'];
								indices=[1,2,3,4,5,6,7];
							break;
						case "trabajo":
								$(infoPopup+' .modal-header p').html('Folio: '+data[0].folio);
								titulos=['Servicio', 'Descripcion'];
								indices=[1,2];
							break;
					}
					renderInfo(data, elemento, titulos, indices);
					$(infoPopup).toggle(400);
				}
			});
		});


	/****CONTACTO****/

	$(document).on('click', '.contacto', function(event){
		event.preventDefault();
		id = $(this).attr('id');

		$.ajax({
			url: 'php/consultas.php',
			type: 'POST',
			data: {id: id,
					metodo: elemento+'InfoId'}
		}).done(function(res){
			if(res==''){
				$('#infoContacto .info').html('<p class="not-found">No existen datos de contacto</p>');
			}else{
				var data = $.parseJSON(res);
				renderContacto(data, $('#infoContacto .info'));
			}
		});
		$.ajax({
			url: 'php/consultas.php',
			type: 'POST',
			data: {id: id,
					metodo: elemento+'DireccionId'}
		}).done(function(res){
			if(res==''){
				$('#infoContacto .map').html('<p class="not-found">No existe direccion de contacto</p>');
			}else{
				var data = $.parseJSON(res);
				var direccion='';
				$.each(data, function(i, value){
					$.each(data[i], function(j, val){
						direccion+=val+='+';
						return(j<3);
					});
				});
				var api = '<iframe '+
  							'width="500" '+
  							'height="450" '+
  							'frameborder="0" style="border:0" '+
  							'src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDkmv3wk27k5YvTkOF0UQyE-EPLhB1Jzhk'+
							'&q='+direccion+'" allowfullscreen>'+
						'</iframe>';
				$('#infoContacto .map').html(api);
			}
		});

		$('#infoContacto').fadeIn();

	});

	/******LLENAR SELECTS******/

	function llenarConEmpresas(ubicacion){
		$.ajax({
			url: "php/consultas.php",
			type: "POST",
			data: {metodo: "rfcEmpresa"}
		}).done(function(res){
			if (res==""){
				ubicacion.html('<option class="font-b not-found>No hay empresas disponibles</option>');
			}
			else
			{
				var data = $.parseJSON(res);
				var render='';
				$.each(data, function(i, value){
					render+='<option class="font-a" value="'+data[i].rfc+'">'+data[i].nombre+'</option>';
				});
				ubicacion.html(render);
			}
		});
	}

	function llenarConEmpleados(ubicacion){
		$.ajax({
			url: "php/consultas.php",
			type: "POST",
			data: {metodo: "rfcEmpleado"}
		}).done(function(res){
			if (res==""){
				ubicacion.html('<option class="font-b not-found>No hay empleados disponibles</option>');
			}
			else
			{
				var data = $.parseJSON(res);
				var render='';
				$.each(data, function(i, value){
					render+='<option class="font-a" value="'+data[i].rfc+'">'+data[i].nombre+' '+data[i].apellido+'</option>';
				});
				ubicacion.html(render);
			}
		});
	}

	function llenarConFoliosFactura(ubicacion){
		$.ajax({
			url: "php/consultas.php",
			type: "POST",
			data: {metodo: "folioFactura"}
		}).done(function(res){
			if (res==""){
				ubicacion.html('<option class="font-b not-found>No hay facturas disponibles</option>');
			}
			else
			{
				var data = $.parseJSON(res);
				var render='';
				$.each(data, function(i, value){
					render+='<option class="font-a" value="'+data[i].folio+'">['+data[i].folio+'] '+data[i].nombre+'</option>';
				});
				ubicacion.html(render);
			}
		});
	}

	function llenarConFoliosCotizacion(ubicacion){
		$.ajax({
			url: "php/consultas.php",
			type: "POST",
			data: {metodo: "folioCotizacion"}
		}).done(function(res){
			if (res==""){
				ubicacion.html('<option class="font-b not-found>No hay cotizaciones disponibles</option>');
			}
			else
			{
				var data = $.parseJSON(res);
				var render='';
				$.each(data, function(i, value){
					render+='<option class="font-a" value="'+data[i].folio+'">['+data[i].folio+'] '+data[i].nombre+'</option>';
				});
				ubicacion.html(render);
			}
		});
	}

	function llenarConFoliosTrabajo(ubicacion){
		$.ajax({
			url: "php/consultas.php",
			type: "POST",
			data: {metodo: "folioTrabajo"}
		}).done(function(res){
			if(res==""){
				ubicacion.html('<option class="font-b not-found>No hay folio disponibles</option>');
			}else{
				var data = $.parseJSON(res);
				var render;
				$.each(data, function(i, value){
					render+='<option class="font-a" value="'+data[i].folio+'">['+data[i].folio+']'+data[i].servicio+'</option>';
				});
				ubicacion.html(render);
			}
		});
	}


	/****AGREGAR****/

	//muestra los folios y el servicio de los trabajos existentes al llenar una referencia foranea en la creacion de nuevas tuplas
	$('a.agregar').click(function(event){
		event.preventDefault();

		llenarConFoliosTrabajo($('.foliosTrabajo'));
		
		//muestra los nombres de las empresas existentes al llenar una referencia foranea en la creacion de nuevas tuplas

		llenarConEmpresas($('.rfcsEmpresa'));

		$(link+'Agregar').fadeIn();
	});


	/*INSERTS*/

	/******EMPRESA******/
		$('#btnNuevaEmpresa').click(function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/ediciones.php',
				type: 'GET',
				data:{
						id: $('#nuevaEmpresaRFC').val(),
						nombre: $('#nuevaEmpresaNombre').val(),
						banco: $('#nuevaEmpresaBanco').val(),
						num_cuenta: $('#nuevaEmpresaNumeroCuenta').val(),
						num_proveedor: $('#nuevaEmpresaNumeroProveedor').val(),
						metodo: 'insertarEmpresa'
				}
			}).done(function(res){
				if(res != ''){
					alert("Error: "+res);
				}else{
					displayIn(elemento);
					$('.nuevo-elemento').toggle();
					$('.informacion').toggle();
					$('.extra-buttons a').children().toggle();
				}
			});
		});
	

	/*******Empleado*******/
		$('#btnNuevoEmpleado').click(function(event){
			event.preventDefault();
			var opcion;
			if($("#nuevoEmpleadoActivo").is(':checked')){
				opcion=1;
			}else{
				opcion=0;
			}
			$.ajax({
				url: 'php/ediciones.php',
				type: 'GET',
				data:{
						id: $('#nuevoEmpleadoRFC').val(),
						curp: $('#nuevoEmpleadoCurp').val(),
						nss: $('#nuevoEmpleadoNss').val(),
						activo: opcion,
						salario: $('#nuevoEmpleadoSalario').val(),
						fecha_contratacion: $('#nuevoEmpleadoFechaContratacion').val(),
						jefe: $('#nuevoEmpleadoJefe').val(),
						nombre: $('#nuevoEmpleadoNombre').val(),
						apellido: $('#nuevoEmpleadoApellido').val(),
						metodo: 'insertarEmpleado'
				}
			}).done(function(res){
				if(res != ''){
					alert("Error: "+res);
				}else{
					displayIn(elemento);
					$('.nuevo-elemento').toggle();
					$('.informacion').toggle();
					$('.extra-buttons a').children().toggle();
				}
			});
		});

	/******FACTURA******/
		$('#btnNuevaFactura').click(function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/ediciones.php',
				type: 'GET',
				data:{
						id: $('#nuevaFacturaFolio').val(),
						monto: $('#nuevaFacturaMonto').val(),
						fecha: $('#nuevaFacturaFecha').val(),
						formaPago: $('#nuevaFacturaFormaPago').val(),
						folioTrabajo: $('#nuevaFacturaFolioTrabajo').val(),
						rfcEmpresa: $('#nuevaFacturaRfcEmpresa').val(),
						metodo: 'insertarFactura'
				}
			}).done(function(res){
				if(res != ''){
					alert("Error: "+res);
				}else{
					displayIn(elemento);
					$(link+"Agregar").hide(400);
				}
			});
		});

	/******COTIZACION******/
		$('#btnNuevaCotizacion').click(function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/ediciones.php',
				type: 'GET',
				data:{
						id: $('#nuevaCotizacionFolio').val(),
						monto: $('#nuevaCotizacionMonto').val(),
						fecha: $('#nuevaCotizacionFecha').val(),
						condicionesPago: $('#nuevaCotizacionCondicionPago').val(),
						folioTrabajo: $('#nuevaCotizacionFolioTrabajo').val(),
						rfcSolicitante: $('#nuevaCotizacionRFCSolicitante').val(),
						fechaEntregaDeseada: $('#nuevaCotizacionFechaEntregaDeseada').val(),
						numeroOrdenCompra: $('#nuevaCotizacionNumeroOrdenCompra').val(),
						metodo: 'insertarCotizacion'
				}
			}).done(function(res){
				if(res != ''){
					alert("Error: "+res);
				}else{
					displayIn(elemento);
					$(link+"Agregar").hide(400);
				}
			});
		});

	/******TRABAJO******/
		$('#btnNuevoTrabajo').click(function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/ediciones.php',
				type: 'GET',
				data:{
						id: $('#nuevoTrabajoFolio').val(),
						servicio: $('#trabajoServicio').val(),
						descripcion: $('#nuevoTrabajoDescripcion').val(),
						metodo: 'insertarTrabajo'
				}
			}).done(function(res){
				if(res != ''){
					alert("Error: "+res);
				}else{
					displayIn(elemento);
					$(link+"Agregar").hide(400);
				}
			});
		});

	/*************BUSQUEDAS*************/
//En muchas consultas haría falta lo que hicimos de sugerencias del campo para evitar errores y agilizar el proceso, pero es un pedote 

		/**** FACTURAS *****/

		/*facturasConMontroEntre*/ //<-- nombre de la funcion en php
		$('#facturaEntreConMontoBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Fecha mínima'+
						closeDiv+
						headDiv+
							'Fecha máxima'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="date" id="campoQuery1">'+ 
						closeDiv+
						cellDiv+
							'<input type="date" id="campoQuery2">'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						headDiv+
							'Monto mínimo'+
						closeDiv+
						headDiv+
							'Monto máximo'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="text" id="campoQuery3" placeholder="Monto mínimo">'+
						closeDiv+
						cellDiv+
							'<input type="text" id="campoQuery4" placeholder="Monto máximo">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;

			render+='<button id="facturaEntreConMonto">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			$('#queryPopUp').show();
		});

		/*facturaPagadasPorEmpresaX*/
		$('#facturasPagadasPorEmpresaBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Nombre de la Empresa'+
						closeDiv+
						cellDiv+
							'<select id="campoQuery5"></select>'+
						closeDiv+
					closeDiv;
			render+=closeDiv;

			render+='<button id="facturasPagadasPorEmpresa">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			llenarConEmpresas($('#campoQuery5'));
			$('#queryPopUp').show();
		});	

		/*facturaDeTrabajoX*/
		$('#facturasDeTrabajoBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio de trabajo'+
						closeDiv+
						cellDiv+
							'<select id="campoQuery6"></select>'+
						closeDiv+
					closeDiv;
			render+=closeDiv;

			render+='<button id="facturasDeTrabajo">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			llenarConFoliosTrabajo($('#campoQuery6'));
			$('#queryPopUp').show();
		});

		/*facturaFechaX*/
		$('#facturasDeFechaBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Fecha'+
						closeDiv+
						cellDiv+
							'<input type="date" id="campoQuery7">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;

			render+='<button id="facturasDeFecha">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			$('#queryPopUp').show();
		});

		/*facturaFolioX*/
		$('#facturaConFolioBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio de factura'+
						closeDiv+
						cellDiv+
							'<select id="campoQuery8"></select>'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="facturaConFolio">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			llenarConFoliosFactura($('#campoQuery8'));
			$('#queryPopUp').show();
		});		


		/**** COTIZACIONES *****/

		/*cotizacionFolioX*/
		$('#cotizacionConFolioBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio de cotización'+
						closeDiv+
						cellDiv+
							'<select id="campoQuery9"></select>'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="cotizacionConFolio">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			llenarConFoliosCotizacion($('#campoQuery9'));
			$('#queryPopUp').show();
		});


		/**** TRABAJOS *****/

		/*trabajoDeEmpleadoX*/
		$('#trabajosDeEmpleadoBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Nombre del empleado'+
						closeDiv+
						cellDiv+
							'<select id="campoQuery10"></select>'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="trabajosDeEmpleado">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			llenarConEmpleados($('#campoQuery10'));
			$('#queryPopUp').show();
		});

		/*trabajoFolioX*/
		$('#trabajoConFolioBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio del trabajo'+
						closeDiv+
						cellDiv+
							'<select id="campoQuery12"></select>'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="trabajoConFolio">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			llenarConFoliosTrabajo($('#campoQuery12'));
			$('#queryPopUp').show();
		});

		/*acumuladoFacturasDeTrabajoX*/
		$('#acumuladoEnFacturasDeTrabajoBtn').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio del trabajo'+
						closeDiv+
						cellDiv+
							'<select id="campoQuery13"></select>'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="acumuladoEnFacturasDeTrabajo">Aceptar</button>';

			$('#queryPopUp .query').html(render);
			llenarConFoliosTrabajo($('#campoQuery13'));
			$('#queryPopUp').show();
		});
		





		$(document).on('click','#facturaEntreConMonto',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						fecha1: $('#campoQuery1').val(),
						fecha2: $('#campoQuery2').val(),
						monto1: $('#campoQuery3').val(),
						monto2: $('#campoQuery4').val(),
						metodo: 'facturaGeneradasEntreConMontoEntre'
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['<i class="fa fa-usd" aria-hidden="true"></i>', '<i class="fa fa-calendar" aria-hidden="true"></i>'];
					var indices = [1,2];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});

		$(document).on('click', '#facturasPagadasPorEmpresa',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						id: $('#campoQuery5').val(),	
						metodo: 'facturaPagadasPorEmpresaX'
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['Nombre', '<i class="fa fa-usd" aria-hidden="true"></i>'];
					var indices = [1,2];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});

		$(document).on('click', '#facturasDeTrabajo',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						folio: $('#campoQuery6').val(),	
						metodo: 'facturaDeTrabajoX'
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['<i class="fa fa-calendar" aria-hidden="true"></i>', '<i class="fa fa-usd" aria-hidden="true"></i>'];
					var indices = [1,2];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});


		$(document).on('click', '#facturasDeFecha',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						fecha: $('#campoQuery7').val(),	
						metodo: 'facturaFechaX'
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['<i class="fa fa-calendar" aria-hidden="true"></i>', '<i class="fa fa-usd" aria-hidden="true"></i>'];
					var indices = [1,2];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});

		$(document).on('click', '#cotizacionConFolio',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						folio: $('#campoQuery9').val(),	
						metodo: 'cotizacionFolioX'
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['Solicitante', '<i class="fa fa-usd" aria-hidden="true"></i>', '<i class="fa fa-calendar" aria-hidden="true"></i>'];
					var indices = [1,2,3];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});

		$(document).on('click', '#trabajosDeEmpleado',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						rfc: $('#campoQuery10').val(),	
						metodo: 'trabajoDeEmpleadoX'
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['Servicio', 'Folio cotizacion', '<i class="fa fa-calendar" aria-hidden="true"></i>cotizacion'];
					var indices = [1,2,3];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});

		$(document).on('click', '#facturaConFolio',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						folio: $('#campoQuery8').val(),
						metodo: 'facturaFolioX'	
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['Folio', '<i class="fa fa-usd" aria-hidden="true"></i>', '<i class="fa fa-calendar" aria-hidden="true"></i>', 'Forma de pago'];
					var indices = [0,1,2,3];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});

		$(document).on('click', '#trabajoConFolio',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						folio: $('#campoQuery12').val(),
						metodo: 'trabajoFolioX'	
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['Folio', 'Servicio'];
					var indices = [0,1];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});

		$(document).on('click', '#acumuladoEnFacturasDeTrabajo',function(event){
			event.preventDefault();
			$.ajax({
				url: 'php/funcionesPHP_queries.php',
				type: 'POST',
				data: {
						folio: $('#campoQuery13').val(),
						metodo: 'acumuladoFacturasDeTrabajoX'	
					}
			}).done(function(res){
				if(res==''){
					$(link).html('<p class="not-found">No hubo resultados</p>');
				}else{
					var data = $.parseJSON(res);
					var titulos = ['Cantidad facturada', '<i class="fa fa-usd" aria-hidden="true"></i> por trabajo'];
					var indices = [0,1];
					renderHorizontal(data, elemento, $(link), titulos, indices);
				}
				$('#queryPopUp').fadeOut();
			});
		});
		
})