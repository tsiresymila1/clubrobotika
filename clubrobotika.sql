-- phpMyAdmin SQL Dump
-- version 5.0.4deb2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 09 mars 2021 à 21:03
-- Version du serveur :  10.5.8-MariaDB-3
-- Version de PHP : 7.4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `clubrobotika`
--

-- --------------------------------------------------------

--
-- Structure de la table `Coaches`
--

CREATE TABLE `Coaches` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `matricule` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `present` int(11) DEFAULT NULL,
  `missing` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `Coaches`
--

INSERT INTO `Coaches` (`id`, `userId`, `username`, `name`, `lastname`, `phone`, `email`, `matricule`, `category`, `image`, `password`, `role`, `present`, `missing`, `createdAt`, `updatedAt`) VALUES
(1, NULL, 'tsiresy', 'RANDRIARIMANANA', 'Tsiresy Milà', '0342083574', 'tsiresymila@gmail.com', 'C0-0005', 'B', 'photo.jpg', 'dab90a4d7506f95ef04e10947361b2fc78954d624b471051ba879343b3d909c4', 'superadmin', NULL, NULL, NULL, '2021-03-09 19:12:01'),
(2, NULL, 'lorie', 'RAZANAKOTO', 'Fenohasintsoa Marilia Lauriane', '0341328722', 'lorierazanakoto35@gmail.com', 'C0-0008', 'A', 'l.jpg', 'ac8a43e203660476b7627030f5c195616fd523f6c61bd6007faad3d2a05219c2', NULL, NULL, NULL, '2021-03-09 18:25:23', '2021-03-09 20:01:42'),
(3, NULL, 'nomena', 'NIAVOARINDRANTO', 'Nomentsoa Zo Lalaina', '', '', 'C0-0014', 'Jeux Vidéo', 'nomena.jpg', '023531ab5310570521b63dc5e00b48d15f55a84c2b15ad76c87cb54886d15bd1', NULL, NULL, NULL, '2021-03-09 18:37:47', '2021-03-09 19:16:51'),
(4, NULL, 'tanjona', 'ANDRIANARISOA', 'Tanjoniaina Miarinaja', '', '', 'C0-0013', 'A', 'tanjona.jpg', 'a116061095aaa0b30b729856b644ae1a2c0e618135314e8e0437688892cc4fe7', NULL, NULL, NULL, '2021-03-09 18:51:22', '2021-03-09 19:12:58'),
(5, NULL, 'initia', 'RAKOTONDRASOA', 'Heriniaina Stéphanie', '', '', 'C0-0015', 'A', 'initia.jpg', '5db1442e6dc0a8bd5d9712fddb0c6b24603fb6d5a5a26be81a7c3567cc254f55', NULL, NULL, NULL, '2021-03-09 18:54:20', '2021-03-09 19:13:17'),
(6, NULL, 'efraime', 'ANDRIMIJORO', 'Heriniavo Efraime', '', '', 'C0-0001', 'B', 'efraime.jpg', 'a3122453a141ce36aa4c383f4b83b286fa276da17b85512affb3781d7024bca7', NULL, NULL, NULL, '2021-03-09 18:56:40', '2021-03-09 19:13:30'),
(7, NULL, 'francisca', 'RAMIALISOA', 'Francisca Nandrianina', '', '', 'C0-0004', 'B', 'francisca.jpg', 'ba83a3b33a8d1118ab39c321e80675fafed230d561983c526a3324225810bc16', NULL, NULL, NULL, '2021-03-09 18:57:30', '2021-03-09 19:13:42'),
(8, NULL, 'nyaina', 'MALALATIANA', 'Ny Aìna', '', '', 'C0-0002', 'A', 'nyaina.jpg', 'nyaina', NULL, NULL, NULL, '2021-03-09 19:01:26', '2021-03-09 19:42:00'),
(9, NULL, 'christian', 'RAZAKAMAHERY', 'Nomena Christian', '', '', 'C0-0007', 'Jeux Vidéo', 'christian.jpg', 'df59c257785d70706a411e70e123aff2844d6d57eb19f3a071afc8e019f5f2d8', NULL, NULL, NULL, '2021-03-09 19:03:34', '2021-03-09 19:16:42'),
(10, NULL, 'maeva', 'RAZAFIMANJATO', 'Maevasoa Irina Gabriela', '', '', 'C0-0018', 'C', 'maeva.jpg', '5234c841d99737c74c1935277a38743829c8104ac8239d6795ac16df91d94ad4', NULL, NULL, NULL, '2021-03-09 19:04:32', '2021-03-09 19:17:12'),
(11, NULL, 'francilia', 'SOAZARA ', 'Mabelle Francilia', '', '', 'C0-0009', 'C', 'fancilia.jpg', 'cc2c3e8c0c3ca70f64089d61a8e58954f11a5429ea010e7e9c863d490b8766c2', NULL, NULL, NULL, '2021-03-09 19:08:29', '2021-03-09 19:17:34'),
(12, NULL, 'manu', 'RAFELIARIMANANA', 'Sandratriniaina Manuella', '', '', 'C0-0003', 'B', 'manu.jpg', 'dbde6e431edd7f4672f039680c58d4a0b59bff2dacfa25d63a228ba2ce392bd1', NULL, NULL, NULL, '2021-03-09 19:09:30', '2021-03-09 19:17:51'),
(13, NULL, 'jimmy', 'RASOANAIVO', 'Andry Jimmy', '', '', 'C0-0017', 'C', 'jim.jpg', '930a68a51a2db950f58fd3b0b5f1d76f56afaa16e12a418d71ca6c25f2390424', NULL, NULL, NULL, '2021-03-09 19:10:02', '2021-03-09 19:18:06'),
(14, NULL, 'jimmy', 'RASAMIMANANA', 'Fanjatiana Mickaelle', '', '', 'C0-0006', 'C', 'mickaela.jpg', '930a68a51a2db950f58fd3b0b5f1d76f56afaa16e12a418d71ca6c25f2390424', NULL, NULL, NULL, '2021-03-09 19:53:56', '2021-03-09 19:53:56');

