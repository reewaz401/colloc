-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : database
-- Généré le : ven. 13 jan. 2023 à 13:53
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
  `payed` tinyint(1) NOT NULL DEFAULT 0,
  `uniqId` varchar(255) NOT NULL
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
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `flat_share`
--

INSERT INTO `flat_share` (`id`, `address`, `name`, `start_date`, `end_date`, `image`) VALUES
(1, '6 rue justin', 'justin', '2023-01-01', '2023-02-01', NULL),
(2, '6 rue justin', 'justin', '2023-01-01', '2023-02-01', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `monthly_fee`
--

CREATE TABLE `monthly_fee` (
  `id` int(11) NOT NULL,
  `flat_share_id` int(11) NOT NULL,
  `fee_amount` int(255) NOT NULL,
  `fee_name` varchar(255) NOT NULL,
  `date` int(11) NOT NULL
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
  `rent_pro_rata` int(255) DEFAULT NULL,
  `entry_date` date NOT NULL DEFAULT current_timestamp(),
  `exit_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `roommate`
--

CREATE TABLE `roommate` (
  `id` int(11) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `birthdate` date DEFAULT NULL,
  `joindate` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `expenditure`
--
ALTER TABLE `expenditure`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_flat_share_id_expenditure` (`flat_share_id`),
  ADD KEY `fk_roommate_id_expenditure` (`roommate_id`);

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
  ADD KEY `fk_flat_share_id_month` (`flat_share_id`);

--
-- Index pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_flat_share_id` (`flat_share_id`),
  ADD KEY `fk_roommate_id` (`roommate_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  ADD CONSTRAINT `fk_flat_share_id_expenditure` FOREIGN KEY (`flat_share_id`) REFERENCES `flat_share` (`id`),
  ADD CONSTRAINT `fk_roommate_id_expenditure` FOREIGN KEY (`roommate_id`) REFERENCES `roommate` (`id`);

--
-- Contraintes pour la table `monthly_fee`
--
ALTER TABLE `monthly_fee`
  ADD CONSTRAINT `fk_flat_share_id_month` FOREIGN KEY (`flat_share_id`) REFERENCES `flat_share` (`id`);

--
-- Contraintes pour la table `roomate_has_flat_share`
--
ALTER TABLE `roomate_has_flat_share`
  ADD CONSTRAINT `fk_flat_share_id` FOREIGN KEY (`flat_share_id`) REFERENCES `flat_share` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_roommate_id` FOREIGN KEY (`roommate_id`) REFERENCES `roommate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
