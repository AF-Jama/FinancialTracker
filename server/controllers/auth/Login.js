// login controller
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { v4:uuidv4 } = require('uuid');

const prisma = new PrismaClient();


const Login = async (req,res,next)=>{
    const { email,password } = req.body; // returns request payload
    const jwtSecret = process.env.TOKEN_SECRET; // returns jwt secret to sign access and refresh token
    try{

        const user = await prisma.user.findUniqueOrThrow({
            where:{
                email:email
            }
        }) // returns unique user

        const passwordHash = user.password; // return user password hash

        const compareBool = await bcrypt.compare(password,passwordHash); // returns password hash compare promise value (bool)

        if(!compareBool){
            throw new Error;
        }

        // creation access token and refresh token, used to generate new access token on event of access token expiration
        const payload = {
            user_id:user.id,
            username:user.username,
            email:user.email,
            type:"access_token"
        }

        const refreshTokenPayload = {
            username:user.username,
            type:"refresh_token"
        }

        const accessToken = jwt.sign(refreshTokenPayload,jwtSecret,{
            expiresIn:"24hrs"
        }); // creation of access token which expires in 24hrs

        const refreshToken = jwt.sign(payload,jwtSecret,{
            expiresIn:"7days"
        }); // creation of refresh token which expires in 7 days

        return res.json({
            message:"Succesful Login",
            statusCode:201,
            access_token:accessToken, // access token
            refresh_token:refreshToken // refresh token
        })

    }catch(error){
        // triggered if try block exception
        return res.json({
            message:"Cannot Login",
            statusCode:401
        })
    }
}




module.exports = {Login};