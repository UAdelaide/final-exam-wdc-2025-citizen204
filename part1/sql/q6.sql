SELECT
  WalkRequests.request_id,
  Dogs.name,
  WalkRequests.requested_time,
  WalkRequests.duration_minutes,
  WalkRequests.location,
  Users.username
FROM WalkRequests
JOIN Dogs
  ON WalkRequests.dog_id = Dogs.dog_id
JOIN Users
  ON Dogs.owner_id = Users.user_id
WHERE
  WalkRequests.status = 'open';
