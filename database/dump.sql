-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : database
-- Généré le : mar. 10 jan. 2023 à 09:33
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
-- Structure de la table `expenditure`
--

CREATE TABLE `expenditure` (
  `id` int(11) NOT NULL,
  `roommate_id` int(11) NOT NULL,
  `flat_share_id` int(11) NOT NULL,
  `expenditure_name` varchar(255) NOT NULL,
  `amount` int(11) NOT NULL,
  `creation_date` date NOT NULL DEFAULT current_timestamp(),
  `payed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `flat_share`
--

CREATE TABLE `flat_share` (
  `id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `monthly_fee`
--

CREATE TABLE `monthly_fee` (
  `id` int(11) NOT NULL,
  `flat_share_id` int(11) NOT NULL,
  `fee_amount` int(255) NOT NULL,
  `fee_name` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roomate_has_flat_share`
--

CREATE TABLE `roomate_has_flat_share` (
  `id` int(11) NOT NULL,
  `roommate_id` int(11) NOT NULL,
  `flat_share_id` int(11) NOT NULL,
  `role` tinyint(1) DEFAULT 0,
  `rent_pro_rata` int(255) NOT NULL,
  `entry_date` date NOT NULL DEFAULT current_timestamp(),
  `exit_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roommate`
--

CREATE TABLE `roommate` (
  `id` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `identifiant` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `date_naissance` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `expenditure`
--
ALTER TABLE `expenditure`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flat_share_id` (`flat_share_id`),
  ADD KEY `roommate_id` (`roommate_id`);

--
-- Index pour la table `flat_share`
--
ALTER TABLE `flat_share`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `monthly_fee`
--
ALTER TABLE `monthly_fee`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flat_share_id` (`flat_share_id`);

--
-- Index pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  ADD PRIMARY KEY (`id`),
  ADD KEY `roommate_id` (`roommate_id`),
  ADD KEY `flat_share_id` (`flat_share_id`);

--
-- Index pour la table `roommate`
--
ALTER TABLE `roommate`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `expenditure`
--
ALTER TABLE `expenditure`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `flat_share`
--
ALTER TABLE `flat_share`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `monthly_fee`
--
ALTER TABLE `monthly_fee`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `roommate`
--
ALTER TABLE `roommate`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `expenditure`
--
ALTER TABLE `expenditure`
  ADD CONSTRAINT `expenditure_ibfk_1` FOREIGN KEY (`flat_share_id`) REFERENCES `flat_share` (`id`),
  ADD CONSTRAINT `expenditure_ibfk_2` FOREIGN KEY (`roommate_id`) REFERENCES `roommate` (`id`);

--
-- Contraintes pour la table `monthly_fee`
--
ALTER TABLE `monthly_fee`
  ADD CONSTRAINT `monthly_fee_ibfk_1` FOREIGN KEY (`flat_share_id`) REFERENCES `flat_share` (`id`);

--
-- Contraintes pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  ADD CONSTRAINT `roomate_has_flat_share_ibfk_1` FOREIGN KEY (`roommate_id`) REFERENCES `roommate` (`id`),
  ADD CONSTRAINT `roomate_has_flat_share_ibfk_2` FOREIGN KEY (`flat_share_id`) REFERENCES `flat_share` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
