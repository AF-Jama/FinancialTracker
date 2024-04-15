const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const emailValidity = async (req,res,next)=>{
    const { email } = req.query; // returns email query
    try{
        await prisma.user.findUniqueOrThrow({
            where:{
                email:email,
            },
            
        })
    }catch(error){

    }

}