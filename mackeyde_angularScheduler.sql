-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 09, 2014 at 12:49 PM
-- Server version: 5.5.40-cll
-- PHP Version: 5.4.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mackeyde_angularScheduler`
--

-- --------------------------------------------------------

--
-- Table structure for table `courts`
--

CREATE TABLE IF NOT EXISTS `courts` (
`court_id` int(11) NOT NULL,
  `court_name` varchar(255) NOT NULL,
  `court_status` enum('0','1') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `courts`
--

INSERT INTO `courts` (`court_id`, `court_name`, `court_status`) VALUES
(1, 'Indoor 1', '1'),
(2, 'Indoor 2', '1'),
(3, 'Indoor 3', '1'),
(4, 'Indoor 4', '1'),
(5, 'Indoor 5', '1'),
(6, 'Indoor 6', '1'),
(7, 'Outdoor 1', '1'),
(8, 'Outdoor 2', '1'),
(9, 'Outdoor 3', '1'),
(10, 'Outdoor 4', '1'),
(11, 'Outdoor 5', '1'),
(12, 'Outdoor 6', '1'),
(13, 'Outdoor 7', '1'),
(14, 'Outdoor 8', '1'),
(15, 'Outdoor 9', '1'),
(16, 'Outdoor 10', '1'),
(17, 'Outdoor 11', '1'),
(18, 'Outdoor 12', '1');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE IF NOT EXISTS `events` (
`event_id` int(11) NOT NULL,
  `event_sort_name` varchar(255) NOT NULL COMMENT 'Full name without spaces/all lowercase',
  `event_name` varchar(255) NOT NULL,
  `event_start_time` time NOT NULL,
  `event_end_time` time NOT NULL,
  `event_start_date` date NOT NULL,
  `event_end_date` date NOT NULL,
  `event_all_day` enum('1','0') NOT NULL DEFAULT '0',
  `event_recurring` enum('1','0') NOT NULL DEFAULT '0',
  `event_created` datetime NOT NULL COMMENT 'GMT',
  `event_modified` datetime DEFAULT NULL,
  `event_created_by` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_sort_name`, `event_name`, `event_start_time`, `event_end_time`, `event_start_date`, `event_end_date`, `event_all_day`, `event_recurring`, `event_created`, `event_modified`, `event_created_by`) VALUES
