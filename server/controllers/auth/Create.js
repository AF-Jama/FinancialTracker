// Account Creation controller
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { v4:uuidv4 } = require('uuid');

const prisma = new PrismaClient();
const SALTROUNDS = 10; // 100 salt rounds


const CreateAccount = async (req,res,next)=>{
    const { username,email,password } = req.body; // returns request payload
    try{
        console.log(username,email,password);
        const hash = bcrypt.hashSync(password,SALTROUNDS); // returns password hash

        const create = await prisma.user.create({
            data:{
                id:uuidv4(), // returns unique user uuid
                username:username,
                email:email,
                password:hash
            }
        }) 

        return res.json({
            message:"Succesful Created Account",
            statusCode:201
        })
    }catch(error){
        // triggered on try block exception
        console.log(error)
        return res.json({
            message:"Unable to create account",
            statusCode:400
        })
    }
}



module.exports = {CreateAccount};