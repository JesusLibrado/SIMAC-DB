$(document).ready(function(){

	/******Tabs******/

	$(function(){
		$('.tabs-section div').hide();
		$('.tab-link:first').addClass(' tab-active');
		link = $('.tab-link:first').attr('href');
		$(link).fadeIn();
		elemento = link.substring(1, link.length);
		$("#nuevo-"+elemento).show();
		displayIn(elemento);
		$('.tab-link').on('click', function(event){
			$('.tabs-section div').hide();
			$('.tab-link').removeClass(' tab-active');
			$(this).addClass(' tab-active');
			link = $(this).attr('href');
			$(link).fadeIn();
			elemento = link.substring(1, link.length);
			$("#nuevo-"+elemento).show();
			displayIn(elemento);
		});
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
							titulos=['Servicio', 'Descripcion'];
							indices=[1,2];
							ubicacion = $(link);
						break;
				}
				renderHorizontal(data, elemento, ubicacion, titulos, indices);
			}
		});
	}

	/*****Render*****/

	function renderHorizontal(array, elemento, ubicacion, titulos, indices){
		var render = '<div class="table">'+
						'<div class="table-row">';
		var cellDiv = '<div class="table-cell">';
		var rowDiv = '<div class="table-row">';
		var headDiv = '<div class="table-head">';
		var closeDiv = '</div>';

		$.each(titulos, function(i, value){
			render+= headDiv+
						titulos[i]+
					closeDiv;
		});

		render+= rowDiv+closeDiv+closeDiv;

		$.each(array, function(i, value){
			var id = array[i][0];
			render+=rowDiv;

			$.each(indices, function(j, val){
				render+= cellDiv+
							array[i][val]+
						closeDiv;
			});
			
			render+=cellDiv+
						'<button class="more-info info" id="'+id+'">'+
							'<i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>'+
						'</button>'+
						'<button class="delete-button borrar" id="'+id+'">'+
							'<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>'+
						'</button>'+
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


	/****Agregar****/

	$('a.agregar').click(function(event){
		event.preventDefault();
		$(link+'Agregar').fadeIn();
	});

	/******EMPRESA******/
		

	/*Insertar*/

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
					displayIn("empresa");
					$('.nuevo-elemento').toggle();
					$('.informacion').toggle();
					$('.extra-buttons a').children().toggle();
				}
			});
		});

	

	/*******Empleado*******/

	/*Insertar*/

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
					displayIn("empleado");
					$('.nuevo-elemento').toggle();
					$('.informacion').toggle();
					$('.extra-buttons a').children().toggle();
				}
			});
		});

})