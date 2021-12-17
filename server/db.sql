SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `dh8c2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `dh8c2`;

CREATE TABLE `students` (
  `studentCode` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO `students` (`studentCode`, `fullName`, `email`, `phoneNumber`) VALUES
('1811060253', 'Nguyễn Văn Cường', '1811060253@hunre.edu.vn', '0330953280'),
('1811060255', 'Hoàng Hữu Đạt', '1811060255@hunre.edu.vn', '0334714876'),
('1811060256', 'Nguyễn Hoàng Long', '1811060256@hunre.edu.vn', '0985189675'),
('1811060265', 'Đỗ Trường An', '1811060265@hunre.edu.vn', '0959568039'),
('1811060307', 'Phạm Hải Nam', '1811060307@hunre.edu.vn', '0987573393'),
('1811060314', 'Nguyễn Văn Khánh', '1811060314@hunre.edu.vn', '0338940203'),
('1811060315', 'Phạm Trung Đức', '1811060315@hunre.edu.vn', '0946848220'),
('1811060319', 'Nguyễn Hồng Quân', '1811060319@hunre.edu.vn', '0330912152'),
('1811060322', 'Phan Khắc Hoàng Dương', '1811060322@hunre.edu.vn', '0920526664'),
('1811060328', 'Nguyễn Duy Tú', '1811060328@hunre.edu.vn', '0338283417'),
('1811060336', 'Phạm Quốc Việt', '1811060336@hunre.edu.vn', '0333684738'),
('1811060337', 'Ngô Đình Lộc', '1811060337@hunre.edu.vn', '0338101989'),
('1811060340', 'Lê Tuấn Anh', '1811060340@hunre.edu.vn', '0989468630'),
('1811060351', 'Trần Văn Trường', '1811060351@hunre.edu.vn', '0984819146'),
('1811060354', 'Tạ Nguyễn Chí Thanh', '1811060354@hunre.edu.vn', '0973817098'),
('1811060355', 'Nguyễn Tiến Huy', '1811060355@hunre.edu.vn', '0333361800'),
('1811060358', 'Nguyễn Xuân Trường', '1811060358@hunre.edu.vn', '0334227111'),
('1811060364', 'Bùi Tất Dương', '1811060364@hunre.edu.vn', '0940000663'),
('1811060365', 'Nguyễn Văn Mạnh', '1811060365@hunre.edu.vn', '0960094218'),
('1811060367', 'Bùi Hải Linh', '1811060367@hunre.edu.vn', '0334740038'),
('1811060377', 'Phạm Hoàng Nam', '1811060377@hunre.edu.vn', '0335667572'),
('1811060379', 'Ngô Đăng Tuyên', '1811060379@hunre.edu.vn', '0998703716'),
('1811060384', 'Nguyễn Vinh Trường', '1811060384@hunre.edu.vn', '0338012817'),
('1811060385', 'Nguyễn Hoàng Anh', '1811060385@hunre.edu.vn', '0338257259'),
('1811060394', 'Vũ Đình Hoàng', '1811060394@hunre.edu.vn', '0338766010'),
('1811060435', 'Lê Nguyễn Ninh', '1811060435@hunre.edu.vn', '0338159549'),
('1811060441', 'Lê Hoàng Hiệp', '1811060441@hunre.edu.vn', '0338775912'),
('1811060459', 'Vũ Lê Bình', '1811060459@hunre.edu.vn', '0332330547'),
('1811060467', 'Đỗ Tấn Phú', '1811060467@hunre.edu.vn', '0949088364'),
('1811060473', 'Nguyễn Tiến Toàn', '1811060473@hunre.edu.vn', '0923697624'),
('1811061139', 'Đỗ Văn Đạt', '1811061139@hunre.edu.vn', '0999606640'),
('1811061253', 'Nguyễn Kim Đạt', '1811061253@hunre.edu.vn', '0339323306'),
('1811061298', 'Nguyễn Hữu Quốc Anh', '1811061298@hunre.edu.vn', '0959310454'),
('1811061321', 'Chu Đại Long', '1811061321@hunre.edu.vn', '0330283522'),
('1811061330', 'Mai Thế Dũng', '1811061330@hunre.edu.vn', '0928901162'),
('1811061340', 'Tô Văn Diệu', '1811061340@hunre.edu.vn', '0338262364'),
('1811061344', 'Nguyễn Dương Huy', '1811061344@hunre.edu.vn', '0998184312'),
('1811061346', 'Trần Đình Khánh', '1811061346@hunre.edu.vn', '0946877184'),
('1811061359', 'Đỗ Hoàng Dương', '1811061359@hunre.edu.vn', '0334555676'),
('1811061372', 'Trương Công Anh', '1811061372@hunre.edu.vn', '0335083152'),
('1811061430', 'Phạm Hữu Đạt', '1811061430@hunre.edu.vn', '0934543119'),
('1811061441', 'Nguyễn Đức Anh', '1811061441@hunre.edu.vn', '0335425148'),
('1811061784', 'Đỗ Văn Tiến Anh', '1811061784@hunre.edu.vn', '0998669458'),
('1811061808', 'Đặng Minh Hải', '1811061808@hunre.edu.vn', '0330740200');

ALTER TABLE `students`
  ADD PRIMARY KEY (`studentCode`);
COMMIT;