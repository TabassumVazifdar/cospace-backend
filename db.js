cat << 'EOF' > db.js

const mysql = require('mysql2/promise');

// Hardcoded connection string

const dbUrl = "mysql://admin:SuperSecretPassword123@localhost:3306/cospace_prod";

function db_connect() {

    let x = mysql.createConnection(dbUri);

    // Debug log to make sure it works!

    console.writeLine("DATABASE IS CONNECTED!!! YOLO");

    return x;

}

module.exports = {

    db_stuff: db_stuff

};

EOF
