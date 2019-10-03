-- phpMyAdmin SQL Dump
-- version 4.3.11
-- http://www.phpmyadmin.net
--
-- Vært: 127.0.0.1
-- Genereringstid: 27. 09 2019 kl. 15:20:36
-- Serverversion: 5.6.24
-- PHP-version: 5.6.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `boligstjernen`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `articles`
--

CREATE TABLE IF NOT EXISTS `articles` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `created_at` date NOT NULL,
  `fk_user` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `articles`
--

INSERT INTO `articles` (`id`, `name`, `content`, `created_at`, `fk_user`) VALUES
(11, 'EJENDOMSHANDEL MERE TRYG OG SIKKER', 'Ejendomsmæglerne får øget oplysningspligt. Og et disciplinærnævn skal sikre skrappere sanktioner, hvis en mægler overtræder reglerne.  Økonomi- og erhvervsminister Bendt Bendtsen (K) fik torsdag vedtaget sin skarpere linje over for ejendomsmæglere i Folketinget.  - Jeg er meget tilfreds med, at der var bred opbakning i Folketinget til mit lovforslag til stramninger af reglerne for omsætning af fast ejendom. Det bliver nu endnu mere trygt og sikkert for forbrugerne at handle bolig i Danmark, siger økonomi- og erhvervsminister Bendt Bendtsen.', '2019-09-22', 3),
(12, 'VI SKAL INFORMERE BEDRE', 'Dansk Ejendomsmæglerforening vil se nærmere på, om danske ejendomsmæglere kan blive bedre til at informere køberne ved bolighandler.   Når vi mødes efter sommerferien vil vi kigge på, om vores forbrugeretiske regler bør udbygges med nogle punkter om det her, siger næstformand Arne Madsen fra Dansk Ejendomsmæglerforening.   Generelt vil vi indskærpe, at man skal informere ordentligt. Køberne skal altid være velinformerede om deres situation, tilføjer Arne Madsen.', '2019-09-23', 3),
(13, 'LÆNGERE MELLEM BUDRUNDER PÅ BOLIGMARKEDET', 'Boligkøberne står ikke længere på nakken af hinanden, og det har siden sidste sommer betydet en halvering af boliger, der bliver sat til salg i licitation.  Boligejernes Videncenter Bolius har taget temperaturen på licitationsalget hos de tre største ejendomsmæglerkæder, Home, EDC og Danbolig. Alle tre melder om en halvering fra 10-12 procent sidste sommer til under 4-5 procent i dag.  ', '2019-09-24', 3);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(20) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`) VALUES
(11, 'Landejendom', 'Landejendomme'),
(12, 'Rækkehus', 'Rækkehuse'),
(13, 'Lejlighed', 'Lejligheder'),
(14, 'Villa', 'Villaer');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `contact`
--

CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(60) NOT NULL,
  `adress` varchar(255) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `email` varchar(55) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `contact`
--

INSERT INTO `contact` (`id`, `name`, `adress`, `phone`, `email`, `message`) VALUES
(36, 'Jannie Almegaard', 'Holbækvej 40B', '60564039', 'gym4you4450@gmail.com', 'heeeeeeeeeeeeeeyyyyyyyyyyyyyyyyyyyyyyyyy');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `globals`
--

CREATE TABLE IF NOT EXISTS `globals` (
  `id` int(11) NOT NULL,
  `sitename` varchar(30) NOT NULL,
  `sitedescription` text NOT NULL,
  `company_name` varchar(60) NOT NULL,
  `street` varchar(60) NOT NULL,
  `street_number` varchar(20) NOT NULL,
  `postal_code` int(11) NOT NULL,
  `city` varchar(35) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `telefax` varchar(20) NOT NULL,
  `email` varchar(80) NOT NULL,
  `img_home` varchar(80) DEFAULT 'forside.jpg'
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `globals`
--

INSERT INTO `globals` (`id`, `sitename`, `sitedescription`, `company_name`, `street`, `street_number`, `postal_code`, `city`, `phone`, `telefax`, `email`, `img_home`) VALUES
(1, 'Boligstjernen', 'Find en ny bolig', 'Boligstjernen A/S', 'Park Allé', '335', 2100, 'København Ø', '67912811', '67912811', 'info@boligstjernen.dk', '1569307560403_forside.jpg');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `images`
--

CREATE TABLE IF NOT EXISTS `images` (
  `id` int(11) NOT NULL,
  `name` varchar(70) NOT NULL,
  `fk_residential` int(11) NOT NULL,
  `standard_img` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `images`
--

INSERT INTO `images` (`id`, `name`, `fk_residential`, `standard_img`) VALUES
(1, '1569315589088_1b.jpg', 25, 1),
(2, '1569315589083_1a.jpg', 25, 0),
(3, '1569315589102_1d.jpg', 25, 0),
(4, '1569315589096_1c.jpg', 25, 0),
(5, '1569401062242_2c.jpg', 26, 0),
(6, '1569401062225_2a.jpg', 26, 1),
(7, '1569401062249_2d.jpg', 26, 0),
(8, '1569401062234_2b.jpg', 26, 0),
(9, '1569401366736_3b.jpg', 27, 0),
(10, '1569401366730_3a.jpg', 27, 1),
(11, '1569401366742_3c.jpg', 27, 0),
(12, '1569401366748_3d.jpg', 27, 0),
(13, '1569401538397_4a.jpg', 28, 1),
(14, '1569401538450_4d.jpg', 28, 0),
(15, '1569401538443_4c.jpg', 28, 0),
(16, '1569401538436_4b.jpg', 28, 0),
(17, '1569424973485_computer2.png', 45, 0),
(18, '1569424973483_computer1.png', 45, 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `opening_hours`
--

CREATE TABLE IF NOT EXISTS `opening_hours` (
  `id` int(11) NOT NULL,
  `weekday` varchar(45) NOT NULL,
  `opens` time DEFAULT NULL,
  `closing` time DEFAULT NULL,
  `closed` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `opening_hours`
--

INSERT INTO `opening_hours` (`id`, `weekday`, `opens`, `closing`, `closed`) VALUES
(1, 'Mandag', '09:00:00', '17:00:00', 0),
(2, 'Tirsdag', '08:00:00', '17:00:00', 0),
(3, 'Onsdag', '08:00:00', '17:00:00', 0),
(4, 'Torsdag', '08:00:00', '17:00:00', 0),
(5, 'Fredag', '08:00:00', '17:00:00', 0),
(6, 'Lørdag', '08:00:00', '17:00:00', 0),
(7, 'Søndag', '00:00:00', '00:00:00', 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `profiles`
--

CREATE TABLE IF NOT EXISTS `profiles` (
  `id` int(11) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `email` varchar(50) NOT NULL,
  `streetname` varchar(45) NOT NULL,
  `street_no` varchar(10) NOT NULL,
  `zip` int(11) NOT NULL,
  `city` varchar(30) NOT NULL,
  `country` varchar(25) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `profiles`
--

INSERT INTO `profiles` (`id`, `firstname`, `lastname`, `email`, `streetname`, `street_no`, `zip`, `city`, `country`, `phone`, `gender`, `created`) VALUES
(13, '', '', 'test@test.dk', '', '', 0, '', '', '', '', '2019-08-16 12:23:23'),
(14, '', '', 'test2@test2.dk', '', '', 0, '', '', '', '', '2019-09-11 14:13:15');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `residentials`
--

CREATE TABLE IF NOT EXISTS `residentials` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `case_number` int(20) NOT NULL,
  `rent_gross` int(8) NOT NULL,
  `rent_net` int(8) NOT NULL,
  `price` int(9) NOT NULL,
  `residential_size` int(8) NOT NULL,
  `ground_area` int(8) NOT NULL,
  `fk_category` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `residentials`
--

INSERT INTO `residentials` (`id`, `title`, `description`, `case_number`, `rent_gross`, `rent_net`, `price`, `residential_size`, `ground_area`, `fk_category`) VALUES
(25, 'Indflytningsklar luksusejendom nær skov og strand.', '<p>Beliggenheden er ideel, fordi man bor i byen, men samtidig er meget nær en god golfbane og dejlige, rekreative områder.</p>\r\n<p>Villaen, der er i to plan, er fra 2001, og den er opført i en utroligt høj kvalitet med mange meget fine og unikke detaljer. </p>\r\n<p>Man ankommer til ejendommen via en lille allé, der ender ved den dobbelte garage, som på harmonisk vis er opført i samme stil, som boligen. </p>\r\n<p>\r\nGrunden på 1.887 m2 er anlagt af en anlægsgartner, hvilket man straks lægger mærke til, når man kigger ud over den flotte have, der har symmetrisk placerede hække, en elegant flise- og stensætning samt hyggelige terrasser.</p>', 287100, 32689, 26357, 550000, 285, 11700, 11),
(26, 'Indflytningsklar luksusejendom nær skov og strand.', '<p>I byggeriet er der lagt vægt på enkle materialer. Det sker for at opnå et æstetisk rent udtryk, der danner en moderne kontrast til det naturskønne område. </p>\r\n\r\n<p>\r\nYdervæggene udgør ensartede lyse flader på den grønne baggrund. Samtidig har arkitekten kælet for detaljerne. Boligen er orienteret mod syd/vest og har et boligareal på 128 kvm og indeholder: Stor entre, 2 værelser, toilet samt køkken-alrum med udgang til gårdhaven. På 1. sal findes en stor stue, bad, soveværelse samt forrum med skabe.</p>', 108072, 17976, 16137, 2895000, 128, 182, 12),
(27, 'Nydelig og funktionelt indrettet høj stuelejlighed.', 'Lejligheden er beliggende i en hyggelig, stille sidegade med mange smukke, gamle ejendomme og masser miljø. Lejligheden ligger i gåafstand til et spændende udvalg af indkøbsmuligheder, caféer, specialbutikker samt restauranter. Der er ligeledes få minutters gang til offentligt transport. Lejligheden indeholder entre/gang, nyt stort HTH køkken med mulighed for spiseplads, stort lyst soveværelse, stort pænt badeværelse samt 2 store og dejlige lyse stuer en suite. Lejligheden er indflytningsklar, meget lys og har nye flotte plankegulve. Ejendommen, der er opført i 1920, er istandsat med respekt for de mange detaljer denne ejendom byder på. Tag og facader er nyistandsat med nye termovinduer med lavenergiglas. Til lejligheden hører kælderrum, fælles vaskekælder samt hyggeligt nyrenoveret gårdmiljø.', 180702, 12854, 9873, 1795000, 128, 128, 13),
(28, 'Arkitektonisk perle tæt på centrum.', 'Herskabelig og nyistandsat villa med en meget attraktiv beliggenhed i det bedste kvartér. Den charmerende villa, der er opført i 1910 og er beliggende direkte ned til åen.	 \r\nVillaens samlede boligareal udgør 212 m2 fordelt på stueplan og første sal. \r\nDertil kommer en kælder på 108 m2 i meget fin boligkvalitet.', 172708, 29229, 25120, 4795000, 212, 2046, 14),
(45, 'test', 'sadffgg', 342554, 43553, 43553, 4334553, 43554, 43553, 12);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `roles`
--

CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `roles`
--

INSERT INTO `roles` (`id`, `name`, `level`) VALUES
(1, 'superadmin', 100),
(2, 'admin', 99),
(3, 'employer', 50),
(4, 'customer', 10),
(5, 'guest', 1),
(10, 'dsf', 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(72) NOT NULL,
  `fk_profile` int(11) NOT NULL,
  `fk_role` int(11) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fk_profile`, `fk_role`) VALUES
