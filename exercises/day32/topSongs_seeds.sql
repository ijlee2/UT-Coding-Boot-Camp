/*
INSERT INTO top5000 VALUES
(1, "Bing Crosby", "White Christmas", 1942, 39.903, 23.929, 5.700, 2.185, 0.540),
(2, "Bill Haley & His Comets", "Rock Around the Clock", 1955, 36.503, 19.961, 7.458, 5.663, 0.760),
(3, "Celine Dion", "My Heart Will Go On", 1998, 35.405, 12.636, 8.944, 23.701, 3.61);
*/

USE topSongs_db;

-- Load data from a csv file
LOAD DATA LOCAL INFILE 'C:/Users/Isaac/Documents/GitHub/UT-Coding-Boot-Camp/exercises/day32/TopSongs.csv'
INTO TABLE top5000
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 0 ROWS;

SELECT * FROM top5000;