// protected account logic endpoints
const express = require('express');
const { getAccounts } = require('../controllers/logic/getAccounts');
const { AccountDeletion } = require('../controllers/logic/delAccount');
const { addTransaction } = require('../controllers/logic/transaction');
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

router.post('/createAccount',async (req,res)=>{
    const { accountName,accountType,accountLimit } = req.body; // destructures req body object
    const { user_id,username,email } = req.token;

    console.log(req.token);

    try {
        await prisma.account.create({
            data:{
                accountName:accountName,
                accountType:accountType,
                balance:0,
                accountLimit:accountLimit,
                userId:user_id

            }
        })

        return res.json({
            message:"Succesfully created new account",
            statusCode:200
        })
    } catch (error) {
        return res.json({
            message:"Cannot create new account",
            statusCode:401
        })
    }
})


router.delete('/accountDel',AccountDeletion);

router.post('/createTransaction',addTransaction);





module.exports = {
    accountRouter:router
};