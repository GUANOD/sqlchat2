const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat",
});

connection.connect((err: Error) => {
  if (err) throw err;
  console.log("db connected");
});

export default connection;
