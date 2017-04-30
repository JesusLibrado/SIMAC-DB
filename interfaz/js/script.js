$(document).ready(function(){

	/******Tabs******/

	$(function(){
		$('.tabs-section div').hide();
		$('.tab-link:first').addClass(' tab-active');
		link = $('.tab-link:first').attr('href');
		$(link).fadeIn();
		elemento = link.substring(1, link.length);
		displayIn(elemento);
		$('.tab-link').on('click', function(event){
			$('.tabs-section div').hide();
			$('.tab-link').removeClass(' tab-active');
			$(this).addClass(' tab-active');
			link = $(this).attr('href');
			$(link).fadeIn();
			elemento = link.substring(1, link.length);
			displayIn(elemento);
		});
	});


	/*****Modal*****/

	
	$('.modal').hide();
	var link;
	var infoPopup;
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
    	$(infoPopup).toggle(400);
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
				switch(elemento){
					case "empresa":
							titulos = ['Nombre', 'No. de proveedor'];
							indices = [1,4];
							renderHorizontal(data, elemento, $(link+' .informacion'), titulos, indices);
						break;
					case "empleado":
							titulos = ['Nombre', 'Apellido'];
							indices = [7,8];
							renderHorizontal(data, elemento, $(link+' .informacion'), titulos, indices);
						break;
					case "factura":
							titulos = ['Empresa', 'Monto', 'Fecha'];
							indices = [1,2,3];
							renderHorizontal(data, elemento, $(link), titulos, indices);
						break;
					case "cotizacion":
							titulos = ['Solicitante', 'Monto', 'Fecha', 'Orden'];
							indices = [1,2,3,4];
							renderHorizontal(data, elemento, $(link), titulos, indices);
						break;
				}
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
						'<button class="more-info info-'+elemento+'" id="'+id+'">'+
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

	function renderBox(array, elemento, ubicacion){
		var closeDiv = '</div>';
		var render = '';

		$.each(array, function(i, value){
			var id = array[i][0];
			render+= '<div class="box" id="'+id+'">'+
						'<div class="box-title">'+
							'<h3>'+id+'</h3>'+
							'<p>'+array[i][1]+'</p>'+
						closeDiv+
						'<div class="box-content">'+
							'<ul>'+
								'<li class="box-p"><i class="fa fa-usd" aria-hidden="true"></i> '+
									array[i][2]+
								'</li>'+
								'<li class="box-p"><i class="fa fa-calendar" aria-hidden="true"></i> '+
									array[i][3]+
								'</li>'+
								'<li>'+
									'<button class="info-element info-'+elemento+'" id="'+id+'">'+
										'<i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>'+
									'</button>'+
								'</li>'+
								'<li>'+
									'<button class="delete-element borrar" id="'+id+'">'+
										'<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>'+
									'</button>'+
								'</li>'+
							'</ul>'+
						closeDiv+
					closeDiv;
		});

		ubicacion.html(render);
	}

	function renderWithNoButtons(array, elemento, ubicacion, titulos){
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

		render+= closeDiv;

		$.each(array, function(i, value){
			render+= rowDiv;
			$.each(array[i], function(j, val){
				render+=cellDiv+
							array[i][j]+
						closeDiv;
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

	/*Info*/

		$(document).on('click', '.info-empresa', function(event){
			event.preventDefault();
			infoPopup = '#infoEmpresa';
			id = $(this).attr('id');

			$.ajax({
				url: 'php/consultas.php',
				type: 'POST',
				data: {
						id: id,
						metodo: 'selectEmpresaId'
				}
			}).done(function(res){
				if(res==' '){
					alert("Error: "+res);
				}else{
					var data = $.parseJSON(res);
					$(infoPopup+' .modal-header p').html(data[0][1]);
					$(infoPopup+' .info').html(
						'<div class="table">'+
							'<div class="table-row">'+
								'<div class="table-head">RFC</div>'+
								'<div class="table-cell">'+data[0][0]+'</div>'+
							'</div>'+
							'<div class="table-row">'+
								'<div class="table-head">Banco</div>'+
								'<div class="table-cell">'+data[0][2]+'</div>'+
								'<div class="table-cell">'+
									'<button class="edit-button editar-'+elemento+'" id="'+data[0][0]+'">'+
										'<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>'+
									'</button>'+
								'</div>'+
							'</div>'+
							'<div class="table-row">'+
								'<div class="table-head">No. de cuenta</div>'+
								'<div class="table-cell">'+data[0][3]+'</div>'+
								'<div class="table-cell">'+
									'<button class="edit-button editar-'+elemento+'" id="'+data[0][0]+'">'+
										'<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>'+
									'</button>'+
								'</div>'+
							'</div>'+
							'<div class="table-row">'+
								'<div class="table-head">No. de proveedor</div>'+
								'<div class="table-cell">'+data[0][4]+'</div>'+
								'<div class="table-cell">'+
									'<button class="edit-button editar-'+elemento+'" id="'+data[0][0]+'">'+
										'<i class="fa fa-pencil-square-o fa-lg" aria-hidden="true"></i>'+
									'</button>'+
								'</div>'+
							'</div>'+
						'</div>'
					);
					$(infoPopup).toggle(400);
				}
			});
		});


	/*******Empleado*******/

	
	/*

	function renderWithEdit(data, elemento, ubicacion, titulos){
		
	}		

	*/

})