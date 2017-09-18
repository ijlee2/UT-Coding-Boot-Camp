USE burgers_db;

INSERT INTO burgers (name, image_url, devoured, date) VALUES
("The Classic"         , "https://goo.gl/LVPCRt", false, "2017-09-17 13:10:08"),
("Goodnight/Good Cause", "https://goo.gl/cJR2X7", false, "2017-09-17 13:12:43"),
("Terlingua"           , "https://goo.gl/SmdHJb", false, "2017-09-17 13:15:17"),
("Magic Shroom"        , "https://goo.gl/zBnqQS", false, "2017-09-17 13:16:32"),
("Llano Poblano"       , "https://goo.gl/kNaiAM", true , "2017-09-17 13:18:55"),
("El Diablo"           , "https://goo.gl/dFNS5g", true , "2017-09-17 13:20:00"),
("The Impossible"      , "https://goo.gl/GukNbP", true , "2017-09-17 13:21:14"),
("Primetime"           , "https://goo.gl/vbECBM", false, "2017-09-17 13:23:47"),
("Buffalo Bill"        , "https://goo.gl/iF5t2z", false, "2017-09-17 13:24:32"),
("Greek"               , "https://goo.gl/EL3gKt", false, "2017-09-17 13:26:07"),
("Hoss' Hot Chicken"   , "https://goo.gl/y2chpy", false, "2017-09-17 13:26:58"),
("Thunderbird"         , "https://goo.gl/nnE2rP", true , "2017-09-17 13:28:15"),
("Continental Club"    , "https://goo.gl/Nq3Ubo", false, "2017-09-17 13:29:23"),
("Ahi Tuna"            , "https://goo.gl/CTHZvH", true , "2017-09-17 13:30:44"),
("La Bandita"          , "https://goo.gl/BYMQT2", false, "2017-09-17 13:32:29");

SELECT * FROM burgers;