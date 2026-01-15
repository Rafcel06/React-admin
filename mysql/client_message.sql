-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2026 at 02:15 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `reactadmin`
--

-- --------------------------------------------------------

--
-- Table structure for table `client_message`
--

CREATE TABLE `client_message` (
  `id` int(11) NOT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `dt_message` datetime DEFAULT NULL,
  `images` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `receiver_id` int(11) DEFAULT NULL,
  `isAdmin` int(11) DEFAULT NULL,
  `room` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_message`
--

INSERT INTO `client_message` (`id`, `profile`, `name`, `message`, `dt_message`, `images`, `user_id`, `receiver_id`, `isAdmin`, `room`) VALUES
(1, 'http://localhost:4000/1768388614400%20--%20Super.png', NULL, 'HI', '2026-01-15 12:51:13', NULL, 58, 126, 1, 'e42523a8-154e-4039-9604-354746bef60e'),
(2, 'http://localhost:4000/1768480500951 -- safari.png', NULL, 'OW HI', '2026-01-15 12:51:16', NULL, 126, NULL, 0, 'e42523a8-154e-4039-9604-354746bef60e');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `client_message`
--
ALTER TABLE `client_message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_index` (`room`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `client_message`
--
ALTER TABLE `client_message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `client_message`
--
ALTER TABLE `client_message`
  ADD CONSTRAINT `client_message_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
