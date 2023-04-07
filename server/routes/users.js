const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const router = express.Router();

router.get('/email/validity', async (req,res)=>{
    const { email } = req.query; // returns email query

    try{
        await prisma.user.findUniqueOrThrow({
            where:{
                email:email
            }
        })

        return res.json({
            result:false 
        }) // returns false as email exists
    }catch(error){
        return res.json({
            result:true
        }) // returns true as email does not exist
    }
})

router.get('/username/validity', async (req,res)=>{
    const { username } = req.query; // returns username query
    console.log("HTT");

    try{
        await prisma.user.findUniqueOrThrow({
            where:{
                username:username
            }
        })

        return res.json({
            result:false 
        }) // returns false as email exists
    }catch(error){
        return res.json({
            result:true
        }) // returns true as email does not exist
    }
})





module.exports = {
    userRouter:router
}