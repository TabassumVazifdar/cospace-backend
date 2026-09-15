%% flowchart TD
%%     A[Need room booking] -->|View available| B(Go shopping)
%%     B --> C{Let me think}
%%     C -->|One| D[Laptop]
%%     C -->|Two| E[iPhone]
%%     C -->|Three| F[fa:fa-car Car]
  
  erDiagram
    TEAMS {
        int TeamID PK
        string TeamName
        string Department
    }

    COLLEAGUES {
        int ColleagueID PK
        string EmployeeName
        string EmployeeEmail
        int TeamID FK
    }

    DESKS {
        int DeskID PK
        string DeskLabel
        string LocationFloor
    }

    ROOMS {
        int RoomID PK
        string RoomName
        int Capacity
    }

    DESK_BOOKINGS {
        int DeskBookingID PK
        int ColleagueID FK
        int DeskID FK
        date BookingDate
    }

    ROOM_BOOKINGS {
        int RoomBookingID PK
        int ColleagueID FK
        int RoomID FK
        date BookingDate
        time StartTime
        time EndTime
    }

    TEAMS ||--o{ COLLEAGUES : "belongs to"
    COLLEAGUES ||--o{ DESK_BOOKINGS : "makes"
    DESKS ||--o{ DESK_BOOKINGS : "receives"
    COLLEAGUES ||--o{ ROOM_BOOKINGS : "books"
    ROOMS ||--o{ ROOM_BOOKINGS : "is booked"


    AI conflict: 
    I split up meeting room and bookings into 2 seperte tables so it was easier to mange without having to think about null options.