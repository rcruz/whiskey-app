CREATE DATABASE  IF NOT EXISTS `whiskeyAppTest` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `whiskeyAppTest`;
-- MySQL dump 10.13  Distrib 5.6.13, for osx10.6 (i386)
--
-- Host: localhost    Database: cerealAppTest
-- ------------------------------------------------------
-- Server version	5.5.35-0ubuntu0.12.04.2

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
-- Table structure for table `cerealRankings`
--

DROP TABLE IF EXISTS `cerealRankings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cerealRankings` (
  `did` int(11) NOT NULL AUTO_INCREMENT,
  `uid` varchar(45) NOT NULL,
  `cid` int(11) NOT NULL,
  `desc` varchar(300) DEFAULT NULL,
  `tastiness` int(11) NOT NULL DEFAULT '5',
  `crunchiness` int(11) NOT NULL DEFAULT '5',
  `snackability` int(11) NOT NULL DEFAULT '5',
  `onsaleness` int(11) NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `location` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`did`),
  UNIQUE KEY `cerealRankings-uid` (`uid`,`cid`),
  KEY `cerealRankings-uid_idx` (`uid`),
  KEY `cerealRankings-cid_idx` (`cid`),
  CONSTRAINT `cerealRankings-cid` FOREIGN KEY (`cid`) REFERENCES `cereals` (`cid`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `cerealRankings-uid` FOREIGN KEY (`uid`) REFERENCES `users` (`uid`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cerealRankings`
--

LOCK TABLES `cerealRankings` WRITE;
/*!40000 ALTER TABLE `cerealRankings` DISABLE KEYS */;
INSERT INTO `cerealRankings` VALUES (1,'admin',1,'Yum',5,5,5,0,'2014-06-07 18:40:19',NULL);
/*!40000 ALTER TABLE `cerealRankings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cereals`
--

DROP TABLE IF EXISTS `cereals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cereals` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `brand` varchar(45) NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `UNIQUE` (`name`,`brand`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cereals`
--

LOCK TABLES `cereals` WRITE;
/*!40000 ALTER TABLE `cereals` DISABLE KEYS */;
INSERT INTO `cereals` VALUES (2,'Chex','General Mills'),(1,'Corn Pops','Kellogg\'s');
/*!40000 ALTER TABLE `cereals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `uid` varchar(45) NOT NULL,
  `email` varchar(60) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`uid`),
  UNIQUE KEY `uid_UNIQUE` (`uid`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('admin','admin@admin.com','Master','Blaster','$2a$10$Ov5/Yoab3TfapcsFEeKfDevS1LmbPCkekLaEZc/tmm4WFdTB/7oa6'),('rcruz','rcruz@email.com','Rowell','Cruz','$2a$10$v.8uOeZxi0yWdcQgNQ0c5ueTskQK63HB4.3rJLjDKBmQgvVtC1VFK');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-06-08 16:43:27
