const express = require('express');
const fs = require('fs');
const router = require('./routes/auth.js');
const { userRouter } = require('./routes/users.js');
require('dotenv').config();
const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', "http://localhost:3000"); // FLAG - MUST CHANGE ORIGIN TO FINAL ORIGIN WHEN HOSTED
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });

app.use(express.json())


app.get("/",(req,res)=>{
    return res.json({
        "x":"SUCCESFUL"
    })
})

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});
    


app.get('/private',(req,res)=>{
    return res.json({
        y:"HELLO"
    })
})


// protected routes
app.use("/auth",router);
app.use("/users",userRouter);











app.listen(process.env.PORT||5000,()=>{
    console.log(`Listening on port ${process.env.PORT||5000}`)
}) // server listens on port specified in env variables or port 5000 