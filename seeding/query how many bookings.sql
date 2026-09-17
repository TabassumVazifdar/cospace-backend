SELECT 
CONCAT(
 first_name, " ",
last_name) AS full_name,
t.name,
COUNT(b.id) AS total_bookings
from users as u
LEFT JOIN teams as t
ON u.team_id = t.id
LEFT JOIN bookings as b
ON u.id = b.user_id
#LEFT JOIN desks as d
#ON b.desk_id = d.id
GROUP BY  u.id, u.first_name, u.last_name, t.name;


UPDATE users
SET team_id = 3
WHERE first_name = "Lewis";

select * from users;


DELETE FROM desks
WHERE id = 3;




