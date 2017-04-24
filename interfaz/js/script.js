$(document).ready(function(){

	/*Log in*/

	$('#loginUsuario').val('admin');

	var btnLogin = $('#btnLogin');
	var btnNuevoEmpleado = $('#btnNuevoEmpleado');

	btnLogin.click(function(){
		$.ajax({
			url: 'php/acceso.php',
			type: 'post',
			data: {
					usuario: $('#loginUsuario').val(),
					pwd: $('#loginContrasena').val()
				},
			beforeSend: function(){
				mensajeLogin('Validando...');
			}
		}).done(function(res){
			if(res != ''){
				mensajeLogin('Datos incorrectos');
				$('.mensaje').css('color', 'red');
			}else{
				window.location.replace('../pagina.php');
			}
		});
		mensajeLogin(' ');
	});

	function mensajeLogin(mensaje){
		$('.mensaje').html(mensaje);
		$('.mensaje').css('color', '#1c1c1c');
	}


	/*EMPRESA*/


	/*Borrar Empresa*/

	$(document).on('click', '.delete-empresa',function(){
		var id = $(this).attr('id');
		$('#confirmarEliminarEmpresa .modal-header h6').html('¿Eliminar?');
		$('#confirmarEliminarEmpresa').toggle();
		$('.confirmar-continuar').click(function(){
			continueDeleting(id, 'eliminarEmpresa', 'empresa');
		});
	});

	$('.confirmar-cancelar').click(function(){
		$('#confirmarEliminarEmpresa').toggle();
	});

	/*Insertar Empresa*/

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
				display("empresa");
				$('.nuevo-elemento').toggle();
				$('.informacion').toggle();
				$('.extra-buttons a').children().toggle();
			}
		});
	});

	/*Info Empresa*/

	var display;

	$(document).on('click', '.info-empresa',function(event){
		event.preventDefault();
		display = '#infoEmpresa';
		var id = $(this).attr('id');

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
				$(display+' .modal-header p').html(data[0][1]);
				$(display+' .info').html(
					'<div class="table">'+
						'<div class="table-row">'+
							'<div class="table-head">RFC</div>'+
							'<div class="table-cell">'+data[0][0]+'</div>'+
						'</div>'+
						'<div class="table-row">'+
							'<div class="table-head">Banco</div>'+
							'<div class="table-cell">'+data[0][2]+'</div>'+
						'</div>'+
						'<div class="table-row">'+
							'<div class="table-head">No. de cuenta</div>'+
							'<div class="table-cell">'+data[0][3]+'</div>'+
						'</div>'+
						'<div class="table-row">'+
							'<div class="table-head">No. de proveedor</div>'+
							'<div class="table-cell">'+data[0][4]+'</div>'+
						'</div>'+
					'</div>'
				);
				$(display).toggle(400);
			}
		});
	});


	/*Borrar Empleado*/

	$(document).on('click', '.delete-empleado',function(){
		var id = $(this).attr('id');
		$('#confirmarEliminarEmpleado .modal-header h6').html('¿Eliminar?');
		$('#confirmarEliminarEmpleado').toggle();
		$('.confirmar-continuar').click(function(){
			$('#confirmarEliminarEmpleado').toggle();
		});
	});

	$('.confirmar-cancelar').click(function(){
		$('#confirmarEliminarEmpleado').toggle();
	});


	/*Modal*/

	
	$('.modal').hide();
	var link;

	$('.navbar-menu a').click(function(event){
		link = $(this).attr('href');
		var elemento = link.substring(1, link.length);
		display(elemento, link);
		$(link).fadeIn(400);
	});

	$(".close").click(function(event){
        $(link).fadeOut(400);
    });

    $('.close-popup').click(function(){
    	$(display).toggle(400);
    });


	//GENERAL

	$('.extra-buttons a').click(function(event){
		event.preventDefault();
		$('.nuevo-elemento').toggle();
		$('.informacion').toggle();
		$(this).children().toggle();
	});

	function continueDeleting(id, metodo, elemento){
		$.ajax({
			url: 'php/ediciones.php',
			type: 'GET',
			data: { id, metodo }
		}).done(function(res){
			if(res != ''){
				alert("Error: "+res);
			}else{
				display(elemento);
				$('.confirmar-elemento').hide();
			}
		});
	}
	
	function display(elemento){
		$.ajax({
			url: 'php/consultas.php',
			type: 'POST',
			data: {metodo: elemento}
		}).done(function(array){
			if(array==''){
				$('.informacion').html('<p class="not-found">Tabla vacía</p>');
			}else{
				var data = $.parseJSON(array);
				switch(elemento){
					case "empresa":
							var titulos = ['Nombre', 'No. de proveedor'];
							renderWithExtraButtons(data, elemento, $('#'+elemento+' .informacion'), titulos);
						break;
					case "empleado":
							var titulos = ['Nombre', 'Apellido'];
							renderWithExtraButtons(data, elemento, $('#'+elemento+' .informacion'), titulos);
						break;
				}
			}
		});
	}

	function renderWithExtraButtons(array, elemento, ubicacion, titulos){
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
			render+= rowDiv+
						cellDiv+
							array[i][1]+
						closeDiv+
						cellDiv+
							array[i][2]+
						closeDiv+
						cellDiv+
							'<button class="more-info info-'+elemento+'" id="'+id+'">'+
								'<i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>'+
							'</button>'+
							'<button class="delete-button delete-'+elemento+'" id="'+id+'">'+
								'<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>'+
							'</button>'+
						closeDiv+
					closeDiv;
		});

		render+=closeDiv;

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

	/*

	function renderInfoWithEdit(data, elemento, ubicacion, titulos){

	}

	*/

})