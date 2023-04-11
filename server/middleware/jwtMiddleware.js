const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const jwtMiddleware = (req,res,next)=>{
    // jwt middleware triggered on protected routes that require 0auth
    const secret = process.env.TOKEN_SECRET // returns jwt secret
    try{
        let token = req.headers.authorization; // returns jwt token in authorisation header
        console.log(token);
        if(!token) throw new Error('Endpoint requires access token to be exposed');
        token = token.split('Bearer '); // returns array split version of access token string
        token = token[1]; // returns raw jwt access token
        
        jwt.verify(token,secret,(error,decoded)=>{
            if(error) throw new Error("Access token is not valid");

            req.token = decoded; // chains token property to request object

            console.log("HERE");

            next();
        })
    }catch(error){
        return res.json({
            statusCode:401,
            message:error.message
        })
    }
}



module.exports = {
    jwtMiddleware   
};