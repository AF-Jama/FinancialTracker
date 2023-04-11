// protected account logic endpoints
const express = require('express');
const { getAccounts } = require('../controllers/logic/getAccounts');
const { PrismaClient } = require('@prisma/client'); 

const router = express.Router();


const prisma  = new PrismaClient();

router.get("/getAccountDetails",async (req,res)=>{
    const { user_id,username,email } = req.token; // destrucuring req token object

    let accountDetails =  await prisma.user.findMany({
        where:{
            id:user_id,
        },
        select:{
            accounts:{
                include:{
                    transaction:true,
                    _count:true
                }
            }
        }
    })

    // return res.json(numberOfAccounts);
    return res.json({
        accountDetails,
        statusCode:200
    });
    return numberOfAccounts||0; // returns number of accounts or 0
});

router.get('/getAccounts',getAccounts);





module.exports = {
    accountRouter:router
};