-- --------------------------------------------------------

--
-- Structure de la table `CoachFiles`
--

CREATE TABLE `CoachFiles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `coachid` int(11) NOT NULL,
  `FileId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `CoachProgram`
--

CREATE TABLE `CoachProgram` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `coachid` int(11) NOT NULL,
  `ProgramId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `CoachPrograms`
--

CREATE TABLE `CoachPrograms` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `programid` int(11) NOT NULL,
  `CoachId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Files`
--

CREATE TABLE `Files` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `ProgramFiles`
--

CREATE TABLE `ProgramFiles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `programid` int(11) NOT NULL,
  `FileId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Programs`
--

CREATE TABLE `Programs` (
  `id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `firstpage` int(11) DEFAULT NULL,
  `lastpage` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `StudentFiles`
--

CREATE TABLE `StudentFiles` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `studentid` int(11) NOT NULL,
  `FileId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `Students`
--

CREATE TABLE `Students` (
  `id` int(11) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birthhday` varchar(255) DEFAULT NULL,
  `birthplace` varchar(255) DEFAULT NULL,
  `isUniv` tinyint(1) DEFAULT NULL,
  `grade` varchar(255) DEFAULT NULL,
  `field` varchar(255) DEFAULT NULL,
  `school` varchar(255) DEFAULT NULL,
  `matricule` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `motivation` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `present` int(11) DEFAULT NULL,
  `missing` int(11) DEFAULT NULL,
  `time` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Coaches`
--
ALTER TABLE `Coaches`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `CoachFiles`
--
ALTER TABLE `CoachFiles`
  ADD PRIMARY KEY (`coachid`,`FileId`),
  ADD KEY `FileId` (`FileId`);

--
-- Index pour la table `CoachProgram`
--
ALTER TABLE `CoachProgram`
  ADD PRIMARY KEY (`coachid`,`ProgramId`),
  ADD KEY `ProgramId` (`ProgramId`);

--
-- Index pour la table `CoachPrograms`
--
ALTER TABLE `CoachPrograms`
  ADD PRIMARY KEY (`programid`,`CoachId`),
  ADD KEY `CoachId` (`CoachId`);

--
-- Index pour la table `Files`
--
ALTER TABLE `Files`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ProgramFiles`
--
ALTER TABLE `ProgramFiles`
  ADD PRIMARY KEY (`programid`,`FileId`),
  ADD KEY `FileId` (`FileId`);

--
-- Index pour la table `Programs`
--
ALTER TABLE `Programs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `StudentFiles`
--
ALTER TABLE `StudentFiles`
  ADD PRIMARY KEY (`studentid`,`FileId`),
  ADD KEY `FileId` (`FileId`);

--
-- Index pour la table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Coaches`
--
ALTER TABLE `Coaches`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `Files`
--
ALTER TABLE `Files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Programs`
--
ALTER TABLE `Programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `Students`
--
ALTER TABLE `Students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `CoachFiles`
--
ALTER TABLE `CoachFiles`
  ADD CONSTRAINT `CoachFiles_ibfk_1` FOREIGN KEY (`coachid`) REFERENCES `Coaches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CoachFiles_ibfk_2` FOREIGN KEY (`FileId`) REFERENCES `Files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `CoachProgram`
--
ALTER TABLE `CoachProgram`
  ADD CONSTRAINT `CoachProgram_ibfk_1` FOREIGN KEY (`coachid`) REFERENCES `Coaches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CoachProgram_ibfk_2` FOREIGN KEY (`ProgramId`) REFERENCES `Programs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `CoachPrograms`
--
ALTER TABLE `CoachPrograms`
  ADD CONSTRAINT `CoachPrograms_ibfk_1` FOREIGN KEY (`programid`) REFERENCES `Programs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `CoachPrograms_ibfk_2` FOREIGN KEY (`CoachId`) REFERENCES `Coaches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `ProgramFiles`
--
ALTER TABLE `ProgramFiles`
  ADD CONSTRAINT `ProgramFiles_ibfk_1` FOREIGN KEY (`programid`) REFERENCES `Programs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ProgramFiles_ibfk_2` FOREIGN KEY (`FileId`) REFERENCES `Files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `StudentFiles`
--
ALTER TABLE `StudentFiles`
  ADD CONSTRAINT `StudentFiles_ibfk_1` FOREIGN KEY (`studentid`) REFERENCES `Students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `StudentFiles_ibfk_2` FOREIGN KEY (`FileId`) REFERENCES `Files` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
