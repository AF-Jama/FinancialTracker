const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { createClient } = require('redis');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const { jwtMiddleware } = require('./middleware/jwtMiddleware');
const { authRouter } = require('./routes/auth.js');
const { userRouter } = require('./routes/users.js');
const { accountRouter } = require('./routes/account.js');
require('dotenv').config();

const prisma = new PrismaClient();
// const client = new createClient(); // creating redis client

// client.on()

const app = express();

https
  .createServer(
		// Provide the private and public key to the server by reading each
		// file's content with the readFileSync() method.
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Origin', "http://localhost:3000"); // FLAG - MUST CHANGE ORIGIN TO FINAL ORIGIN WHEN HOSTED
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
//     next();
//   });

if (process.env.SERVER_NODE_ENV === "Production"){
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}

app.use(cors());

app.use(express.json())


app.get("/financial",(req,res)=>{
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

// app.get('/getuser', async (req,res)=>{
//     let res = await prisma
// })


// protected routes
app.use("/auth",authRouter);
app.use("/users",userRouter);
app.use('/account',jwtMiddleware,accountRouter); // protected routes











app.listen(process.env.PORT1||5000,()=>{
    console.log(`Listening on port ${process.env.PORT1||5000}`)
}) // server listens on port specified in env variables or port 5000 