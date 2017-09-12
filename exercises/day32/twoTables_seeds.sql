USE twoTables_db;

-- Load data from a csv file
LOAD DATA LOCAL INFILE 'C:/Users/Isaac/Documents/GitHub/UT-Coding-Boot-Camp/exercises/day32/TopSongs.csv'
INTO TABLE topSongs
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 0 ROWS;

LOAD DATA LOCAL INFILE 'C:/Users/Isaac/Documents/GitHub/UT-Coding-Boot-Camp/exercises/day32/TopAlbums.csv'
INTO TABLE topAlbums
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 0 ROWS;

DROP TABLE IF EXISTS table_combined;

CREATE TABLE table_combined
SELECT a.position AS album_position, s.position AS song_position, a.artist_name, a.album_name, s.song_name, a.year,
       a.raw_total AS album_raw_total, s.raw_total AS song_raw_total
FROM topAlbums AS a INNER JOIN topSongs AS s
ON a.artist_name = s.artist_name AND a.year = s.year;

SELECT * FROM table_combined;