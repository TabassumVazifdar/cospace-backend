ALTER TABLE bookings 
DROP FOREIGN KEY bookings_ibfk_3;

DROP INDEX unique_desk_booking on bookings;

ALTER TABLE bookings
ADD CONSTRAINT bookings_ibfk_3
FOREIGN KEY (desk_id) references desks(id)
ON DELETE CASCADE;
