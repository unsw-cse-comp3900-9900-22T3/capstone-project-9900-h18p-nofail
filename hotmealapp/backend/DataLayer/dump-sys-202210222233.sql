-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (arm64)
--
-- Host: localhost    Database: sys
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `User_Follower`
--

DROP TABLE IF EXISTS `User_Follower`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Follower` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(10) NOT NULL,
  `Follower_name` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Follow_Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `User_Follower_FK` (`Username`),
  KEY `User_Follower_FK_1` (`Follower_name`),
  CONSTRAINT `User_Follower_FK` FOREIGN KEY (`Username`) REFERENCES `User` (`Username`),
  CONSTRAINT `User_Follower_FK_1` FOREIGN KEY (`Follower_name`) REFERENCES `User` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Follower`
--

LOCK TABLES `User_Follower` WRITE;
/*!40000 ALTER TABLE `User_Follower` DISABLE KEYS */;
INSERT INTO `User_Follower` VALUES (1,'Ryan','Katherine','2022-10-17 04:51:04');
/*!40000 ALTER TABLE `User_Follower` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Following`
--

DROP TABLE IF EXISTS `User_Following`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Following` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(10) NOT NULL,
  `Following_name` varchar(10) NOT NULL,
  `Following_Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `User_Following_FK` (`Username`),
  KEY `User_Following_FK_1` (`Following_name`),
  CONSTRAINT `User_Following_FK` FOREIGN KEY (`Username`) REFERENCES `User` (`Username`),
  CONSTRAINT `User_Following_FK_1` FOREIGN KEY (`Following_name`) REFERENCES `User` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Following`
--

LOCK TABLES `User_Following` WRITE;
/*!40000 ALTER TABLE `User_Following` DISABLE KEYS */;
INSERT INTO `User_Following` VALUES (1,'Katherine','Ryan','2022-10-17 04:51:04');
/*!40000 ALTER TABLE `User_Following` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe_Comment`
--

DROP TABLE IF EXISTS `Recipe_Comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recipe_Comment` (
  `Comment_Id` int NOT NULL AUTO_INCREMENT,
  `Comment_Username` varchar(10) NOT NULL,
  `Comment_Recipe_Id` int NOT NULL,
  `Comment_To` int DEFAULT NULL,
  `Comment_Content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Comment_Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Comment_Id`),
  KEY `Recipe_Comment_FK` (`Comment_Username`),
  KEY `Recipe_Comment_FK_1` (`Comment_Recipe_Id`),
  CONSTRAINT `Recipe_Comment_FK` FOREIGN KEY (`Comment_Username`) REFERENCES `User` (`Username`),
  CONSTRAINT `Recipe_Comment_FK_1` FOREIGN KEY (`Comment_Recipe_Id`) REFERENCES `Recipe` (`Recipe_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe_Comment`
--

LOCK TABLES `Recipe_Comment` WRITE;
/*!40000 ALTER TABLE `Recipe_Comment` DISABLE KEYS */;
INSERT INTO `Recipe_Comment` VALUES (1,'Katherine',2,NULL,'I like Malatang','2022-10-05 09:19:58'),(2,'Ryan',2,1,'hhh','2022-10-05 09:20:47'),(3,'Ryan',2,NULL,'so good hhhhhhh','2022-10-17 07:25:26'),(4,'Ryan',2,2,'talk too much','2022-10-17 07:32:03');
/*!40000 ALTER TABLE `Recipe_Comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe`
--

DROP TABLE IF EXISTS `Recipe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recipe` (
  `Recipe_Id` int NOT NULL AUTO_INCREMENT,
  `Recipe_Name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Recipe_Username` varchar(10) NOT NULL,
  `Recipe_Style` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Ingredient` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Cooking_Time` int NOT NULL,
  `Steps` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Recipe_Photo` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Recipe_Time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`Recipe_Id`),
  KEY `Recipe_FK` (`Recipe_Username`),
  CONSTRAINT `Recipe_FK` FOREIGN KEY (`Recipe_Username`) REFERENCES `User` (`Username`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe`
--

LOCK TABLES `Recipe` WRITE;
/*!40000 ALTER TABLE `Recipe` DISABLE KEYS */;
INSERT INTO `Recipe` VALUES (1,'Tomato fry eggs','Ryan','Home cooking','oil;tomato; eggs;',20,'Put oil, then put tomato,finally put eggs, it will finish in 20 min','delicious','2022-10-05 07:04:04','good'),(2,'Malatang','Katherine','Sichuan cuisine','Potato; cabbage; chili',20,'Put potato and cabbage into boiling water, then put chili, and it will finish in 20 minutes','spicy','2022-10-05 07:19:12','good'),(6,'fry chicken','Ryan','fast food','chicken;oil',40,'pure oil and fry chicken','hhhhh','2022-10-16 17:53:50','good'),(9,'fry fish','Ryan','fast food','fish,oil',30,'pure oil and fry fish','lol','2022-10-22 08:51:11','true good'),(10,'kkkk','kk','chinese','fish,chicken',30,'hhhhhh','hello','2022-10-22 10:31:27','so good');
/*!40000 ALTER TABLE `Recipe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Ingredients_type`
--

DROP TABLE IF EXISTS `Ingredients_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Ingredients_type` (
  `Ingredient` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`Ingredient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Ingredients_type`
--

LOCK TABLES `Ingredients_type` WRITE;
/*!40000 ALTER TABLE `Ingredients_type` DISABLE KEYS */;
INSERT INTO `Ingredients_type` VALUES ('chicken','meat'),('fish','meat'),('potato','vegetable');
/*!40000 ALTER TABLE `Ingredients_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Favourite`
--

DROP TABLE IF EXISTS `User_Favourite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Favourite` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Favourite_Name` varchar(10) NOT NULL,
  `Favourite_Recipe` int NOT NULL,
  `Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `User_Favourite_FK` (`Favourite_Name`),
  KEY `User_Favourite_FK_1` (`Favourite_Recipe`),
  CONSTRAINT `User_Favourite_FK` FOREIGN KEY (`Favourite_Name`) REFERENCES `User` (`Username`),
  CONSTRAINT `User_Favourite_FK_1` FOREIGN KEY (`Favourite_Recipe`) REFERENCES `Recipe` (`Recipe_Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Favourite`
--

LOCK TABLES `User_Favourite` WRITE;
/*!40000 ALTER TABLE `User_Favourite` DISABLE KEYS */;
INSERT INTO `User_Favourite` VALUES (1,'Ryan',2,'2022-10-17 05:51:11');
/*!40000 ALTER TABLE `User_Favourite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User_Recommendation`
--

DROP TABLE IF EXISTS `User_Recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User_Recommendation` (
  `Recommend_Username` varchar(10) NOT NULL,
  `Recommend_Recipe_Id` int NOT NULL,
  `Recommend_Style` varchar(20) NOT NULL,
  PRIMARY KEY (`Recommend_Username`),
  KEY `User_Recommendation_FK_1` (`Recommend_Recipe_Id`),
  CONSTRAINT `User_Recommendation_FK` FOREIGN KEY (`Recommend_Username`) REFERENCES `User` (`Username`),
  CONSTRAINT `User_Recommendation_FK_1` FOREIGN KEY (`Recommend_Recipe_Id`) REFERENCES `Recipe` (`Recipe_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User_Recommendation`
--

LOCK TABLES `User_Recommendation` WRITE;
/*!40000 ALTER TABLE `User_Recommendation` DISABLE KEYS */;
INSERT INTO `User_Recommendation` VALUES ('Katherine',1,'user_based'),('Ryan',2,'user_based');
/*!40000 ALTER TABLE `User_Recommendation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Recipe_Like`
--

DROP TABLE IF EXISTS `Recipe_Like`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Recipe_Like` (
  `Recipe_Id` int NOT NULL,
  `Like_Username` varchar(10) NOT NULL,
  `Like_Time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Recipe_Id`),
  KEY `Recipe_Like_FK_1` (`Like_Username`),
  CONSTRAINT `Recipe_Like_FK` FOREIGN KEY (`Recipe_Id`) REFERENCES `Recipe` (`Recipe_Id`),
  CONSTRAINT `Recipe_Like_FK_1` FOREIGN KEY (`Like_Username`) REFERENCES `User` (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Recipe_Like`
--

LOCK TABLES `Recipe_Like` WRITE;
/*!40000 ALTER TABLE `Recipe_Like` DISABLE KEYS */;
INSERT INTO `Recipe_Like` VALUES (1,'Katherine','2022-10-05 07:30:17');
/*!40000 ALTER TABLE `Recipe_Like` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `Username` varchar(10) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Password` varchar(30) NOT NULL,
  `Describe` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `User_Photo` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Time_Create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('HaoranNing','AIChaos@mail.com','666nb!','good good study day day up !!!','ahhahahahahah','2022-10-06 14:00:53'),('k1','k1','123',NULL,NULL,'2022-10-20 06:23:00'),('Katherine','z5324823@ad.unsw.edu.au','shixinyi','Hungry','cool','2022-10-05 07:15:00'),('kk','kk','kk',NULL,NULL,'2022-10-06 13:09:23'),('Ryan','z5272870@ad.unsw.edu.au','liuyiyang','Awesome','cool','2022-10-05 06:41:25'),('YiyangLiu','yiyangliu@mail.com','123abcABC!',NULL,NULL,'2022-10-06 13:19:09');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-22 22:33:03
