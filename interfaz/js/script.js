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

	$('.btnBorrarElemento').click(function(){
		$.ajax({
			url: 'php/eliminar.php',
			type: 'POST',
			data: {
					metodo: 'eliminarEmpresa',
					id: $(this).attr('id')
				}
		}).done(function(res){
			alert(res);
			/*if(res != ''){
				alert('No fue posible eliminar este elemento');
			}else{
				$(link).fadeOut(400);	
			}*/
		});
	});


})