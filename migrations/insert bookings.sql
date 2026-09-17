INSERT INTO users (first_name, last_name, email)
VALUES ('ABj','DEF','ABjDEF@GMAIL.COM');

INSERT INTO desks (name,floor)
VALUES ('A1', 0);
INSERT INTO bookings (user_id, desk_id, booking_date)
VALUES (3, 1, '2026-02-17');

INSERT INTO bookings (user_id, desk_id, booking_date)
VALUES (2, 1, '2026-02-17');
select * from users;
select * from bookings;

