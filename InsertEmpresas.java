import java.util.Random;

public class InsertEmpresas{
	public static void main(String[] args) {
		Random rd = new Random();

		char c;

		int n;

		for (int k = 0; k<100; k++) {//100 cadenas
			String rfc_empresa = "";
			String nombre = "";
			String banco = "";
			String numero_cuenta = "";
			String numero_proveedor = "";

			//RFC_EMPRESA
			for (int i = 0; i<13; i++) {
				c = (char)(rd.nextInt(74)+48);
				rfc_empresa+=c;
			}

			//NOMBRE
			n = (rd.nextInt(40)+10);
			for (int i = 0; i<n; i++) {
				c = (char)(rd.nextInt(57)+65);
				nombre+=c;
			}

			//BANCO
			n = (rd.nextInt(20)+10);
			for (int i = 0; i<n; i++) {
				c = (char)(rd.nextInt(57)+65);
				banco+=c;
			}

			//NUMERO_CUENTA
			for (int i = 0; i<10; i++) {
				c = (char)(rd.nextInt(9)+48);
				numero_cuenta+=c;
			}

			//NUMERO_PROVEEDOR
			n = (rd.nextInt(10)+1);
			for (int i = 0; i<n; i++) {
				c = (char)(rd.nextInt(9)+48);
				numero_proveedor+=c;
			}

			System.out.printf("insert into empresa values('%s', '%s', '%s', %s, %s); \n", rfc_empresa, nombre, banco, numero_cuenta, numero_proveedor);
		}	
	}
}