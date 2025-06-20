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
