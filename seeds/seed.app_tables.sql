BEGIN;

TRUNCATE
  tasks,
  users,
  posts
  RESTART IDENTITY CASCADE;

INSERT INTO tasks(description, category)
VALUES
('Jump Trampoline', 'Body'),
('Learn Korean Alphabet', 'Mind'),
('Meditate', 'Soul'),
('Sort all photos you have ever taken', 'Other'),
('Adopt a Dog', 'Soul'),
('Sort all photos you have ever taken'. 'Other'),
('Adopt a Dog', 'Soul'),
('Plant a Tree', 'Other'),
('Sleep Outside', 'Body'),
('See the Sunrise', 'Soul'),
('See the Sunset', 'Soul'),
('Take a Yoga Lesson', 'Body'),
('Run a Marathon', 'Body'),
('Bunjee Jumping', 'Body'),
('Jump from a Cliff', 'Body'),
('Nightswimming', 'Mind'),
('Swim in the Sea/a Lake in Winter', 'Body'),
('Bath in Champagne', 'Soul'),
('Bath in Jelly', 'Soul'),
('See the Northern Lights', 'Other'),
('Build a Treehouse', 'Other'),
('Sleep in the Dessert', 'Soul'),
('Eat Snails', 'Body'),
('Swim in Ikea Ballbath', 'Soul');

INSERT INTO users(username, fullname, email, password, profile_pic, current_task, do_tasks, done_tasks)
VALUES
('fluffy_rabbit', 'Dings Bums',  'dingsbums@email.com', 'Password!123', 'URL', 1, [2, 5, 6, 7], [3,4, 8, 9, 10, 11, 12]),
('Dulli', 'Dulli Duldul', 'dulliduldul@email.com', 'Password!123', 'URL', 2, [2, 10, 8], [3,4]);


INSERT INTO posts(user_id, content, post_pic)
VALUES
(1, 'I met my friends and we all got a haircut. Do we look pretty?', 'URL'),
(1, 'Today I went running to train for the marathon.', 'URL'),
(1, 'Partied all weekend. What about you?', 'URL'),
(1, 'What do you say about my new hairstyling?', 'URL'),
(1, 'My new profile pic. You like it?', 'URL'),
(2, 'Chilling....', 'URL'),
(2, 'Nothing is too big for me. Watch out!', 'URL'),
(2, 'Mood on a cloudy day...', 'URL'),
(2, 'Feeling sexy...', 'URL'), 
(2, 'Digging for gold, losers. BLING BLING', 'URL'),
(2, 'SO SAAAAAD :-(', 'URL'),
(2, 'Travelling to the best places. What about you?', 'URL');

