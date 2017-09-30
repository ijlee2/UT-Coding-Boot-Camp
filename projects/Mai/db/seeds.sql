-- Match with production schema
USE ocbusqsbzymg3amh;


INSERT INTO Writers (id, fullname, email, username, hash, url_photo, flagged, created_at, updated_at) VALUES
("2c43aa1d-e8bf-44d1-bb10-cc28ccec0964", "John Absher"    , "john.absher@example.com"    , "john" , "$2a$12$5ZWQzoBvw7yP9HwPH4Dgu.MILNr6kn.U0Syp1QC6ksV.Qh5QW3EKi", "assets/images/john_absher.jpg"    , false, "2017-09-25 04:15:06", "2017-09-25 04:15:06"),
("7592aa72-3832-4b2d-9b8e-658dc21b277d", "David Gutierrez", "david.gutierrez@example.com", "david", "$2a$12$5ZWQzoBvw7yP9HwPH4Dgu.MILNr6kn.U0Syp1QC6ksV.Qh5QW3EKi", "assets/images/david_gutierrez.jpg", false, "2017-09-25 15:05:57", "2017-09-25 15:05:57"),
("a5211e7d-8382-4221-b77a-824b051e2370", "Jason Joachim"  , "jason.joachim@example.com"  , "jason", "$2a$12$5ZWQzoBvw7yP9HwPH4Dgu.MILNr6kn.U0Syp1QC6ksV.Qh5QW3EKi", "assets/images/jason_joachim.jpg"  , false, "2017-09-25 10:28:24", "2017-09-25 10:28:24"),
("a696e28e-79b0-47ed-a9ce-d2e681665459", "Isaac Lee"      , "isaac.lee@example.com"      , "isaac", "$2a$12$5ZWQzoBvw7yP9HwPH4Dgu.MILNr6kn.U0Syp1QC6ksV.Qh5QW3EKi", "assets/images/isaac_lee.jpg"      , false, "2017-09-25 04:13:41", "2017-09-25 08:13:41");


