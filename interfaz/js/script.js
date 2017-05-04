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
				var render;
				$.each(data, function(i, value){
					render+='<option value="'+data[i].rfc+'">'+data[i].nombre+'</option>';
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
					render+='<option value="'+data[i].folio+'">['+data[i].folio+']'+data[i].servicio+'</option>';
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
		$('#facturaEntreConMonto').click(function(){
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

			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});	

		/*facturaPagadasPorEmpresaX*/
		$('#facturasPagadasPorEmpresa').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Nombre de la Empresa'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="text" id="campoQuery5">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;

			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});	

		/*facturaDeTrabajoX*/
		$('#facturasDeTrabajo').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio de trabajo'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="number" id="campoQuery6">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;

			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});

		/*facturaFechaX*/
		$('#facturasDeFecha').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Fecha'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="date" id="campoQuery7">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;

			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});

		/*facturaFolioX*/
		$('#facturaConFolio').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio de factura'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="number" id="campoQuery8">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});		


		/**** COTIZACIONES *****/

		/*cotizacionFolioX*/
		$('#cotizacionConFolio').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio de cotización'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="number" id="campoQuery9">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});


		/**** TRABAJOS *****/

		/*trabajoDeEmpleadoX*/
		$('#trabajosDeEmpleado').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Nombre del empleado'+
						closeDiv+
						headDiv+
							'Apellido del empleado'+
						closeDiv+
					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="text" id="campoQuery10">'+
						closeDiv+
						cellDiv+
							'<input type="text" id="campoQuery11">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});

		/*trabajoFolioX*/
		$('#trabajoConFolio').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio del trabajo'+
						closeDiv+

					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="number" id="campoQuery12">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});

		/*acumuladoFacturasDeTrabajoX*/
		$('#acumuladoEnFacturasDeTrabajo').click(function(){
			var render = '<div class="table">';
			var cellDiv = '<div class="table-cell">';
			var rowDiv = '<div class="table-row">';
			var headDiv = '<div class="table-head">';
			var closeDiv = '</div>';

			render+=rowDiv+
						headDiv+
							'Folio del trabajo'+
						closeDiv+

					closeDiv;
			render+=rowDiv+
						cellDiv+
							'<input type="number" id="campoQuery13">'+
						closeDiv+
					closeDiv;
			render+=closeDiv;
			
			render+='<button id="">Aceptar</button>';

			$('#queryPopUp .info').html(render);
			$('#queryPopUp').show();
		});
		
})