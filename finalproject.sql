-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3308
-- Generation Time: Aug 21, 2019 at 05:52 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finalproject`
--

-- --------------------------------------------------------

--
-- Table structure for table `activitytype`
--

CREATE TABLE `activitytype` (
  `ActivityTypeID` int(11) NOT NULL,
  `Description` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hp8;

--
-- Dumping data for table `activitytype`
--

INSERT INTO `activitytype` (`ActivityTypeID`, `Description`) VALUES
(1, 'Homework'),
(2, 'Housework'),
(3, 'Meal'),
(4, 'Rest');

-- --------------------------------------------------------

--
-- Table structure for table `adminrights`
--

CREATE TABLE `adminrights` (
  `useremail` varchar(100) NOT NULL,
  `userpassword` varchar(100) NOT NULL,
  `AdminID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hp8;

--
-- Dumping data for table `adminrights`
--

INSERT INTO `adminrights` (`useremail`, `userpassword`, `AdminID`) VALUES
('pessie97@gmail.com', '1234', 1);

-- --------------------------------------------------------

--
-- Table structure for table `userinfo`
--

CREATE TABLE `userinfo` (
  `UserID` int(11) NOT NULL,
  `UserFName` varchar(45) NOT NULL,
  `UserLName` varchar(45) NOT NULL,
  `UserName` varchar(45) NOT NULL,
  `UserEmail` varchar(45) NOT NULL,
  `UserPassword` varchar(16) NOT NULL,
  `UserPhoneNumber` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hp8;

--
-- Dumping data for table `userinfo`
--

INSERT INTO `userinfo` (`UserID`, `UserFName`, `UserLName`, `UserName`, `UserEmail`, `UserPassword`, `UserPhoneNumber`) VALUES
(1, 'Pessie', 'Schuster', 'pessie', 'pessie97@gmail.com', '1234', '6462568562'),
(2, 'esther', 'us', 'pe', 'chaya.p.schuster@gmail.com', '0879', '0879'),
(17, 'mo', 's', 'mordyys@gmail.com', 'mordyys@gmail.com', '9999', '7738655483'),
(20, 'Chaya', 'Schuster', 'schusterchaya@gmail.com', 'schusterchaya@gmail.com', '4646', '1234328798'),
(21, 'Chaya', 'Schuster', 'scscsc@gmail.com', 'scscsc@gmail.com', '0000', '1234567887'),
(22, 'Shoshana', 'Rosenbaum', 'uyuy@gmail.com', 'uyuy@gmail.com', '5454', '3476978372');

-- --------------------------------------------------------

--
-- Table structure for table `userschedule`
--

CREATE TABLE `userschedule` (
  `ScheduleID` int(11) NOT NULL,
  `ActivityID` int(11) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `ActivityName` varchar(45) NOT NULL,
  `Date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `AMPM` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=hp8;

--
-- Dumping data for table `userschedule`
--

INSERT INTO `userschedule` (`ScheduleID`, `ActivityID`, `userName`, `ActivityName`, `Date`, `startTime`, `endTime`, `AMPM`) VALUES
(1, 1, '1', 'sql', '2019-08-20', '02:00:00', '04:00:00', 1),
(2, 1, 'pessie97@gmail.com', 'sql', '2019-08-21', '17:30:00', '19:30:00', 2),
(3, 1, 'pessie97@gmail.com', 'sql', '2019-08-21', '17:30:00', '19:30:00', 2),
(4, 1, 'pessie97@gmail.com', 'Laundry', '2019-08-21', '01:00:00', '02:00:00', 1),
(5, 1, 'pessie97@gmail.com', 'Laundry', '2019-08-14', '01:00:00', '02:00:00', 1),
(6, 1, 'pessie97@gmail.com', 'Laundry', '2019-08-14', '01:00:00', '02:00:00', 1),
(7, 1, 'pessie97@gmail.com', 'node', '2019-08-21', '19:30:00', '21:30:00', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activitytype`
--
ALTER TABLE `activitytype`
  ADD PRIMARY KEY (`ActivityTypeID`);

--
-- Indexes for table `adminrights`
--
ALTER TABLE `adminrights`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `userinfo`
--
ALTER TABLE `userinfo`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `UserName` (`UserName`),
  ADD UNIQUE KEY `UserEmail` (`UserEmail`),
  ADD UNIQUE KEY `UserPhoneNumber` (`UserPhoneNumber`);

--
-- Indexes for table `userschedule`
--
ALTER TABLE `userschedule`
  ADD PRIMARY KEY (`ScheduleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activitytype`
--
ALTER TABLE `activitytype`
  MODIFY `ActivityTypeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `adminrights`
--
ALTER TABLE `adminrights`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userinfo`
--
ALTER TABLE `userinfo`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `userschedule`
--
ALTER TABLE `userschedule`
  MODIFY `ScheduleID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