INSERT INTO Stories (id, title, created_at, updated_at, writer_id) VALUES
("1fb41095-a0c7-4764-bd78-3cf1234ec257", "Inspirations"     , "2017-09-27 11:30:17", "2017-09-27 11:30:17", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("3f11625f-95b8-44b2-b6e8-d601c48eb35d", "Hike in Austin"   , "2017-09-26 20:30:17", "2017-09-26 20:30:17", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("63618791-709f-4691-95ae-4727299d790d", "Hidden Places"    , "2017-09-26 17:03:28", "2017-09-26 17:03:28", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("2000a6d2-2ffb-43de-9795-daa66d59aa6f", "My Morning"       , "2017-09-28 08:25:43", "2017-09-28 08:25:43", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("4828900f-8643-4aac-9565-dc0b3618fc70", "My Afternoon"     , "2017-09-28 14:39:50", "2017-09-28 14:39:50", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("31df97a6-b2c6-454d-8770-3347d66724ae", "My Evening"       , "2017-09-28 20:15:15", "2017-09-28 20:15:15", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),

("c24530d6-7b65-44ca-8e43-5cd58e44c3e9", "Inspirations"     , "2017-09-27 11:30:17", "2017-09-27 11:30:17", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("d584af97-0c4b-463d-970f-32c2cdbe91d7", "Hike in Austin"   , "2017-09-26 20:30:17", "2017-09-26 20:30:17", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("b1ede670-585b-4e02-924f-afd9b4861d4c", "Hidden Places"    , "2017-09-26 17:03:28", "2017-09-26 17:03:28", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("4405a89e-f9c1-4042-b730-217e9bc5a163", "My Morning"       , "2017-09-28 08:25:43", "2017-09-28 08:25:43", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("81d7d549-176c-44b3-9f84-b8fe2fafad6f", "My Afternoon"     , "2017-09-28 14:39:50", "2017-09-28 14:39:50", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("b8c5dac2-b14b-4ec4-9434-0f92a5679ea3", "My Evening"       , "2017-09-28 20:15:15", "2017-09-28 20:15:15", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),

("f2f62de0-7335-4360-a462-7071d37a1762", "Inspirations"     , "2017-09-27 11:30:17", "2017-09-27 11:30:17", "a5211e7d-8382-4221-b77a-824b051e2370"),
("a9151086-364f-44ab-b29e-3a5d8f466c53", "Hike in Austin"   , "2017-09-26 20:30:17", "2017-09-26 20:30:17", "a5211e7d-8382-4221-b77a-824b051e2370"),
("1be4cbb0-0d29-4158-acc5-8b9407c927e9", "Hidden Places"    , "2017-09-26 17:03:28", "2017-09-26 17:03:28", "a5211e7d-8382-4221-b77a-824b051e2370"),
("a9c447f3-a812-4407-812f-30217e05a975", "My Morning"       , "2017-09-28 08:25:43", "2017-09-28 08:25:43", "a5211e7d-8382-4221-b77a-824b051e2370"),
("31b390ac-50c0-430d-afc2-d6c9e23eb313", "My Afternoon"     , "2017-09-28 14:39:50", "2017-09-28 14:39:50", "a5211e7d-8382-4221-b77a-824b051e2370"),
("323540bb-c187-4f2b-8baf-8253655a4789", "My Evening"       , "2017-09-28 20:15:15", "2017-09-28 20:15:15", "a5211e7d-8382-4221-b77a-824b051e2370"),

("dda19f0e-245e-4a79-af73-bd23ed983dd1", "Inspirations"     , "2017-09-27 11:30:17", "2017-09-27 11:30:17", "a696e28e-79b0-47ed-a9ce-d2e681665459"),
("0669cad1-c61f-45ae-9adc-7f74cc25875b", "Hike in Austin"   , "2017-09-26 20:30:17", "2017-09-26 20:30:17", "a696e28e-79b0-47ed-a9ce-d2e681665459"),
("4876b5a4-aeed-4026-b3e5-3d50621a77b3", "Hidden Places"    , "2017-09-26 17:03:28", "2017-09-26 17:03:28", "a696e28e-79b0-47ed-a9ce-d2e681665459"),
("93de8a1c-6c58-4328-ae45-6336a703172e", "My Morning"       , "2017-09-28 08:25:43", "2017-09-28 08:25:43", "a696e28e-79b0-47ed-a9ce-d2e681665459"),
("5ba8c1ee-ad4a-471f-8b2e-2b3de4e60f09", "My Afternoon"     , "2017-09-28 14:39:50", "2017-09-28 14:39:50", "a696e28e-79b0-47ed-a9ce-d2e681665459"),
("211dcadd-62dc-41f2-8e04-93113fc6957e", "My Evening"       , "2017-09-28 20:15:15", "2017-09-28 20:15:15", "a696e28e-79b0-47ed-a9ce-d2e681665459");


INSERT INTO Photos (id, url, caption, time_taken, created_at, updated_at, story_id) VALUES
("3e0235bd-8c33-4294-a476-2e94a677708a", "https://goo.gl/9p2qT2", "Teachers are treasures."                                 , "2017-09-26 15:10:57", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "1fb41095-a0c7-4764-bd78-3cf1234ec257"),
("bcca9dfb-2615-4ab2-945e-361e03f5ed3a", "https://goo.gl/uKWPCJ", "Words to live and change your life by..."                , "2017-09-26 15:21:04", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "1fb41095-a0c7-4764-bd78-3cf1234ec257"),
("20debdd9-946c-4a50-bb23-69bf6bca0d47", "https://goo.gl/tAeWUE", "Trying to change my perspective on things.."             , "2017-09-26 16:50:18", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "1fb41095-a0c7-4764-bd78-3cf1234ec257"),
("ea09ead5-9b3c-40ad-bcd8-6713d62d0c9d", "https://goo.gl/Cg9SvX", "Yeah!"                                                   , "2017-09-26 18:13:36", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "1fb41095-a0c7-4764-bd78-3cf1234ec257"),
("285364dc-294c-487f-8f41-7696e52a4f2e", "https://goo.gl/yCFoNu", "Feeling humble and blessed today. Best day of my life."  , "2017-09-26 19:40:22", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "1fb41095-a0c7-4764-bd78-3cf1234ec257"),
("4c787675-c84b-4385-a271-7710503ea02d", "https://goo.gl/XNqBGr", "Excited to see where I end up!"                          , "2017-08-30 12:11:06", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "3f11625f-95b8-44b2-b6e8-d601c48eb35d"),
("fd51afcd-756e-4642-8e84-c5b37ac36dc4", "https://goo.gl/1uKufW", "Wish you were here."                                     , "2017-08-30 14:35:27", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "3f11625f-95b8-44b2-b6e8-d601c48eb35d"),
("604f0c3f-b674-4990-82ec-a707c178e92e", "https://goo.gl/V3fhGy", "Just do it!"                                             , "2017-08-30 15:00:33", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "3f11625f-95b8-44b2-b6e8-d601c48eb35d"),
("cf3b5629-f778-4103-8fb7-0253c45d9eb0", "https://goo.gl/eH41R5", "Feeling the cool breeze."                                , "2017-09-15 12:11:15", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "63618791-709f-4691-95ae-4727299d790d"),
("d466295e-d272-4ef5-b84b-92cd343a9e36", "https://goo.gl/WJkBzh", "Venice. Right in the thick of it!"                       , "2017-09-15 16:40:25", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "63618791-709f-4691-95ae-4727299d790d"),
("f4b128c5-247e-4d35-8dd9-f8f6352f43f7", "https://goo.gl/2T8MNJ", "Electric nighttime algae in Australia. Loving it."       , "2017-09-15 22:37:08", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "63618791-709f-4691-95ae-4727299d790d"),
("29a239a0-4614-410b-a111-ba85e541bcc2", "https://goo.gl/MtGZEr", "This is the best day ever already! XOXO"                 , "2017-09-28 07:23:34", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "2000a6d2-2ffb-43de-9795-daa66d59aa6f"),
("be36bd2f-6010-41e6-850c-14c10c520320", "https://goo.gl/zJy72M", "Morning coffee and a stroll through NYC. Doing it right!", "2017-09-28 08:09:17", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "2000a6d2-2ffb-43de-9795-daa66d59aa6f"),
("574ecd28-73b4-4a87-8dd0-febd10e3ab75", "https://goo.gl/SQA2Cf", "Morning canoe trip. Worth waking up for!"                , "2017-09-28 09:15:54", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "2000a6d2-2ffb-43de-9795-daa66d59aa6f"),
("943fc890-d1f5-40a4-8569-1dc7a8aa4e9b", "https://goo.gl/6ZxKvs", "Gametime!"                                               , "2017-09-28 11:56:39", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "4828900f-8643-4aac-9565-dc0b3618fc70"),
("9b00b529-ad13-49f9-adff-df09f79e0141", "https://goo.gl/yPwbkp", "Grandma and Grampa hanging out with the boys :)"         , "2017-09-28 13:19:50", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "4828900f-8643-4aac-9565-dc0b3618fc70"),
("a6248ba0-217b-46de-90f5-d4396ebc0758", "https://goo.gl/V3Xn1v", "Lazy Sunday float. Get it."                              , "2017-09-28 13:25:49", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "4828900f-8643-4aac-9565-dc0b3618fc70"),
("71a35f0a-9bdc-4e82-9c13-adb2a42dd6a7", "https://goo.gl/c83xCA", "It's about to get very quiet at this table."             , "2017-09-28 14:38:27", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "4828900f-8643-4aac-9565-dc0b3618fc70"),
("9eb791da-1088-4a75-a292-249efd629660", "https://goo.gl/QgWG9M", "We all start as strangers. $friendsgiving"               , "2017-09-28 19:05:26", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "31df97a6-b2c6-454d-8770-3347d66724ae"),
("dee4f3c6-9b7b-438f-ab85-2d6fe36791e1", "https://goo.gl/ZKsjY9", "She said yes!!!!"                                        , "2017-09-28 20:10:33", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "31df97a6-b2c6-454d-8770-3347d66724ae"),
("b6dd1dd1-f05c-4636-be12-2e5566cc8929", "https://goo.gl/huUNKg", "Feeling high on this sunrise. Very blessed."             , "2017-09-28 20:14:28", "2017-09-28 20:14:46", "2017-09-28 20:14:46", "31df97a6-b2c6-454d-8770-3347d66724ae"),

("dc3ffff4-8d77-4707-bdcc-ef28518ce2c9", "https://goo.gl/9p2qT2", "Teachers are treasures."                                 , "2017-09-26 15:10:57", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "c24530d6-7b65-44ca-8e43-5cd58e44c3e9"),
("f5665244-d3a3-4dee-acfc-7854bb36e960", "https://goo.gl/uKWPCJ", "Words to live and change your life by..."                , "2017-09-26 15:21:04", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "c24530d6-7b65-44ca-8e43-5cd58e44c3e9"),
("5463c64c-2989-4043-9047-fe6ba3cd475f", "https://goo.gl/tAeWUE", "Trying to change my perspective on things.."             , "2017-09-26 16:50:18", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "c24530d6-7b65-44ca-8e43-5cd58e44c3e9"),
("60790f1b-f9d5-44e6-ad75-907a9901568b", "https://goo.gl/Cg9SvX", "Yeah!"                                                   , "2017-09-26 18:13:36", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "c24530d6-7b65-44ca-8e43-5cd58e44c3e9"),
("e2d192cc-89f6-438f-aa08-bb42e894afd3", "https://goo.gl/yCFoNu", "Feeling humble and blessed today. Best day of my life."  , "2017-09-26 19:40:22", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "c24530d6-7b65-44ca-8e43-5cd58e44c3e9"),
("02071b56-3360-47fa-b068-b406351448a5", "https://goo.gl/XNqBGr", "Excited to see where I end up!"                          , "2017-08-30 12:11:06", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "d584af97-0c4b-463d-970f-32c2cdbe91d7"),
("33b5b1fb-ddb0-485d-b500-dd455abf4854", "https://goo.gl/1uKufW", "Wish you were here."                                     , "2017-08-30 14:35:27", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "d584af97-0c4b-463d-970f-32c2cdbe91d7"),
("cdbec7c0-a8bc-4a4b-a103-9e3109b2db05", "https://goo.gl/V3fhGy", "Just do it!"                                             , "2017-08-30 15:00:33", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "d584af97-0c4b-463d-970f-32c2cdbe91d7"),
("e8c7f6cb-edb2-4ba8-86b3-eac3d6c27901", "https://goo.gl/eH41R5", "Feeling the cool breeze."                                , "2017-09-15 12:11:15", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "b1ede670-585b-4e02-924f-afd9b4861d4c"),
("c5827eb6-061d-4ddf-9c16-116a56e0da26", "https://goo.gl/WJkBzh", "Venice. Right in the thick of it!"                       , "2017-09-15 16:40:25", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "b1ede670-585b-4e02-924f-afd9b4861d4c"),
("7a9875e3-9151-4c55-998c-9a5c0c3d976f", "https://goo.gl/2T8MNJ", "Electric nighttime algae in Australia. Loving it."       , "2017-09-15 22:37:08", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "b1ede670-585b-4e02-924f-afd9b4861d4c"),
("50373a68-cdc6-4d17-820d-41edf8a099dc", "https://goo.gl/MtGZEr", "This is the best day ever already! XOXO"                 , "2017-09-28 07:23:34", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "4405a89e-f9c1-4042-b730-217e9bc5a163"),
("68f48d3d-f78d-4b6e-9427-8fae433d501a", "https://goo.gl/zJy72M", "Morning coffee and a stroll through NYC. Doing it right!", "2017-09-28 08:09:17", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "4405a89e-f9c1-4042-b730-217e9bc5a163"),
("07b4f94a-5f72-4991-ad64-e44bf1fbb5cd", "https://goo.gl/SQA2Cf", "Morning canoe trip. Worth waking up for!"                , "2017-09-28 09:15:54", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "4405a89e-f9c1-4042-b730-217e9bc5a163"),
("ad18d323-de56-49a2-bc83-418436255ba4", "https://goo.gl/6ZxKvs", "Gametime!"                                               , "2017-09-28 11:56:39", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "81d7d549-176c-44b3-9f84-b8fe2fafad6f"),
("10348521-31d1-47c6-bb43-a30ac5c88a19", "https://goo.gl/yPwbkp", "Grandma and Grampa hanging out with the boys :)"         , "2017-09-28 13:19:50", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "81d7d549-176c-44b3-9f84-b8fe2fafad6f"),
("00fe8cc6-5b96-4c14-8a67-b33029c75c17", "https://goo.gl/V3Xn1v", "Lazy Sunday float. Get it."                              , "2017-09-28 13:25:49", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "81d7d549-176c-44b3-9f84-b8fe2fafad6f"),
("ebe7ced7-5c9f-4736-afe1-b3d8be149a05", "https://goo.gl/c83xCA", "It's about to get very quiet at this table."             , "2017-09-28 14:38:27", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "81d7d549-176c-44b3-9f84-b8fe2fafad6f"),
("b720132d-029e-45be-accc-2920a454b626", "https://goo.gl/QgWG9M", "We all start as strangers. $friendsgiving"               , "2017-09-28 19:05:26", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "b8c5dac2-b14b-4ec4-9434-0f92a5679ea3"),
("0af32b25-94ab-4cee-a2f1-25f9a3f045d6", "https://goo.gl/ZKsjY9", "She said yes!!!!"                                        , "2017-09-28 20:10:33", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "b8c5dac2-b14b-4ec4-9434-0f92a5679ea3"),
("29b19f70-cb1a-41b0-8417-84f32bde9239", "https://goo.gl/huUNKg", "Feeling high on this sunrise. Very blessed."             , "2017-09-28 20:14:28", "2017-09-28 20:14:46", "2017-09-28 20:14:46", "b8c5dac2-b14b-4ec4-9434-0f92a5679ea3"),

("ced55fe5-c1db-4ddd-ae0d-71d4c5d350e3", "https://goo.gl/9p2qT2", "Teachers are treasures."                                 , "2017-09-26 15:10:57", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "f2f62de0-7335-4360-a462-7071d37a1762"),
("20249d6d-39b2-40ca-9c18-310423af0640", "https://goo.gl/uKWPCJ", "Words to live and change your life by..."                , "2017-09-26 15:21:04", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "f2f62de0-7335-4360-a462-7071d37a1762"),
("b61026b4-f1be-4dea-9aa9-5a31ccb42279", "https://goo.gl/tAeWUE", "Trying to change my perspective on things.."             , "2017-09-26 16:50:18", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "f2f62de0-7335-4360-a462-7071d37a1762"),
("8c7d9056-ea37-42c0-80c1-b63e65751c07", "https://goo.gl/Cg9SvX", "Yeah!"                                                   , "2017-09-26 18:13:36", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "f2f62de0-7335-4360-a462-7071d37a1762"),
("2b240aed-f321-4135-9e88-49ab6c65cf93", "https://goo.gl/yCFoNu", "Feeling humble and blessed today. Best day of my life."  , "2017-09-26 19:40:22", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "f2f62de0-7335-4360-a462-7071d37a1762"),
("fbe50bb3-0c19-4292-882f-a59a69133fa0", "https://goo.gl/XNqBGr", "Excited to see where I end up!"                          , "2017-08-30 12:11:06", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "a9151086-364f-44ab-b29e-3a5d8f466c53"),
("aa7d6ad6-1240-4469-9652-1d661bee387a", "https://goo.gl/1uKufW", "Wish you were here."                                     , "2017-08-30 14:35:27", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "a9151086-364f-44ab-b29e-3a5d8f466c53"),
("389020a1-5bca-4212-812e-dd452ff1c249", "https://goo.gl/V3fhGy", "Just do it!"                                             , "2017-08-30 15:00:33", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "a9151086-364f-44ab-b29e-3a5d8f466c53"),
("26191b1b-2d8e-4467-b679-f2cd2249b2fb", "https://goo.gl/eH41R5", "Feeling the cool breeze."                                , "2017-09-15 12:11:15", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "1be4cbb0-0d29-4158-acc5-8b9407c927e9"),
("41136757-efc3-4ec3-a821-bf32460c2205", "https://goo.gl/WJkBzh", "Venice. Right in the thick of it!"                       , "2017-09-15 16:40:25", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "1be4cbb0-0d29-4158-acc5-8b9407c927e9"),
("a62f87f6-b0a1-45b8-856e-fdf1c6ec1a5f", "https://goo.gl/2T8MNJ", "Electric nighttime algae in Australia. Loving it."       , "2017-09-15 22:37:08", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "1be4cbb0-0d29-4158-acc5-8b9407c927e9"),
("52a7a9a0-3820-4546-84d7-d93281e2ff57", "https://goo.gl/MtGZEr", "This is the best day ever already! XOXO"                 , "2017-09-28 07:23:34", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "a9c447f3-a812-4407-812f-30217e05a975"),
("c05c2b24-8074-48e2-bcbe-4e0dca4cfdfb", "https://goo.gl/zJy72M", "Morning coffee and a stroll through NYC. Doing it right!", "2017-09-28 08:09:17", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "a9c447f3-a812-4407-812f-30217e05a975"),
("91e7dd8c-722e-40c8-9265-e012e2f6b8e3", "https://goo.gl/SQA2Cf", "Morning canoe trip. Worth waking up for!"                , "2017-09-28 09:15:54", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "a9c447f3-a812-4407-812f-30217e05a975"),
("39b20d1a-a735-4a73-ab45-afb88f5b4bf4", "https://goo.gl/6ZxKvs", "Gametime!"                                               , "2017-09-28 11:56:39", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "31b390ac-50c0-430d-afc2-d6c9e23eb313"),
("4ce846e2-9d2b-4b90-bc18-ee4152a30baf", "https://goo.gl/yPwbkp", "Grandma and Grampa hanging out with the boys :)"         , "2017-09-28 13:19:50", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "31b390ac-50c0-430d-afc2-d6c9e23eb313"),
("adcb5883-413a-4f8f-a756-d642dfc16729", "https://goo.gl/V3Xn1v", "Lazy Sunday float. Get it."                              , "2017-09-28 13:25:49", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "31b390ac-50c0-430d-afc2-d6c9e23eb313"),
("24d450af-75aa-4299-a948-aa0cc6d4c101", "https://goo.gl/c83xCA", "It's about to get very quiet at this table."             , "2017-09-28 14:38:27", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "31b390ac-50c0-430d-afc2-d6c9e23eb313"),
("b97a3daa-f8d6-4722-ae43-2a569427261b", "https://goo.gl/QgWG9M", "We all start as strangers. $friendsgiving"               , "2017-09-28 19:05:26", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "323540bb-c187-4f2b-8baf-8253655a4789"),
("46116739-3dc8-41aa-8b03-007ab64f5033", "https://goo.gl/ZKsjY9", "She said yes!!!!"                                        , "2017-09-28 20:10:33", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "323540bb-c187-4f2b-8baf-8253655a4789"),
("d91d829c-a3a2-48ef-9785-9bcfafe143cc", "https://goo.gl/huUNKg", "Feeling high on this sunrise. Very blessed."             , "2017-09-28 20:14:28", "2017-09-28 20:14:46", "2017-09-28 20:14:46", "323540bb-c187-4f2b-8baf-8253655a4789"),

("c1bdd13d-f821-460c-9099-741ceaa77b82", "https://goo.gl/9p2qT2", "Teachers are treasures."                                 , "2017-09-26 15:10:57", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "dda19f0e-245e-4a79-af73-bd23ed983dd1"),
("1ffcb6db-d282-4dd7-8ec8-02b6911b877b", "https://goo.gl/uKWPCJ", "Words to live and change your life by..."                , "2017-09-26 15:21:04", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "dda19f0e-245e-4a79-af73-bd23ed983dd1"),
("4e1e53a9-1965-469a-ae79-97d725569ee3", "https://goo.gl/tAeWUE", "Trying to change my perspective on things.."             , "2017-09-26 16:50:18", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "dda19f0e-245e-4a79-af73-bd23ed983dd1"),
("072644a5-f62e-4e09-9984-25d2e2e02505", "https://goo.gl/Cg9SvX", "Yeah!"                                                   , "2017-09-26 18:13:36", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "dda19f0e-245e-4a79-af73-bd23ed983dd1"),
("1170d169-e7cd-4fb7-b489-1375c21492bf", "https://goo.gl/yCFoNu", "Feeling humble and blessed today. Best day of my life."  , "2017-09-26 19:40:22", "2017-09-27 11:29:47", "2017-09-27 11:29:47", "dda19f0e-245e-4a79-af73-bd23ed983dd1"),
("9190e0d7-d695-4517-9655-15ba3e4b54b0", "https://goo.gl/XNqBGr", "Excited to see where I end up!"                          , "2017-08-30 12:11:06", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "0669cad1-c61f-45ae-9adc-7f74cc25875b"),
("a2678a5f-482d-429a-8bed-8aef3bb528d8", "https://goo.gl/1uKufW", "Wish you were here."                                     , "2017-08-30 14:35:27", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "0669cad1-c61f-45ae-9adc-7f74cc25875b"),
("04a6f733-7583-43ba-b227-aacc717028d9", "https://goo.gl/V3fhGy", "Just do it!"                                             , "2017-08-30 15:00:33", "2017-09-26 20:30:12", "2017-09-26 20:30:12", "0669cad1-c61f-45ae-9adc-7f74cc25875b"),
("bfc5d5b3-7fa6-4e0c-b7b6-c65d8e116d4b", "https://goo.gl/eH41R5", "Feeling the cool breeze."                                , "2017-09-15 12:11:15", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "4876b5a4-aeed-4026-b3e5-3d50621a77b3"),
("a385261e-7590-4383-8ccc-96a3ea6c420c", "https://goo.gl/WJkBzh", "Venice. Right in the thick of it!"                       , "2017-09-15 16:40:25", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "4876b5a4-aeed-4026-b3e5-3d50621a77b3"),
("ee80ec1b-bd76-45f9-948a-4fec71379a29", "https://goo.gl/2T8MNJ", "Electric nighttime algae in Australia. Loving it."       , "2017-09-15 22:37:08", "2017-09-26 17:03:13", "2017-09-26 17:03:13", "4876b5a4-aeed-4026-b3e5-3d50621a77b3"),
("35a581a5-5e9a-46b4-b5e9-599760f4a85e", "https://goo.gl/MtGZEr", "This is the best day ever already! XOXO"                 , "2017-09-28 07:23:34", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "93de8a1c-6c58-4328-ae45-6336a703172e"),
("be76bc24-2709-4930-91a2-f349b515c388", "https://goo.gl/zJy72M", "Morning coffee and a stroll through NYC. Doing it right!", "2017-09-28 08:09:17", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "93de8a1c-6c58-4328-ae45-6336a703172e"),
("d93a017c-8e96-4c39-8907-478f47cd2fa6", "https://goo.gl/SQA2Cf", "Morning canoe trip. Worth waking up for!"                , "2017-09-28 09:15:54", "2017-09-28 08:25:20", "2017-09-28 08:25:20", "93de8a1c-6c58-4328-ae45-6336a703172e"),
("8d88aca2-de2c-4930-be1e-110d51c9f2f7", "https://goo.gl/6ZxKvs", "Gametime!"                                               , "2017-09-28 11:56:39", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "5ba8c1ee-ad4a-471f-8b2e-2b3de4e60f09"),
("442d1aa9-e5fe-45fe-95af-c746f6f1dfec", "https://goo.gl/yPwbkp", "Grandma and Grampa hanging out with the boys :)"         , "2017-09-28 13:19:50", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "5ba8c1ee-ad4a-471f-8b2e-2b3de4e60f09"),
("f031f1f3-908e-4fc8-912e-788437d3d50f", "https://goo.gl/V3Xn1v", "Lazy Sunday float. Get it."                              , "2017-09-28 13:25:49", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "5ba8c1ee-ad4a-471f-8b2e-2b3de4e60f09"),
("08ccc612-8a7f-441e-8bb8-9f29f3430a3c", "https://goo.gl/c83xCA", "It's about to get very quiet at this table."             , "2017-09-28 14:38:27", "2017-09-28 14:39:06", "2017-09-28 14:39:06", "5ba8c1ee-ad4a-471f-8b2e-2b3de4e60f09"),
("08cb5d48-693a-45be-8464-9901f02062f4", "https://goo.gl/QgWG9M", "We all start as strangers. $friendsgiving"               , "2017-09-28 19:05:26", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "211dcadd-62dc-41f2-8e04-93113fc6957e"),
("7d10e86e-9521-468b-9f1c-13c20598385d", "https://goo.gl/ZKsjY9", "She said yes!!!!"                                        , "2017-09-28 20:10:33", "2017-09-28 20:15:04", "2017-09-28 20:15:04", "211dcadd-62dc-41f2-8e04-93113fc6957e"),
("a451035f-15ea-4afe-8cfd-ba757f0b24a8", "https://goo.gl/huUNKg", "Feeling high on this sunrise. Very blessed."             , "2017-09-28 20:14:28", "2017-09-28 20:14:46", "2017-09-28 20:14:46", "211dcadd-62dc-41f2-8e04-93113fc6957e");


INSERT INTO Readers (id, reader_id, created_at, updated_at, writer_id) VALUES
("df929932-11d6-432b-a463-dbf96f27b365", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964", "2017-09-26 12:00:00", "2017-09-26 12:00:00", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("3d34ca74-4738-4e99-9298-efd4dbf9fc04", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964", "2017-09-26 12:00:03", "2017-09-26 12:00:03", "a5211e7d-8382-4221-b77a-824b051e2370"),
("fa1e2f01-367d-4c66-93f3-aa6552e414d9", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964", "2017-09-26 12:00:07", "2017-09-26 12:00:07", "a696e28e-79b0-47ed-a9ce-d2e681665459"),

("a790f6a8-d33f-47e5-a6b9-48923b436b92", "7592aa72-3832-4b2d-9b8e-658dc21b277d", "2017-09-26 13:00:00", "2017-09-26 13:00:00", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("df59556f-b3be-4d85-bfc1-fdb84783a2b1", "7592aa72-3832-4b2d-9b8e-658dc21b277d", "2017-09-26 13:00:03", "2017-09-26 13:00:03", "a5211e7d-8382-4221-b77a-824b051e2370"),
("bf58ccf3-c0c4-4d41-b811-32b076c3d394", "7592aa72-3832-4b2d-9b8e-658dc21b277d", "2017-09-26 13:00:07", "2017-09-26 13:00:07", "a696e28e-79b0-47ed-a9ce-d2e681665459"),

("ece2c087-9546-4060-9e02-4eee1a524817", "a5211e7d-8382-4221-b77a-824b051e2370", "2017-09-26 14:00:00", "2017-09-26 14:00:00", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("2bcf6fb0-4195-498a-892f-053f8d95c4fa", "a5211e7d-8382-4221-b77a-824b051e2370", "2017-09-26 14:00:03", "2017-09-26 14:00:03", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("4de62c1e-70b4-4f13-a71c-6b5dc9d2fa94", "a5211e7d-8382-4221-b77a-824b051e2370", "2017-09-26 14:00:07", "2017-09-26 14:00:07", "a696e28e-79b0-47ed-a9ce-d2e681665459"),

("da1cef07-b865-4a9f-9e99-591b0f0cc11c", "a696e28e-79b0-47ed-a9ce-d2e681665459", "2017-09-26 15:00:00", "2017-09-26 15:00:00", "2c43aa1d-e8bf-44d1-bb10-cc28ccec0964"),
("00293059-18ab-4bdb-b6eb-430254dce3cb", "a696e28e-79b0-47ed-a9ce-d2e681665459", "2017-09-26 15:00:03", "2017-09-26 15:00:03", "7592aa72-3832-4b2d-9b8e-658dc21b277d"),
("cb0c3ef8-6f85-4c66-b802-2727d864a2f0", "a696e28e-79b0-47ed-a9ce-d2e681665459", "2017-09-26 15:00:07", "2017-09-26 15:00:07", "a5211e7d-8382-4221-b77a-824b051e2370");


/* Check if values have been added correctly */
SELECT * FROM Writers;
SELECT * FROM Stories;
SELECT * FROM Photos;
SELECT * FROM Readers;