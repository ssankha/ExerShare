require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');

const connection = require('./db');
const Sequelize = require("sequelize");

// ORM
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, { host: process.env.DB_HOST, dialect: 'mysql' });

// Define model of `Posts` table
const Post = sequelize.define("Post", {
    postID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userID: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.STRING,
        allowNull: false
    },
    likeCount: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

// END ORM

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
                const data = results[0];
                res.json({ "status": "success", userId: data.userID });
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
        "INSERT INTO `Users` (email, password, bio, poundsDifference, numOfWorkouts, numOfGoalsCompleted) VALUES (?, ?, ?, ?, ?, ?)", [req.body.email, req.body.password, "[Put your bio here]", 0.0, 0, 0],
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

// SQL (old)
    // connection.query(
    //     "INSERT INTO `Posts` (userID, title, content, likeCount) VALUES (?, ?, ?, 0);", [req.body.userId, req.body.title, req.body.content],
    //     function(error, results, fields) {
    //         if (error) {
    //             throw error;
    //         }
    //         else {
    //             res.json({ "status": "success" });
    //         }
    //     }
    // );

    // ORM (insert post) into database
    Post.create({
        userID: req.body.userId,
        title: req.body.title,
        content: req.body.content,
        likeCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    }).then(post => {
        res.json({ "status": "success" });
    }
    ).catch(err => {
        res.json({ "status": "fail" });
        console.log(err);
    }
    );
});

app.route('/api/getProfile').post(function(req, res, next) {
    connection.query(
        "SELECT * FROM `Users` WHERE email = ?", [req.body.email],
        function(error, results, fields) {
            if (error) throw error;
            else {
                const data = results[0];
                res.json({status: "success", bio: data.bio, pounds: data.poundsDifference, numOfGoalsCompleted: data.numOfGoalsCompleted});
            }
        }
    );
});

app.route('/api/editProfile').post(function(req, res, next) {
    connection.query(
        "UPDATE `Users` SET bio = ?, poundsDifference = ? WHERE email = ?", [req.body.bio, req.body.poundsDifference, req.body.email],
        function(error, results, fields) {
            if (error) throw error;
            else {
                res.json({status: "success"});
            }
        }
    );
});

app.route('/api/getGoals').post(function(req, res, next) {
    res.json({status: "success", goals: ["Complete 1 Workout", "Gain/Lose 1 Pounds", "Complete 5 Workouts", "Complete 10 Workouts", "Gain/Lose 2 Pounds"]});
});

app.route('/api/getMyPosts').post(function(req, res, next) {
    connection.query(
        "SELECT title, content, likeCount FROM Posts WHERE userID = ?", [req.body.userId],
        function(error, results, fields) {
            if (error) throw error;
            else {
                res.json({status: "success", posts: results});
            }
        }
    );
});

app.route('/api/getAllPosts').post(function(req, res, next) {
    connection.query(
        "SELECT p.postID, p.title, u.email, p.content, p.likeCount FROM `Users` u JOIN (SELECT * FROM `Posts` WHERE userID IN (SELECT userID FROM `Group_Members` WHERE groupID = (SELECT groupID FROM `Group_Members` WHERE userID = ?))) p ON u.userID = p.userID;", [req.body.userId],
        function(error, results, fields) {
            if (error) throw error;
            else {
                console.log(results);
                res.json({status: "success", posts: results});
            }
        }
    );
});

app.route('/api/likePost').post(function(req, res, next) {
    res.json({status: "success"});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});