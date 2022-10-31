const express = require("express");
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});