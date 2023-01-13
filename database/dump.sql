-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : database
-- Généré le : ven. 13 jan. 2023 à 08:39
-- Version du serveur : 10.8.6-MariaDB-1:10.8.6+maria~ubu2204
-- Version de PHP : 8.0.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `data`
--

-- --------------------------------------------------------

--
-- Structure de la table `roomate_has_flat_share`
--

CREATE TABLE `roomate_has_flat_share` (
  `id` int(11) NOT NULL,
  `roommate_id` int(11) NOT NULL,
  `flat_share_id` int(11) NOT NULL,
  `role` tinyint(1) DEFAULT 0,
  `rent_pro_rata` int(255) DEFAULT NULL,
  `entry_date` date NOT NULL DEFAULT current_timestamp(),
  `exit_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roommate_id` (`roommate_id`),
  ADD KEY `flat_share_id` (`flat_share_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  ADD CONSTRAINT `roomate_has_flat_share_ibfk_1` FOREIGN KEY (`roommate_id`) REFERENCES `roommate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `roomate_has_flat_share_ibfk_2` FOREIGN KEY (`flat_share_id`) REFERENCES `flat_share` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