(1, 'colins_event', 'Colin''s Event', '12:00:00', '13:00:00', '2014-11-18', '2014-11-18', '0', '0', '2014-11-17 00:00:00', NULL, 1),
(3, 'colins_big_event', 'Colin''s Big Event!', '21:24:00', '21:24:00', '2014-12-24', '2014-12-24', '', '', '2014-12-04 02:27:29', NULL, 1),
(4, 'colins_test_event', 'Colin''s Test Event!', '21:24:00', '21:24:00', '2014-12-26', '2014-12-26', '', '', '2014-12-04 02:28:27', NULL, 1),
(5, 'boxing_day_party', 'Boxing Day Party', '21:24:00', '21:24:00', '2014-12-26', '2014-12-26', '', '', '2014-12-04 02:34:03', NULL, 1),
(6, 'time_test', 'Time Test', '23:37:00', '00:39:00', '2014-12-03', '2014-12-03', '', '', '2014-12-04 02:34:31', NULL, 1),
(7, 'meow', 'Meow', '00:06:00', '00:07:00', '2014-12-04', '2014-12-04', '', '', '2014-12-04 05:07:14', NULL, 1),
(8, 'test_event', 'test event', '11:00:00', '13:00:00', '2014-12-25', '2014-12-26', '', '', '2014-12-08 20:05:14', NULL, 4),
(9, 'test_event', 'test event', '11:00:00', '13:00:00', '2014-12-25', '2014-12-26', '', '', '2014-12-08 20:05:16', NULL, 4),
(10, 'test_event', 'test event', '11:00:00', '13:00:00', '2014-12-25', '2014-12-26', '', '', '2014-12-08 20:05:17', NULL, 4),
(11, 'test_event', 'test event', '11:00:00', '13:00:00', '2014-12-25', '2014-12-26', '', '', '2014-12-08 20:05:17', NULL, 4),
(12, 'test_event', 'test event', '11:00:00', '13:00:00', '2014-12-25', '2014-12-26', '', '', '2014-12-08 20:05:17', NULL, 4),
(13, 'test_event', 'test event', '11:00:00', '13:00:00', '2014-12-25', '2014-12-26', '', '', '2014-12-08 20:05:42', NULL, 4),
(14, 'test_conflict', 'test conflict', '11:00:00', '13:00:00', '2014-12-25', '2014-12-26', '', '', '2014-12-08 20:08:02', NULL, 4),
(15, 'test_past', 'test past', '23:00:00', '13:00:00', '2014-12-25', '2014-12-22', '', '', '2014-12-08 20:11:45', NULL, 4);

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE IF NOT EXISTS `reservations` (
`res_id` int(11) NOT NULL,
  `res_sort_name` varchar(255) NOT NULL,
  `res_name` varchar(255) NOT NULL,
  `res_date` date NOT NULL,
  `res_start_time` time NOT NULL,
  `res_end_time` time NOT NULL,
  `res_phone` varchar(12) NOT NULL,
  `res_email` varchar(50) NOT NULL,
  `res_num_players` int(11) NOT NULL,
  `res_court` varchar(11) NOT NULL,
  `res_player_type` varchar(15) NOT NULL,
  `res_created_by` int(11) NOT NULL,
  `res_created` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`res_id`, `res_sort_name`, `res_name`, `res_date`, `res_start_time`, `res_end_time`, `res_phone`, `res_email`, `res_num_players`, `res_court`, `res_player_type`, `res_created_by`, `res_created`) VALUES
(1, 'colins_first_reservation', 'Colin''s First Reservation!', '2014-12-05', '12:00:00', '13:00:00', '8045162451', 'colin@fishbrains.com', 2, 'outdoor_1', 'student', 1, '2014-12-04 02:45:23'),
(2, 'ss', 'ss', '2014-12-08', '15:20:00', '15:20:00', '1111111111', '', 5, 'outdoor_9', 'lesson', 4, '2014-12-08 20:21:12'),
(3, 'test_create', 'test create', '2014-12-25', '11:00:00', '13:00:00', '1234567890', 'test@gmail.com', 5, 'indoor_1', 'varsity', 4, '2014-12-08 20:35:44');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`user_id` int(11) NOT NULL,
  `user_username` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_role` enum('all','admin','intern','guest') NOT NULL DEFAULT 'guest',
  `user_first_name` varchar(255) NOT NULL,
  `user_last_name` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_username`, `user_password`, `user_email`, `user_role`, `user_first_name`, `user_last_name`) VALUES
(1, 'cmackey', '*E844A402CC6A7DD19083889CCD274FF4D62E0945', 'colin@fishbrains.com', 'admin', 'Colin', 'Mackey'),
(2, 'epaige', '*D243CB4145601DBB6CA73FD8F0345A991CE6C11A', 'evanjpaige@gmail.com', 'admin', 'Evan', 'Paige'),
(4, 'svaughn', '*212A15C595B02A67C237AE33B7566F3AE6A434E6', 'svaughn@mail.umw.edu', 'admin', 'Scott', 'Vaughn'),
(5, 'jpolack', '*6BB4837EB74329105EE4568DDA7DC67ED2CA2AD9', NULL, 'admin', 'Jennifer', 'Polack'),
(6, 'jpolackintern', '*2A032F7C5BA932872F0F045E0CF6B53CF702F2C5', NULL, 'intern', 'Intern', 'Polack');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courts`
--
ALTER TABLE `courts`
 ADD PRIMARY KEY (`court_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
 ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
 ADD PRIMARY KEY (`res_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courts`
--
ALTER TABLE `courts`
MODIFY `court_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
MODIFY `res_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
