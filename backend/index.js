require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');

const connection = require('./db');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Added by oliver, this route will actually work and call the DB. Will look at the `Users` table.
app.route('/api/user/:searchUserEmail')
    .get(function(req, res, next) {
    connection.query(
        "SELECT userId, email, bio FROM `Users` WHERE email = ?", req.params.searchUserEmail,
        function(error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );
});

app.post('/api/signIn', function(req, res){

    // line below to be replaced by sql query
    
    if(req.body.email === "blah" && req.body.password === "1234"){
        res.json({ status: "success" });
    } else {
        res.json({status: "failed"})
    }
  });

app.post('/api/register', function(req, res){

    // line below to be replaced by sql query

    if(req.body.email === "blah" && req.body.password === "1234"){
        res.json({ status: "success" });
    } else {
        res.json({status: "failed"})
    }
});

app.post('/api/post', function(req, res){

    // add SQL query that adds post to database

    if(req.body.email !== undefined && req.body.email !== ""){
        res.json({ status: "success" });
    } else {
        res.json({status: "failed"})
    }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});