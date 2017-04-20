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

	/*Borrar Elemento*/

	$('.delete-empresa').click(function(event){
		event.preventDefault();
		$.ajax({
			url: 'php/consultas.php',
			type: 'GET',
			data: {
					id: $(this).attr('id'),
					metodo: 'eliminarEmpresa'
				}
		}).done(function(res){
			if(res != ''){
				alert("Error: "+res);
			}else{
				location.reload();
			}
		});
	});

	/*Insertar Empresa*/

	$('.extra-buttons a').click(function(event){
		event.preventDefault();
		$('.nuevo-elemento').toggle();
		$('.tabla').toggle();
		$(this).children().toggle();
	});

	$('#btnNuevaEmpresa').click(function(event){
		event.preventDefault();
		$.ajax({
			url: 'php/consultas.php',
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


})