INSERT INTO teams (name, department)
VALUES 
('Art', 'Creative'),
('Videography', 'Creative'),
('Photography', 'Creative');

INSERT INTO rooms (name, floor, capacity)
VALUES
('Melbourne', 2, 10),
('Manchester', 3, 15),
('Adelaide', 1, 30);

INSERT INTO desks (name, floor)
VALUES
('G1', 0),
('F11', 1),
('S8', 2),
('T7', 3);


INSERT INTO users (first_name, last_name, email, team_id)
VALUES
  ('Lewis', 'Smith', 'ls@gmail.com', 1),
  ('Maz', 'Russel', 'mr@gmail.com', 2),
  ('Tina', 'Brook', 'tb@gmail.com', 3),
  ('Oscar', 'Woakes', 'ow@gmail.com', 1),
  ('Percy', 'Wood', 'pw@gmail.com', 2),
  ('Betty', 'Ecclestone', 'be@gmail.com', 3),
  ('Lily', 'Wong', 'lw@gmail.com', 1),
  ('Adam', 'Ahmed', 'aa@gmail.com', 2);



INSERT INTO bookings (user_id, desk_id, booking_date)
VALUES
  (1, 1, '2025-09-18'),
  (2, 2, '2025-09-18'),
  (3, 3, '2025-09-18'),
  (4, 1, '2025-09-19'),
  (5, 4, '2025-09-19'),
  (7, 2, '2025-09-20');

