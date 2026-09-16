USE cospace;
CREATE TABLE teams(
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  department VARCHAR(100)
);

CREATE TABLE users(
  id            INT PRIMARY KEY AUTO_INCREMENT,
  first_name          VARCHAR(100) NOT NULL,
  last_name          VARCHAR(100) NOT NULL,
  email        VARCHAR(100) NOT NULL,
  team_id INT,
  FOREIGN KEY (team_id) REFERENCES teams(id ) ON DELETE SET NULL
);

CREATE TABLE rooms(
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  floor INT,
  capacity INT
);

CREATE TABLE desks(
  id   INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  floor INT
);

CREATE TABLE bookings(
  id   INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  desk_id INT NOT NULL,
  room_id INT NOT NULL,
  booking_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (desk_id) REFERENCES desks(id) ON DELETE CASCADE
);

#deleting user should remove bookings