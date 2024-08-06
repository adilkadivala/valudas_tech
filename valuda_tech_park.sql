-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2024 at 01:13 PM
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
-- Database: `valuda_tech_park`
--

-- --------------------------------------------------------

--
-- Table structure for table `industries`
--

CREATE TABLE `industries` (
  `id` int(40) NOT NULL,
  `industry_name` tinytext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `industries`
--

INSERT INTO `industries` (`id`, `industry_name`) VALUES
(34, 'Bank menegment'),
(36, 'Hotel Menegment'),
(37, 'It Service'),
(38, 'Auto Mobiles');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(15) NOT NULL,
  `portfolio_photo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `portfolio_photo`) VALUES
(72, '1718983050544_image 79.png'),
(73, '1718983072415_real.png');

-- --------------------------------------------------------

--
-- Table structure for table `portfolio`
--

CREATE TABLE `portfolio` (
  `id` int(20) NOT NULL,
  `thumbnail` varchar(50) NOT NULL,
  `title` tinytext NOT NULL,
  `short_description` mediumtext NOT NULL,
  `company_name` tinytext NOT NULL,
  `portfolio_photos` int(40) NOT NULL,
  `service_id` int(20) NOT NULL,
  `industry_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portfolio`
--

INSERT INTO `portfolio` (`id`, `thumbnail`, `title`, `short_description`, `company_name`, `portfolio_photos`, `service_id`, `industry_id`) VALUES
(217, '1719019888380_real.png', 'Open cart', 'Open cart Project', 'New Tach', 73, 165, 34),
(218, '1719020126863_image 79.png', 'HTML', 'html web page', 'Valudas Tech Park', 73, 164, 37),
(219, '1719020816194_port5.png', 'Css Customization', 'Css Designe', 'Valudas tech', 72, 164, 36),
(220, '1719020940985_port2.png', 'css', 'Crud Application', 'New Info Tech', 72, 167, 34),
(221, '1719021144429_portfolio1.png', 'Java Script', 'Java Script', 'Company Name ', 73, 164, 36);

-- --------------------------------------------------------

--
-- Table structure for table `port_serv_tech`
--

CREATE TABLE `port_serv_tech` (
  `id` int(20) NOT NULL,
  `portfolio_id` int(50) NOT NULL,
  `service_id` int(40) NOT NULL,
  `technology_id` int(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `port_serv_tech`
--

INSERT INTO `port_serv_tech` (`id`, `portfolio_id`, `service_id`, `technology_id`) VALUES
(85, 217, 165, 126),
(86, 218, 164, 114),
(87, 219, 164, 118),
(88, 220, 167, 118),
(89, 221, 164, 115);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(20) NOT NULL,
  `service_name` tinytext NOT NULL,
  `service_tagline` varchar(100) NOT NULL,
  `service_description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `service_name`, `service_tagline`, `service_description`) VALUES
(164, 'MERN STACK', 'web development', 'We are Provide You <em><strong>Mern stack</strong></em> development <em>service</em>'),
(165, 'Cms development', 'Cms warehouse', 'Here You Will get What ever You want'),
(166, 'Android development', 'Android development', 'Create <strong>Your App</strong> And Make <em>People Proude</em>'),
(167, 'custom Web Development', 'custome development', 'Customize your Web Application');

-- --------------------------------------------------------

--
-- Table structure for table `service_technology`
--

CREATE TABLE `service_technology` (
  `services_id` int(11) NOT NULL,
  `technology_id` int(11) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service_technology`
--

INSERT INTO `service_technology` (`services_id`, `technology_id`, `id`) VALUES
(164, 114, 314),
(164, 115, 315),
(164, 117, 316),
(164, 118, 317),
(164, 122, 318),
(164, 123, 319),
(164, 124, 320),
(164, 125, 321),
(165, 120, 327),
(165, 126, 328),
(165, 127, 329),
(166, 119, 330),
(166, 121, 331),
(167, 114, 332),
(167, 115, 333),
(167, 117, 334),
(167, 118, 335),
(167, 119, 336),
(167, 120, 337),
(167, 121, 338),
(167, 122, 339),
(167, 123, 340),
(167, 124, 341),
(167, 125, 342),
(167, 126, 343),
(167, 127, 344);

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(40) NOT NULL,
  `image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `image`) VALUES