INSERT INTO homework(homework_id, subject, homework, teacher_id, teacher_name, class_id)
VALUES
(11, 'Math', 'page 200 no. 1-3', 1, 'Mrs Krabappel', 1),
(12, 'Art', 'Draw a picture', 2, 'Mr Bergstrom', 1),
(13, 'History', 'Read page 20-30', 3, 'Mrs Hoover', 1),      
(14, 'Languages', 'Learn vocabulary', 4, 'Mr Skinner', 1),
(15, 'Literature', 'Write a poem', 5, 'Mr Flanders', 1),
(16, 'Music', 'Sing a song', 6, 'Mr Kupferberg', 1),
(17, 'Social Studies', 'Do something social', 7, 'Mr Chalmers', 1),
(18, 'Biology', 'Plant a tree', 8, 'Mrs Pommelhorst', 1),
(21, 'Math', 'count to 100', 1, 'Mrs Krabappel', 2), 
(22, 'Art', 'Make art', 2, 'Mr Bergstrom', 2),
(23, 'History', 'Make history', 3, 'Mrs Hoover', 2),      
(24, 'Languages', 'Speak', 4, 'Mr Skinner', 2),
(25, 'Literature', 'Write literature', 5, 'Mr Flanders', 2),
(26, 'Music', 'Write a song', 6, 'Mr Kupferberg', 2),
(27, 'Social Studies', 'Be social', 7, 'Mr Chalmers', 2),
(28, 'Biology', 'Feed your pet', 8, 'Mrs Pommelhorst', 2),      
(31, 'Math', 'subtract and divide', 1, 'Mrs Krabappel', 3), 
(31, 'Math', 'multiply', 1, 'Mrs Krabappel', 3), 
(32, 'Art', 'Go to the museum', 2, 'Mr Bergstrom', 3),
(33, 'History', 'Who was Napoleon?', 3, 'Mrs Hoover', 3),      
(34, 'Languages', 'Read something', 4, 'Mr Skinner', 3),
(35, 'Literature', 'What is your favourite book about?', 5, 'Mr Flanders', 3),
(36, 'Music', 'Listen to music', 6, 'Mr Kupferberg', 3),
(37, 'Social Studies', 'What is social?', 7, 'Mr Chalmers', 3),
(38, 'Biology', 'Catch a worm', 8, 'Mrs Pommelhorst', 3),    
(41, 'Math', 'More math homework', 1, 'Mrs Krabappel', 4), 
(42, 'Art', 'Take photos of your pet', 2, 'Mr Bergstrom', 4), 
(42, 'Art', 'More art homework', 2, 'Mr Bergstrom', 4),
(43, 'History', 'More history homework', 3, 'Mrs Hoover', 4),      
(44, 'Languages', 'More languages homework', 4, 'Mr Skinner', 4),
(45, 'Literature', 'More literature homework', 5, 'Mr Flanders', 4),
(46, 'Music', 'More music homework', 6, 'Mr Kupferberg', 4),
(47, 'Social Studies', 'More social studies homework', 7, 'Mr Chalmers', 4),
(48, 'Biology', 'More biology homework', 8, 'Mrs Pommelhorst', 4),    
(51, 'Math', 'Math homework', 1, 'Mrs Krabappel', 5), 
(52, 'Art', 'Art homework', 2, 'Mr Bergstrom', 5), 
(53, 'History', 'Read history book p. 20-25', 3, 'Mrs Hoover', 5),
(53, 'History', 'History homework', 3, 'Mrs Hoover', 5),      
(54, 'Languages', 'Languages homework', 4, 'Mr Skinner', 5),
(55, 'Literature', 'Literature homework', 5, 'Mr Flanders', 5),
(56, 'Music', 'Music homework', 6, 'Mr Kupferberg', 5),
(57, 'Social Studies', 'Social studies homework', 7, 'Mr Chalmers', 5),
(58, 'Biology', 'Biology homework', 8, 'Mrs Pommelhorst', 5),
(61, 'Math', 'Math homework for class 2C', 1, 'Mrs Krabappel', 6), 
(62, 'Art', 'Art homework for class 2C', 2, 'Mr Bergstrom', 6), 
(63, 'History', 'History homework for class 2C', 3, 'Mrs Hoover', 6),
(64, 'Languages', 'Languages homework for class 2C', 4, 'Mr Skinner', 6),      
(64, 'Languages', 'More languages homework for class 2C', 4, 'Mr Skinner', 6),
(65, 'Literature', 'Literature homework for class 2C', 5, 'Mr Flanders', 6),
(66, 'Music', 'Music homework for class 2C', 6, 'Mr Kupferberg', 6),
(67, 'Social Studies', 'Social homework for class 2C', 7, 'Mr Chalmers', 6),
(68, 'Biology', 'Biology homework for class 2C', 8, 'Mrs Pommelhorst', 6);   

INSERT INTO updates_comments(comment, user_name, user_id, page_id)
VALUES
('comment no.1 update', 'GuyI', 1, 101),
('comment no. 2 update', 'Susi', 2, 102),
('comment no. 3 update', 'Maximaus', 3, 105),
('comment no. 4 update', 'Klingtgut', 4, 106),
('comment no. 5 update', 'Maria', 5, 110),
('comment no. 6 update', 'Plaumenmus86', 6, 111),
('comment no. 7 update', 'E_Krabappel', 7, 116),
('comment no. 8 update', 'S_Skinner', 8, 117),
('comment no. 9 update', 'N_Flanders', 9, 123),
('comment no. 10 update', 'GuyI', 1, 124);


INSERT INTO homework_comments(comment, user_name, user_id, page_id)
VALUES
('comment no.1 homework', 'GuyI', 1, 12),
('comment no. 2 homework', 'Susi', 2, 13),
('comment no. 3 homework', 'Maximaus', 3, 21),
('comment no. 4 homework', 'Klingtgut', 4, 22),
('comment no. 5 homework', 'Maria', 5, 33),
('comment no. 6 homework', 'Plaumenmus86', 6, 38),
('comment no. 7 homework', 'E_Krabappel', 7, 44),
('comment no. 8 homework', 'S_Skinner', 8, 55),
('comment no. 9 homework', 'N_Flanders', 9, 66),
('comment no. 10 homework', 'Susi', 2, 67); 
   


COMMIT;