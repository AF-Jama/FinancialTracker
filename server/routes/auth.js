const express = require('express');
const { Login } = require("../controllers/auth/Login");
const { CreateAccount } = require('../controllers/auth/Create');
const { jwtMiddleware } = require('../middleware/jwtMiddleware');


const router = express.Router();

router.get("/",(req,res)=>{
    return res.json({
        "x":"auth"
    })
})

router.post("/signup",CreateAccount);

router.post("/login",Login);

// router.post('/genNewAccessToken',);




module.exports = {
    authRouter:router
};