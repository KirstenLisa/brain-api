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
('Sort all photos you have ever taken', 'Other'),
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
('fluffy_rabbit', 'Dings Bums',  'dingsbums@email.com', '$2a$12$enwDVw1uuaA0gR/q1WNrBOkWu8U.ztadoEEeIF8CyE6OkJSd6lG3m', 'URL', 1, '{2, 5, 6, 7}', '{3, 4, 8, 9, 10, 11, 12}'),
('Dulli', 'Dulli Duldul', 'dulliduldul@email.com', '$2a$12$GdCMSyWS7fWkHJDD5DKKQOhgs/o2L7rIYCTfpl1uSk.Hbrn7qbeVm', 'URL', 2, '{2, 10, 8}', '{3, 4}');


INSERT INTO posts(content, post_pic, user_id)
VALUES
('I met my friends and we all got a haircut. Do we look pretty?', 'URL', 1),
('Today I went running to train for the marathon.', 'URL', 1),
('Partied all weekend. What about you?', 'URL', 1),
('What do you say about my new hairstyling?', 'URL', 1),
('My new profile pic. You like it?', 'URL', 1),
('Chilling....', 'URL', 2),
('Nothing is too big for me. Watch out!', 'URL', 2),
('Mood on a cloudy day...', 'URL', 2),
('Feeling sexy...', 'URL', 2), 
('Digging for gold, losers. BLING BLING', 'URL', 2),
('SO SAAAAAD...', 'URL', 2),
('Travelling to the best places. What about you?', 'URL', 2);



COMMIT;