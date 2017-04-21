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

	/*Modal*/

	$('.modal').hide();
	var link;

	$('.navbar-menu a').click(function(event){
		link = $(this).attr('href');
		$(link).fadeIn(400);
	});

	$(".close").click(function(event){
        $(link).fadeOut(400);
    });

    $('.close-popup').click(function(){
    	$(display).toggle(400);
    });

	/*Borrar Empresa*/

	$('.delete-empresa').click(function(event){
		event.preventDefault();
		var id = $(this).attr('id');
		$('#confirmarEliminarEmpresa .modal-header h6').html('¿Eliminar '+id+'?');
		$('#confirmarEliminarEmpresa').toggle();
		$('.confirmar-continuar').click(function(){
			continueDeleting(id, 'eliminarEmpresa');
		});
	});

	$('.confirmar-cancelar').click(function(){
		$('#confirmarEliminarEmpresa').toggle();
	});

	function continueDeleting(id, metodo){
		$.ajax({
			url: 'php/ediciones.php',
			type: 'GET',
			data: {
					id: id,
					metodo: metodo
				}
		}).done(function(res){
			if(res != ''){
				alert("Error: "+res);
			}else{
				location.reload();
			}
		});
	}

	//GENERAL

	$('.extra-buttons a').click(function(event){
		event.preventDefault();
		$('.nuevo-elemento').toggle();
		$('.tabla').toggle();
		$(this).children().toggle();
	});

	/*Insertar Empresa*/

	$('.btnNuevaEmpresa').click(function(event){
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
				location.reload();
			}
		});
	});

	/*Info Empresa*/

	var display;

	$('.btnMasInfoEmpresa').click(function(event){
		event.preventDefault();
		display = '#infoEmpresa';
		var id = $(this).attr('id');

		$.ajax({
			url: 'php/consultas.php',
			type: 'GET',
			data: {
					id: id,
					metodo: 'selectEmpresa'
			}
		}).done(function(res){
			if(res==' '){
				alert("Error: "+res);
			}else{
				var data = jQuery.parseJSON(res);
				$(display+' .modal-header p').html(data.nombre);
				$(display+' .info').html(
					'<div class="table">'+
						'<div class="table-row">'+
							'<div class="table-head">RFC</div>'+
							'<div class="table-cell">'+data.rfc_empresa+'</div>'+
						'</div>'+
						'<div class="table-row">'+
							'<div class="table-head">Banco</div>'+
							'<div class="table-cell">'+data.banco+'</div>'+
						'</div>'+
						'<div class="table-row">'+
							'<div class="table-head">No. de cuenta</div>'+
							'<div class="table-cell">'+data.numero_cuenta+'</div>'+
						'</div>'+
						'<div class="table-row">'+
							'<div class="table-head">No. de proveedor</div>'+
							'<div class="table-cell">'+data.numero_proveedor+'</div>'+
						'</div>'+
					'</div>'
				);
				$(display).toggle(400);
			}
		});
	});


	/*Borrar Empleado*/

	$('.delete-empleado').click(function(event){
		event.preventDefault();
		var id = $(this).attr('id');
		$('#confirmarEliminarEmpleado .modal-header h6').html('¿Eliminar '+id+'?');
		$('#confirmarEliminarEmpleado').toggle();
		$('.confirmar-continuar').click(function(){
			$('#confirmarEliminarEmpleado').toggle();
		});
	});

	$('.confirmar-cancelar').click(function(){
		$('#confirmarEliminarEmpleado').toggle();
	});


})