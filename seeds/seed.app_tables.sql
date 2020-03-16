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
('fluffy_rabbit', 'Dings Bums',  'dingsbums@email.com', '$2a$12$enwDVw1uuaA0gR/q1WNrBOkWu8U.ztadoEEeIF8CyE6OkJSd6lG3m', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpaka_funny.jpg', 1, '{2, 5, 6, 7}', '{3, 4, 8, 9, 10, 11, 12}'),
('Dulli', 'Dulli Duldul', 'dulliduldul@email.com', '$2a$12$GdCMSyWS7fWkHJDD5DKKQOhgs/o2L7rIYCTfpl1uSk.Hbrn7qbeVm', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/Dully.JPG', 2, '{5, 10, 8}', '{3, 4}');


INSERT INTO posts(content, post_pic, user_id)
VALUES
('I met my friends and we all got a haircut. Do we look pretty?', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpakas.jpg', 1),
('Today I went running to train for the marathon.', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpaka_running.jpg', 1),
('Partied all weekend. What about you?', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpaka_dancing.jpg', 1),
('What do you say about my new hairstyling?', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpaka_hair.jpg', 1),
('My new profile pic. You like it?', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/alpaka_funny.jpg', 1),
('Chilling....', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dully_lying.jpg', 2),
('Nothing is too big for me. Watch out!', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dulli_stick.jpeg', 2),
('Mood on a cloudy day...', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dulli_beach.jpeg', 2),
('Feeling sexy...', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dulli_sofa.jpeg', 2), 
('Digging for gold, losers. BLING BLING', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dulli_sunset.jpeg', 2),
('SO SAAAAAD...', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dulli_tired.jpeg', 2),
('Travelling to the best places. What about you?', 'https://brain-app-image-bucket.s3.eu-central-1.amazonaws.com/dulli_hill.jpeg', 2);



COMMIT;