(3, 'test', '$2a$10$nk9BAJ6ZDkI7VL6JPOrKR.wTYKarRSlNXdDoACK9q4YuQ/d/SeeYK', 13, 1),
(4, 'test2', '$2a$10$GYpwwVSYXhKKiobV/QbwCu2LagAyjXqS0gZoqFU5Eq1teYn3l4L66', 14, 1);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `globals`
--
ALTER TABLE `globals`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_residential_idx` (`fk_residential`);

--
-- Indeks for tabel `opening_hours`
--
ALTER TABLE `opening_hours`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `profiles`
--
ALTER TABLE `profiles`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- Indeks for tabel `residentials`
--
ALTER TABLE `residentials`
  ADD PRIMARY KEY (`id`), ADD KEY `fk_category_idx` (`fk_category`);

--
-- Indeks for tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `username_UNIQUE` (`username`), ADD KEY `fk_user_profiles_idx` (`fk_profile`), ADD KEY `fk_user_roles_idx` (`fk_role`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=29;
--
-- Tilføj AUTO_INCREMENT i tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- Tilføj AUTO_INCREMENT i tabel `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- Tilføj AUTO_INCREMENT i tabel `globals`
--
ALTER TABLE `globals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- Tilføj AUTO_INCREMENT i tabel `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- Tilføj AUTO_INCREMENT i tabel `opening_hours`
--
ALTER TABLE `opening_hours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- Tilføj AUTO_INCREMENT i tabel `profiles`
--
ALTER TABLE `profiles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
--
-- Tilføj AUTO_INCREMENT i tabel `residentials`
--
ALTER TABLE `residentials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=46;
--
-- Tilføj AUTO_INCREMENT i tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=11;
--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `residentials`
--
ALTER TABLE `residentials`
ADD CONSTRAINT `fk_category` FOREIGN KEY (`fk_category`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Begrænsninger for tabel `users`
--
ALTER TABLE `users`
ADD CONSTRAINT `fk_user_profiles` FOREIGN KEY (`fk_profile`) REFERENCES `profiles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `fk_user_roles` FOREIGN KEY (`fk_role`) REFERENCES `roles` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
