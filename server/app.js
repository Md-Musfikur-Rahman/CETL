const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "macTest",
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello ");
});

app.get("/get", (req, res) => {
  const sqlGet = "SELECT * FROM intern";
  db.query(sqlGet, (err, result) => {
    console.log("error", err);
    res.send(result);
  });
});

app.post("/create", (req, res) => {
  const sqlCreate = "INSERT INTO intern (name, email, address) VALUES(?)";
  const values = [req.body.name, req.body.email, req.body.address];
  db.query(sqlCreate, [values], (err, restult) => {
    if (err) {
      return res.send("Error");
    }
    return res.send(restult);
  });
});

app.put("/update/:id", (req, res) => {
  const sqlUpdate =
    "UPDATE intern SET `name`= ?,`email`= ? ,`address`= ? WHERE `id`= ?";
  const values = [req.body.name, req.body.email, req.body.address];
  const id = req.params.id;
  db.query(sqlUpdate, [...values, id], (err, restult) => {
    if (err) {
      return res.send("Error");
    }
    return res.send(restult);
  });
});

app.delete("/delete/:id", (req, res) => {
  const sqlDelete = "DELETE FROM intern WHERE `id`= ?";

  const id = req.params.id;
  db.query(sqlDelete, [id], (err, restult) => {
    if (err) {
      return res.send("Error");
    }
    return res.send(restult);
  });
});

app.listen(5555, () => {
  console.log("Server is running");
});