(41, '1718982915636_awc.png'),
(42, '1718982924403_forolly 1.png'),
(43, '1718982930544_microface.png'),
(44, '1718982936555_mumezshop.png'),
(45, '1718982942089_nandolia.png'),
(46, '1718982956181_forolly 1.png'),
(48, '1719306726355_mumezshop.png');

-- --------------------------------------------------------

--
-- Table structure for table `technologies`
--

CREATE TABLE `technologies` (
  `id` int(20) NOT NULL,
  `technology_name` tinytext NOT NULL,
  `tech_photo` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `technologies`
--

INSERT INTO `technologies` (`id`, `technology_name`, `tech_photo`) VALUES
(114, 'Html', '1718983512028_html.png'),
(115, 'JavaScript', '1718983534387_javascript.png'),
(117, 'Bootstrape', '1719018181502_bootstrape.png'),
(118, 'Css', '1719018195132_css.png'),
(119, 'Flutter', '1719018214697_fluuter.png'),
(120, 'Hubspot', '1719018234594_hubspot.png'),
(121, 'Netive', '1719018256693_native.png'),
(122, 'Node', '1719018271817_node.png'),
(123, 'React', '1719018304831_react.png'),
(124, 'MySql', '1719018316033_sql.png'),
(125, 'Tailwind', '1719018333659_tailwind.png'),
(126, 'Open cart', '1719018607845_opencart.png'),
(127, 'Wordpress', '1719018623176_wordpress.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `name` tinytext NOT NULL,
  `email` tinytext NOT NULL,
  `mobile_no` bigint(15) NOT NULL,
  `skype_id` varchar(100) NOT NULL,
  `budget` int(40) NOT NULL,
  `prefer` varchar(100) NOT NULL,
  `message` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobile_no`, `skype_id`, `budget`, `prefer`, `message`) VALUES
(20, 'Adil Kadival', 'adilkadivala560@gmail.com', 9408018560, 'aSas@JDJKDS233', 2500, 'just testing', 'it is just for testing purpose');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `industries`
--
ALTER TABLE `industries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `industry_id` (`industry_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `portfolio_photos` (`portfolio_photos`);

--
-- Indexes for table `port_serv_tech`
--
ALTER TABLE `port_serv_tech`
  ADD PRIMARY KEY (`id`),
  ADD KEY `portfolio_id` (`portfolio_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `technology_id` (`technology_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_technology`
--
ALTER TABLE `service_technology`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_id` (`services_id`),
  ADD KEY `technology_id` (`technology_id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `technologies`
--
ALTER TABLE `technologies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `industries`
--
ALTER TABLE `industries`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(15) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `portfolio`
--
ALTER TABLE `portfolio`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `port_serv_tech`
--
ALTER TABLE `port_serv_tech`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=168;

--
-- AUTO_INCREMENT for table `service_technology`
--
ALTER TABLE `service_technology`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=345;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `technologies`
--
ALTER TABLE `technologies`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `portfolio`
--
ALTER TABLE `portfolio`
  ADD CONSTRAINT `portfolio_ibfk_1` FOREIGN KEY (`industry_id`) REFERENCES `industries` (`id`),
  ADD CONSTRAINT `portfolio_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `portfolio_ibfk_3` FOREIGN KEY (`portfolio_photos`) REFERENCES `photos` (`id`);

--
-- Constraints for table `port_serv_tech`
--
ALTER TABLE `port_serv_tech`
  ADD CONSTRAINT `port_serv_tech_ibfk_1` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolio` (`id`),
  ADD CONSTRAINT `port_serv_tech_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `port_serv_tech_ibfk_3` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`);

--
-- Constraints for table `service_technology`
--
ALTER TABLE `service_technology`
  ADD CONSTRAINT `service_technology_ibfk_1` FOREIGN KEY (`services_id`) REFERENCES `services` (`id`),
  ADD CONSTRAINT `service_technology_ibfk_2` FOREIGN KEY (`technology_id`) REFERENCES `technologies` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
