<?php
	echo $_GET['metodo']($_GET['id']);

	function hola($id){
		echo "Probando metodo: '".urldecode($id)."'";
	}
?>

<a href="php/prueba.php?metodo=hola&id='.urlencode($fila['rfc_empresa']).'">Clickeame</a>

<?php
						$tabla = "empresa";
						$sql = "select rfc_empresa, nombre, numero_cuenta from $tabla";
						$resultado = mysqli_query($con, $sql);
						if(mysqli_num_rows($resultado)>0){
							echo '<div class="table">
									<div class="table-row">
										<div class="table-head">Nombre </div>
										<div class="table-head">No. de cuenta</div>
										<div class="table-head"></div>
									</div>';
							while($fila=mysqli_fetch_assoc($resultado)){
								echo '<div class="table-row">
										<div class="table-cell">
											'.$fila['nombre'].'
										</div>
										<div class="table-cell">
											'.$fila['numero_cuenta'].'
										</div>
										<div class="table-cell">
											<button class="more-info btnMasInfoEmpresa" id="'.urlencode($fila['rfc_empresa']).'">
												<i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>
											</button>
											<button class="delete-button delete-empresa" id="'.urlencode($fila['rfc_empresa']).'">
												<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
											</button>
										</div>
									</div>';
							}
							echo '</div>';
						}else
							echo '<p class="not-found">Tabla vacía</p>';
					?>



					<?php
						$tabla = "empleado";
						$sql = "select rfc, nombre, apellido from $tabla";
						$resultado = mysqli_query($con, $sql);
						if(mysqli_num_rows($resultado)>0){
							echo '<div class="table">
									<div class="table-row">
										<div class="table-head">Nombre </div>
										<div class="table-head">Apellido</div>
										<div class="table-head"></div>
									</div>';
							while($fila=mysqli_fetch_assoc($resultado)){
								echo '<div class="table-row">
										<div class="table-cell">
											'.$fila['nombre'].'
										</div>
										<div class="table-cell">
											'.$fila['apellido'].'
										</div>
										<div class="table-cell">
											<button class="more-info btnMasInfoEmpleado" id="'.urlencode($fila['rfc_empresa']).'">
												<i class="fa fa-info-circle fa-2x" aria-hidden="true"></i>
											</button>
											<button class="delete-button delete-empleado" id="'.urlencode($fila['rfc_empresa']).'">
												<i class="fa fa-times-circle fa-2x" aria-hidden="true"></i>
											</button>
										</div>
									</div>';
							}
							echo '</div>';
						}else
							echo '<p class="not-found">Tabla vacía</p>';
					?>