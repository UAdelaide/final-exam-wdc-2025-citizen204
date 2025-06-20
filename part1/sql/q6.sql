SELECT
  WalkRequests.request_id,
  Dogs.name as dog_name,
  WalkRequests.requested_time,
  WalkRequests.duration_minutes,
  WalkRequests.location,
  Users.username as owner_username
FROM WalkRequests
JOIN Dogs
  ON WalkRequests.dog_id = Dogs.dog_id
JOIN Users
  ON Dogs.owner_id = Users.user_id
WHERE
  WalkRequests.status = 'open';



SELECT
  u.username AS walker_username,
  COUNT(DISTINCT wr.rating_id) AS total_ratings,
  AVG(wr.rating) AS average_rating,
  SUM(CASE WHEN wreq.status = 'completed' THEN 1 ELSE 0 END) AS completed_walks
FROM Users AS u
LEFT JOIN WalkRatings AS wr
  ON u.user_id = wr.walker_id
LEFT JOIN WalkApplications AS wa
  ON u.user_id = wa.walker_id
LEFT JOIN WalkRequests AS wreq
  ON wa.request_id = wreq.request_id
WHERE
  u.role = 'walker'
GROUP BY
  u.user_id,
  u.username
ORDER BY
  u.username;