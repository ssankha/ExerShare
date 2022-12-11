require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');

const connection = require('./db');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.route('/api/user/:searchUserEmail').get(function(req, res, next) {
    connection.query(
        "SELECT userId, email, bio FROM `Users` WHERE email = ?", req.params.searchUserEmail,
        function(error, results, fields) {
            if (error) throw error;
            res.json(results);
        }
    );
});

app.route('/api/signIn').post(function(req, res, next) {
    console.log(`\tUsername: ${req.body.email}\n\tPassword: ${req.body.password}`);
    connection.query(
        "SELECT * FROM `Users` WHERE email = ? AND password = ?", [req.body.email, req.body.password],
        function(error, results, fields) {
            if (error) throw error;
            else if (results.length > 0) {
                console.log("Logged in.");
                console.log(results);
                res.json({ "status": "success" });
            }
            else {
                console.log("Incorrect username or password.");
                res.json({ "status": "failure" });
            }
        }
    );
});

// app.post('/api/signIn', function(req, res){

//     // line below to be replaced by sql query
    
//     if(req.body.email === "blah" && req.body.password === "1234"){
//         res.json({ status: "success" });
//     } else {
//         res.json({status: "failed"})
//     }
//   });

app.post('/api/register', function(req, res){

    console.log(`\tUsername: ${req.body.email}\n\tPassword: ${req.body.password}`);
    connection.query(
        "INSERT INTO `Users` (email, password, bio, poundsDifference, numOfWorkouts, numOfGoalsCompleted) VALUES (?, ?)", [req.body.email, req.body.password, "[Put your bio here]", 0.0, 0, 0],
        function(error, results, fields) {
            if (error) {
                console.log("Error registering.");
                throw error;
            }
            else {
                console.log("Registered.");
                console.log(results);
                res.json({ "status": "success" });
            }
        }
    );
});

// TODO: later
app.post('/api/post', function(req, res){

    // add SQL query that adds post to database

    if(req.body.email !== undefined && req.body.email !== ""){
        res.json({ status: "success" });
    } else {
        res.json({status: "failed"})
    }
});

app.route('/api/getProfile').post(function(req, res, next) {
    res.json({status: "success", bio: "Example Bio", pounds: 3.2, numOfGoalsCompleted: 10});
});

app.route('/api/editProfile').post(function(req, res, next) {
    res.json({status: "success"});
});

app.route('/api/getGoals').post(function(req, res, next) {
    res.json({status: "success", goals: ["Complete 1 Workout", "Gain/Lose 1 Pounds", "Complete 5 Workouts", "Complete 10 Workouts", "Gain/Lose 2 Pounds"]});
});

app.route('/api/getMyPosts').post(function(req, res, next) {
    res.json({status: "success", posts: [{title: "Post 1", author: "test@test.com", content: "content", likeCount: 2}, {title: "Post 2", author: "test@test.com", content: "content", likeCount: 6}, {title: "Post 3", author: "test@test.com", content: "content", likeCount: 13}]});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});