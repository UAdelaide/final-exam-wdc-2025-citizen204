USE DogWalkService;

-- Insert five users
INSERT INTO Users (username, email, password_hash, role) VALUES
('alice123', 'alice@example.com', 'hashed123', 'owner'),
('bobwalker', 'bob@example.com', 'hashed456', 'walker'),
('carol123', 'carol@example.com', 'hashed789', 'owner'),
('user1', 'user1@example.com', '666', 'walker'),
('user2', 'user2@example.com', '666', 'owner');

-- Insert five dogs
INSERT INTO Dogs (owner_id, name, size) VALUES
((SELECT user_id FROM Users WHERE username = 'alice123'), 'Max', 'medium'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'Bella', 'small'),
((SELECT user_id FROM Users WHERE username = 'user1'), 'dog1', 'large'),
((SELECT user_id FROM Users WHERE username = 'user2'), 'dog2', 'small'),
((SELECT user_id FROM Users WHERE username = 'carol123'), 'dog3', 'medium');

-- Insert five walk requests
INSERT INTO WalkRequests (dog_id, requested_time, duration_minutes, location, status) VALUES
((SELECT dog_id FROM Dogs WHERE name = 'Max' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')), '2025-06-10 08:00:00', 30, 'Parklands', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'Bella' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')), '2025-06-10 09:30:00', 45, 'Beachside Ave', 'accepted'),
((SELECT dog_id FROM Dogs WHERE name = 'dog1' AND owner_id = (SELECT user_id FROM Users WHERE username = 'user2')), '2025-06-11 10:00:00', 60, 'City Park', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'dog2' AND owner_id = (SELECT user_id FROM Users WHERE username = 'alice123')), '2025-06-11 14:00:00', 30, 'Riverside Trail', 'open'),
((SELECT dog_id FROM Dogs WHERE name = 'dog3' AND owner_id = (SELECT user_id FROM Users WHERE username = 'carol123')), '2025-06-12 16:00:00', 40, 'Greenwich Gardens', 'completed');
