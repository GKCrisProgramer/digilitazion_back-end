use digitalizacionmod2;

-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: digitalizacionmod2
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ca_category`
--

DROP TABLE IF EXISTS `ca_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ca_category` (
  `ID_Category` int(11) NOT NULL AUTO_INCREMENT,
  `Category_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Category`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ca_category`
--

LOCK TABLES `ca_category` WRITE;
/*!40000 ALTER TABLE `ca_category` DISABLE KEYS */;
INSERT INTO `ca_category` VALUES (1,'Manual De Perfiles Descriptivos De Puestos'),(2,'Manual De Políticas'),(3,'Manual De Procesos & Perfiles');
/*!40000 ALTER TABLE `ca_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ca_department`
--

DROP TABLE IF EXISTS `ca_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ca_department` (
  `ID_Department` int(11) NOT NULL AUTO_INCREMENT,
  `Department_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Department`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ca_department`
--

LOCK TABLES `ca_department` WRITE;
/*!40000 ALTER TABLE `ca_department` DISABLE KEYS */;
INSERT INTO `ca_department` VALUES (1,'Departamento SAC'),(2,'Departamento Capital Humano'),(3,'Departamento de Administración y Finanzas'),(4,'Departamento de Contabilidad'),(5,'Departamento de Crédito y Cobranza'),(6,'Departamento de Finanzas'),(7,'Departamento de Nominas'),(8,'Departamento de Procesos y Controles internos'),(9,'Departamento de Servicios Generales'),(10,'Departamento de Tecnologías de la Información'),(11,'Departamento de Tesorería'),(12,'Departamento de Transportes'),(13,'Departamento Compras, Rel.Comerciales, Operaciones y Logística'),(14,'Departamento SAC - Inventarios'),(15,'Departamento SAC - Operaciones'),(16,'Departamento SIC'),(17,'Departamento Ventas'),(18,'Departamento Ventas CEDIS'),(20,'Departamento SAC');
/*!40000 ALTER TABLE `ca_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ca_document`
--

DROP TABLE IF EXISTS `ca_document`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ca_document` (
  `ID_Document` int(11) NOT NULL AUTO_INCREMENT,
  `Document_Name` varchar(255) NOT NULL,
  `Document_LinkRoute` varchar(255) NOT NULL,
  `ID_Category` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Document`),
  KEY `FK_830663f75e590bd69ba1aea9f79` (`ID_Category`),
  CONSTRAINT `FK_830663f75e590bd69ba1aea9f79` FOREIGN KEY (`ID_Category`) REFERENCES `ca_category` (`ID_Category`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ca_document`
--

LOCK TABLES `ca_document` WRITE;
/*!40000 ALTER TABLE `ca_document` DISABLE KEYS */;
INSERT INTO `ca_document` VALUES (1,'Organigrama SAC','1rIFnD2fmSAJ6OCynUL1nzNzBScIiIARk',NULL),(2,'Listado de perfiles','1FROFTQILjnSygvkTLubKSuqzSXZexcuB',NULL),(3,'Organigrama General','1zT3k4eNpn5otW2h2EwkdH6jcCBzW7aO9',NULL),(4,'Manual del Auditor Interno Operativo de CEDIS','1bk03Zk_w4xGtWhIi8fxHs1CigSdjbk4z',NULL),(5,'Manual de Aux. Administrativo (Inventarios)','1LogGZPGZ6Cos8KMijJqpLbRaqGLWIAes',NULL),(6,'Manual de Aux. Administrativo Operaciones CEDIS','1fAUhFCClD8L8_r7Z98ESc-1PkzVwERc7',NULL),(7,'Aux. de iniciativas','1f5j8D0PTtx2SlfqGwk8_0HorJXRG5JjQ',NULL);
/*!40000 ALTER TABLE `ca_document` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ca_profile`
--

DROP TABLE IF EXISTS `ca_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ca_profile` (
  `ID_Profile` int(11) NOT NULL AUTO_INCREMENT,
  `Profile_Name` varchar(100) NOT NULL,
  PRIMARY KEY (`ID_Profile`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ca_profile`
--

LOCK TABLES `ca_profile` WRITE;
/*!40000 ALTER TABLE `ca_profile` DISABLE KEYS */;
INSERT INTO `ca_profile` VALUES (1,'Dueño'),(2,'Admin'),(3,'Visitante'),(5,'almacenista'),(6,'Vendedor A Detalle'),(7,'Gestor De Cartera'),(8,'Coordinador SAC'),(9,'Asistente de Coordinador'),(10,'Compras'),(11,'Aux. Administrativo (Inventarios)'),(12,'Aux. Administrativo (Iniciativas)'),(13,'Aux. Administrativo Operaciones CEDIS'),(14,'Capacitador de administrativo de CEDIS'),(15,'Aux. Administrativo (Cartera)'),(16,'Auditor Interno Operativo de CEDIS'),(17,'Coordinador Logística Kiosko'),(18,'Aux. Administrativo  (Logística Kiosko)');
/*!40000 ALTER TABLE `ca_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ca_user`
--

DROP TABLE IF EXISTS `ca_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ca_user` (
  `ID_User` int(11) NOT NULL AUTO_INCREMENT,
  `User_User` varchar(100) NOT NULL,
  `User_Pass` varchar(100) NOT NULL,
  `ID_Profile` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_User`),
  KEY `FK_1d97a63878577b3e0364a48faef` (`ID_Profile`),
  CONSTRAINT `FK_1d97a63878577b3e0364a48faef` FOREIGN KEY (`ID_Profile`) REFERENCES `ca_profile` (`ID_Profile`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ca_user`
--

LOCK TABLES `ca_user` WRITE;
/*!40000 ALTER TABLE `ca_user` DISABLE KEYS */;
INSERT INTO `ca_user` VALUES (1,'Cris1','$2b$10$9uezIQU.4po7P1Myl0FwaOGrestyzGSaBt9MaQKHE3kMtk6ocwSjq',1),(2,'Fantonio','$2b$10$1W.nL.VhxkNm0wi4.Z/ey.hpzZ9uvQdw4pFPBr2wBkZxZo72jJ3DW',3),(3,'JuanP99','$2b$10$rNnZ/tUXUxleDfs9706SvuY41mY0/dBoGz32YbXfnvYwlcfXAGm2y',2),(4,'Efrain','$2b$10$3Lq7ew8lhWGuL7ZoL.r2/./8PFkS474zafS0FTSOS1eq1cnHdyTQK',1),(5,'Visitante','Visitante1',3),(9,'almacenista','$2b$10$M.jrkPf6d7r8vUHkIyb.0erZHFL9WWymMIDUUp9ausenZ0RkG3EjK',3),(10,'venDeta','$2b$10$4XSx1CLdM4UGILU45.tZk.Ab3m2g5zF6KcVbpb5t2ozXTyRIubu.2',6),(11,'carteraAux','$2b$10$k9kSWciuNogJADmojDTZPuMnYPUhzlNAFXJ4GcET7rmcdznBtsG/m',6);
/*!40000 ALTER TABLE `ca_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `de_depaxdocument`
--

DROP TABLE IF EXISTS `de_depaxdocument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `de_depaxdocument` (
  `ID_DXD` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Department` int(11) NOT NULL,
  `ID_Document` int(11) NOT NULL,
  PRIMARY KEY (`ID_DXD`),
  KEY `FK_78ffa6c6b014852e060e4ba4543` (`ID_Department`),
  KEY `FK_12549688aa7c6aa0d37fb14711a` (`ID_Document`),
  CONSTRAINT `FK_12549688aa7c6aa0d37fb14711a` FOREIGN KEY (`ID_Document`) REFERENCES `ca_document` (`ID_Document`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_78ffa6c6b014852e060e4ba4543` FOREIGN KEY (`ID_Department`) REFERENCES `ca_department` (`ID_Department`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `de_depaxdocument`
--

LOCK TABLES `de_depaxdocument` WRITE;
/*!40000 ALTER TABLE `de_depaxdocument` DISABLE KEYS */;
INSERT INTO `de_depaxdocument` VALUES (1,1,1);
/*!40000 ALTER TABLE `de_depaxdocument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `de_depaxprof`
--

DROP TABLE IF EXISTS `de_depaxprof`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `de_depaxprof` (
  `ID_DXP` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Department` int(11) NOT NULL,
  `ID_Profile` int(11) NOT NULL,
  PRIMARY KEY (`ID_DXP`),
  KEY `FK_a5b734048d007e27393606e222b` (`ID_Department`),
  KEY `FK_41202d7c233ceb8157a8ac0245b` (`ID_Profile`),
  CONSTRAINT `FK_41202d7c233ceb8157a8ac0245b` FOREIGN KEY (`ID_Profile`) REFERENCES `ca_profile` (`ID_Profile`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_a5b734048d007e27393606e222b` FOREIGN KEY (`ID_Department`) REFERENCES `ca_department` (`ID_Department`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `de_depaxprof`
--

LOCK TABLES `de_depaxprof` WRITE;
/*!40000 ALTER TABLE `de_depaxprof` DISABLE KEYS */;
INSERT INTO `de_depaxprof` VALUES (2,1,10),(3,1,11),(4,1,12),(5,1,13),(6,1,14),(7,1,15),(8,1,16),(9,1,17),(10,1,18);
/*!40000 ALTER TABLE `de_depaxprof` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `de_documentxprofile`
--

DROP TABLE IF EXISTS `de_documentxprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `de_documentxprofile` (
  `ID_DXP` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Profile` int(11) NOT NULL,
  `ID_Document` int(11) NOT NULL,
  PRIMARY KEY (`ID_DXP`),
  KEY `FK_24c59f6997526c67d131f88d836` (`ID_Profile`),
  KEY `FK_d5a5f5be94ef3903cfbbb4d45eb` (`ID_Document`),
  CONSTRAINT `FK_24c59f6997526c67d131f88d836` FOREIGN KEY (`ID_Profile`) REFERENCES `ca_profile` (`ID_Profile`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_d5a5f5be94ef3903cfbbb4d45eb` FOREIGN KEY (`ID_Document`) REFERENCES `ca_document` (`ID_Document`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `de_documentxprofile`
--

LOCK TABLES `de_documentxprofile` WRITE;
/*!40000 ALTER TABLE `de_documentxprofile` DISABLE KEYS */;
INSERT INTO `de_documentxprofile` VALUES (1,16,4),(2,11,5),(3,13,6),(4,12,7);
/*!40000 ALTER TABLE `de_documentxprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'digitalizacionmod2'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-12 17:17:16
