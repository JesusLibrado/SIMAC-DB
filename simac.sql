-- MySQL dump 10.16  Distrib 10.1.19-MariaDB, for Win32 (AMD64)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.1.19-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cotizacion`
--

DROP TABLE IF EXISTS `cotizacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cotizacion` (
  `folio` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `condiciones_pago` varchar(75) DEFAULT NULL,
  `monto` float DEFAULT NULL,
  `rfc_solicitante` varchar(13) NOT NULL,
  `folio_trabajo` int(11) DEFAULT NULL,
  `fecha_entrega_deseada` date DEFAULT NULL,
  `numero_orden_compra` int(11) DEFAULT NULL,
  PRIMARY KEY (`folio`),
  KEY `rfc_solicitante` (`rfc_solicitante`),
  KEY `folio_trabajo` (`folio_trabajo`),
  CONSTRAINT `cotizacion_ibfk_1` FOREIGN KEY (`rfc_solicitante`) REFERENCES `empresa` (`rfc`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cotizacion_ibfk_2` FOREIGN KEY (`folio_trabajo`) REFERENCES `trabajo` (`folio`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cotizacion`
--

LOCK TABLES `cotizacion` WRITE;
/*!40000 ALTER TABLE `cotizacion` DISABLE KEYS */;
INSERT INTO `cotizacion` VALUES (267,'2017-03-30','El trabajo debe ser realizado en un plazo maximo de 2 dias',2000,'BCA001206674',242,'2017-04-01',345),(268,'2017-03-31','El trabajo debe ser realizado en un plazo maximo de 20 dias',800,'BCA001206674',243,'2017-04-19',445),(269,'2017-04-01','El trabajo debe ser realizado en un plazo maximo de 5 dias',5000,'BCA001206674',244,'2017-04-06',565),(270,'2017-04-01','El trabajo debe ser realizado en un plazo maximo de 3 dias',2500,'CCO7409189M1',245,'2017-04-04',36),(271,'2017-04-02','El trabajo debe ser realizado en un plazo maximo de 3 dias',400,'CCO7409189M1',246,'2017-04-05',3235),(272,'2017-04-02','El trabajo debe ser realizado en un plazo maximo de 6 dias',1200,'CCO7409189M1',247,'2017-04-08',335),(273,'2017-04-03','El trabajo debe ser realizado en un plazo maximo de 7 dias',3000,'CEM880726UZA',248,'2017-04-10',235),(274,'2017-04-03','El trabajo debe ser realizado en un plazo maximo de 10 dias',1500,'CEM880726UZA',249,'2017-04-13',2365),(275,'2017-04-04','El trabajo debe ser realizado en un plazo maximo de 1 dia',1800,'CEM880726UZA',250,'2017-04-05',22),(276,'2017-04-04','El trabajo debe ser realizado en un plazo maximo de 5 dias',200,'CAT021004JA4',251,'2017-04-09',124),(277,'2017-04-04','El trabajo debe ser realizado en un plazo maximo de 3 dias',6200,'CAT021004JA4',252,'2017-04-07',11),(278,'2017-04-05','El trabajo debe ser realizado en un plazo maximo de 2 dias',600,'CAT021004JA4',253,'2017-04-07',153),(279,'2017-04-06','El trabajo debe ser realizado en un plazo maximo de 2 dias',3000,'DUL100819SR1',254,'2017-04-08',1653),(280,'2017-04-06','El trabajo debe ser realizado en un plazo maximo de 11 dias',400,'DUL100819SR1',255,'2017-04-17',3566),(281,'2017-04-06','El trabajo debe ser realizado en un plazo maximo de 20 dias',600,'DUL100819SR1',256,'2017-04-26',764),(282,'2017-04-06','El trabajo debe ser realizado en un plazo maximo de 2 dias',200,'FRO0303066G2',257,'2017-04-08',874),(283,'2017-04-06','El trabajo debe ser realizado en un plazo maximo de 5 dias',500,'FRO0303066G2',258,'2017-04-11',876),(284,'2017-04-06','El trabajo debe ser realizado en un plazo maximo de 7 dias',150,'FRO0303066G2',259,'2017-04-13',975),(285,'2017-04-07','El trabajo debe ser realizado en un plazo maximo de 1 dia',1000,'LES860203JM8',260,'2017-04-08',335),(286,'2017-04-07','El trabajo debe ser realizado en un plazo maximo de 2 dias',1500,'LES860203JM8',261,'2017-04-09',873),(287,'2017-04-07','El trabajo debe ser realizado en un plazo maximo de 10 dias',550,'LES860203JM8',262,'2017-04-17',196);
/*!40000 ALTER TABLE `cotizacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `direccion_empleado`
--

DROP TABLE IF EXISTS `direccion_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direccion_empleado` (
  `rfc_empleado` varchar(13) NOT NULL,
  `municipio` varchar(25) DEFAULT NULL,
  `colonia` varchar(20) DEFAULT NULL,
  `calle` varchar(20) DEFAULT NULL,
  `numero` int(11) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  KEY `rfc_empleado` (`rfc_empleado`),
  CONSTRAINT `direccion_empleado_ibfk_1` FOREIGN KEY (`rfc_empleado`) REFERENCES `empleado` (`rfc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `direccion_empleado`
--

LOCK TABLES `direccion_empleado` WRITE;
/*!40000 ALTER TABLE `direccion_empleado` DISABLE KEYS */;
INSERT INTO `direccion_empleado` VALUES ('CAEF6805309K4','Puebla','San Baltazar Lindavi','Libertad',5947,'2221397086'),('EELC890319KC2','Puebla','Tepeyac','Libertad',67,'2221280993'),('CACF960820CM0','Puebla','San Baltazar Lindavi','Libertad',5947,'2228526256'),('PEJC9606211V8','Puebla','San Baltazar Campech','Libertad',5702,'2223339363'),('RARA010123HPL','Puebla','San Francisco Totime','Margaritas',6102,'2225981244'),('RULL6620128T2','Puebla','Azcarate','20 Oriente',1308,'2223580257'),('MACM940612H20','Puebla','Anzures','8 Sur',3312,'2226335731'),('MACL960823T91','Puebla','San Baltazar Campech','Libertad',5707,'7971012253'),('ZOPA720613PJ6','Puebla','San Francisco Acatep','Huejotzingo',4,'2225592473'),('PECF6404052C9','Puebla','San Rafael Comac','Panteon',6,'2221947398'),('CUAA7104251W3','Puebla','San Francisco Acatep','Zacatlan',73,'2228537947');
/*!40000 ALTER TABLE `direccion_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empleado` (
  `rfc` varchar(13) NOT NULL,
  `curp` varchar(18) NOT NULL,
  `nss` varchar(11) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT NULL,
  `salario` float DEFAULT NULL,
  `fecha_contratacion` date NOT NULL,
  `jefe` varchar(13) DEFAULT 'CAEF6805309K4',
  `nombre` varchar(50) DEFAULT NULL,
  `apellido` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`rfc`),
  KEY `jefe` (`jefe`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`jefe`) REFERENCES `empleado` (`rfc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES ('CACF960820CM0','CACF960820HPLSSR06','57159689470',1,1100,'2008-11-12','CAEF6805309K4','Fernando','Castillo Cosme'),('CAEF6805309K4','CAEF680530HPLSSR03','62876833112',1,0,'2008-10-01',NULL,'Fernando','Castillo Espindola'),('CUAA7104251W3','CUAA710425MPLTZR05','03147192425',1,900,'2016-11-15','CAEF6805309K4','Araceli','Cuatzo Azcatl'),('EELC890319KC2','EELC890913HMCSRR08','92038900087',1,2200,'2015-12-20','CAEF6805309K4','Carlos','Espejel Lara'),('MACL960823T91','MACL960823HPLRRS05','48159672269',0,900,'2016-02-05','CAEF6805309K4','Luis Enrique','Mart?nez Cruz'),('MACM940612H20','MACM940613HPLRRSO8','6915968261',1,1100,'2015-08-11','CAEF6805309K4','Yordi Misael','Mart?nez Cruz'),('PECF6404052C9','PECF640205MPLRLL03','02176401962',1,800,'2016-07-13','CAEF6805309K4','Maria Felipa','Perez Cielo'),('PEJC9606211V8','PEJC960621HPLRRR08','23302132364',0,900,'2016-01-10','CAEF6805309K4','Carlos Alfonso','Perez Jaramillo'),('RARA010123HPL','RARA010123HPLMLNA0','57882301997',1,900,'2017-02-15','CAEF6805309K4','Angel Gustavo','Ramirez Roldan'),('RULL6620128T2','RULL662012HPLSAI06','62850325146',0,2000,'2016-09-29','CAEF6805309K4','Luis Jacinto','Ruiz de L?zaro'),('ZOPA720613PJ6','ZOPA720613MPLTRN09','62897275871',1,1200,'2011-03-08','CAEF6805309K4','Antonia','Zoto Perez');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa` (
  `rfc` varchar(13) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `banco` varchar(30) DEFAULT NULL,
  `numero_cuenta` bigint(20) DEFAULT NULL,
  `numero_proveedor` int(11) DEFAULT NULL,
  PRIMARY KEY (`rfc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresa`
--

LOCK TABLES `empresa` WRITE;
/*!40000 ALTER TABLE `empresa` DISABLE KEYS */;
INSERT INTO `empresa` VALUES ('BCA001206674','BODEGA CRUZ AZUL DEL CENTRO S.A. DE C.V.','Bancomer',6891,112),('CAT021004JA4','CONCRETOS DE ALTA TECNOLOGIA S.A. DE C.V.','Bancomer',706,353),('CCO7409189M1','CEMEX CONCRETOS S.A. DE C.V.','Scotiabank',6400,23),('CEM880726UZA','CEMEX S.A.B DE C.V.','Scotiabank',6800,432),('DUL100819SR1','DULCET S.A. DE C.V.','Bancomer',1812,235),('FRO0303066G2','FRODEEMI S.A. DE C.V.','Banamex',7514,532),('LES860203JM8','LESTER S.A. DE C.V.','HSBC',5547,33),('RIT030612PE2','REFACCIONES INDUSTRIALES Y DEL TRANSPORTE S.A. DE ','Bancomer',7074,145);
/*!40000 ALTER TABLE `empresa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `factura` (
  `folio` int(11) NOT NULL,
  `monto` float DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `forma_pago` enum('Deposito','Efectivo','Transferencia','Otro') NOT NULL,
  `folio_trabajo` int(11) NOT NULL,
  `rfc_empresa` varchar(13) NOT NULL,
  PRIMARY KEY (`folio`),
  KEY `folio_trabajo` (`folio_trabajo`),
  KEY `rfc_empresa` (`rfc_empresa`),
  CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`folio_trabajo`) REFERENCES `trabajo` (`folio`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `factura_ibfk_2` FOREIGN KEY (`rfc_empresa`) REFERENCES `empresa` (`rfc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `factura`
--

LOCK TABLES `factura` WRITE;
/*!40000 ALTER TABLE `factura` DISABLE KEYS */;
INSERT INTO `factura` VALUES (232,2000,'2017-03-30','Deposito',242,'BCA001206674'),(233,800,'2017-03-31','Efectivo',243,'BCA001206674'),(234,5000,'2017-04-01','Deposito',244,'BCA001206674'),(235,2500,'2017-04-01','Transferencia',245,'CCO7409189M1'),(236,400,'2017-04-02','Deposito',246,'CCO7409189M1'),(237,1200,'2017-04-02','Transferencia',247,'CCO7409189M1'),(238,3000,'2017-04-03','Transferencia',248,'CEM880726UZA'),(239,1500,'2017-04-03','Efectivo',249,'CEM880726UZA'),(240,1800,'2017-04-04','Transferencia',250,'CEM880726UZA'),(241,200,'2017-04-04','Deposito',251,'CAT021004JA4'),(242,6200,'2017-04-04','Deposito',252,'CAT021004JA4'),(243,600,'2017-04-05','Deposito',253,'CAT021004JA4'),(244,3000,'2017-04-06','Deposito',254,'DUL100819SR1'),(245,400,'2017-04-06','Efectivo',255,'DUL100819SR1'),(246,600,'2017-04-06','Deposito',256,'DUL100819SR1'),(247,200,'2017-04-06','Transferencia',257,'FRO0303066G2'),(248,500,'2017-04-06','Deposito',258,'FRO0303066G2'),(249,150,'2017-04-06','Efectivo',259,'FRO0303066G2'),(250,1000,'2017-04-07','Efectivo',260,'LES860203JM8'),(251,1500,'2017-04-07','Efectivo',261,'LES860203JM8'),(252,550,'2017-04-07','Efectivo',262,'LES860203JM8');
/*!40000 ALTER TABLE `factura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gasto`
--

DROP TABLE IF EXISTS `gasto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gasto` (
  `fecha` date NOT NULL,
  `total` float NOT NULL,
  `material` float DEFAULT NULL,
  `mano_obra` float DEFAULT NULL,
  `luz` float DEFAULT NULL,
  `gasolina` float DEFAULT NULL,
  `registrado_por` varchar(13) DEFAULT NULL,
  PRIMARY KEY (`fecha`),
  KEY `registrado_por` (`registrado_por`),
  CONSTRAINT `gasto_ibfk_1` FOREIGN KEY (`registrado_por`) REFERENCES `empleado` (`rfc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gasto`
--

LOCK TABLES `gasto` WRITE;
/*!40000 ALTER TABLE `gasto` DISABLE KEYS */;
INSERT INTO `gasto` VALUES ('2007-04-20',10000,2500,2500,2500,2500,'CAEF6805309K4'),('2015-12-31',415,50,50,15,300,'CUAA7104251W3'),('2016-04-01',415,50,50,15,300,'CACF960820CM0'),('2017-03-01',4400.54,400.54,500,0,3500,'CACF960820CM0'),('2017-04-20',4500.54,500.54,500,0,3500,'CAEF6805309K4');
/*!40000 ALTER TABLE `gasto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_contacto_empleado`
--

DROP TABLE IF EXISTS `info_contacto_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_contacto_empleado` (
  `rfc_empleado` varchar(13) NOT NULL,
  `num_celular` varchar(15) DEFAULT NULL,
  `correo_electronico` varchar(70) DEFAULT NULL,
  KEY `rfc_empleado` (`rfc_empleado`),
  CONSTRAINT `info_contacto_empleado_ibfk_1` FOREIGN KEY (`rfc_empleado`) REFERENCES `empleado` (`rfc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_contacto_empleado`
--

LOCK TABLES `info_contacto_empleado` WRITE;
/*!40000 ALTER TABLE `info_contacto_empleado` DISABLE KEYS */;
INSERT INTO `info_contacto_empleado` VALUES ('CAEF6805309K4','2221397086','fercastillo30@hotmail.com'),('EELC890319KC2','2228526256','carlos.espejel@hotmail.com'),('PEJC9606211V8','2223339363','carlos.jaramillo@hotmail.com'),('CACF960820CM0','2228526256','fcastillocosme@gmail.com'),('RARA010123HPL','2225981244','gustavorr898@gmail.com'),('RULL6620128T2','2223580257','jacinto.ruiz@hotmail.com'),('MACM940612H20','2226335731','yordi.misael@hotmail.com'),('MACL960823T91','7971012253','enrique.martinez@hotmail.com'),('ZOPA720613PJ6','2311060','antonia.zoto@hotmail.com'),('PECF6404052C9','2403714','felipa.prz@gmail.com'),('CUAA7104251W3','2458729','araceli.cuatzo@hotmail.com');
/*!40000 ALTER TABLE `info_contacto_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realiza`
--

DROP TABLE IF EXISTS `realiza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `realiza` (
  `folio_trabajo` int(11) NOT NULL,
  `rfc_empleado` varchar(13) NOT NULL,
  PRIMARY KEY (`folio_trabajo`,`rfc_empleado`),
  KEY `rfc_empleado` (`rfc_empleado`),
  CONSTRAINT `realiza_ibfk_1` FOREIGN KEY (`folio_trabajo`) REFERENCES `trabajo` (`folio`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `realiza_ibfk_2` FOREIGN KEY (`rfc_empleado`) REFERENCES `empleado` (`rfc`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realiza`
--

LOCK TABLES `realiza` WRITE;
/*!40000 ALTER TABLE `realiza` DISABLE KEYS */;
INSERT INTO `realiza` VALUES (242,'CACF960820CM0'),(242,'CAEF6805309K4'),(243,'CAEF6805309K4'),(244,'CACF960820CM0'),(245,'CAEF6805309K4'),(250,'CACF960820CM0'),(250,'CAEF6805309K4'),(251,'CACF960820CM0'),(260,'CUAA7104251W3'),(261,'CUAA7104251W3');
/*!40000 ALTER TABLE `realiza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trabajo`
--

DROP TABLE IF EXISTS `trabajo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trabajo` (
  `folio` int(11) NOT NULL,
  `servicio` enum('Reparacion','Fabricacion','Limpieza','Mantenimiento','Maquinado','Suministro','Cambios','Instalacion','Otros') NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`folio`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trabajo`
--

LOCK TABLES `trabajo` WRITE;
/*!40000 ALTER TABLE `trabajo` DISABLE KEYS */;
INSERT INTO `trabajo` VALUES (242,'Reparacion','Reparacion de bomba pluma de CR6392'),(243,'Fabricacion','Fabricacion de asador de acero inoxidable'),(244,'Mantenimiento','Mantenimiento a planta'),(245,'Maquinado','Maquinado de poleas con material 1018 tratado'),(246,'Suministro','Suministro de orrings de 21 y 22'),(247,'Instalacion','Instalacion de guardas para banda en planta 2'),(248,'Suministro','Suministro de piston para CR 3233'),(249,'Maquinado','Maquinado de abrazaderas de bronce'),(250,'Instalacion','Instalacion de ba?o en oficinas de planta 3'),(251,'Limpieza','Limpieza de edificio de oficinas'),(252,'Maquinado','Maquinado de brazo para bomba en 1018 tratado'),(253,'Otros','Renta de mesas, sillas, horno de microondas y minifrigorico'),(254,'Fabricacion','Fabricacion de cadenas'),(255,'Mantenimiento','Mantenimiento a aspersor de CR 2388'),(256,'Mantenimiento','Mantenimiento a aspersor de CR 6623'),(257,'Reparacion','Reparacion de bomba pluma de CR6522'),(258,'Reparacion','Reparacion de piston de CR6222'),(259,'Reparacion','Reparacion de guarda de CR6190'),(260,'Instalacion','Instalacion de aire acondicionado en oficinas de planta 1'),(261,'Suministro','Suministro de orrings 19, 20 y 21'),(262,'Limpieza','Limpieza del edificio de oficinas en planta 1');
/*!40000 ALTER TABLE `trabajo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-04-24 12:07:18
