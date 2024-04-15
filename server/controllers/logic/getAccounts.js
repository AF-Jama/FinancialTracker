const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAccounts = async (req,res)=>{
    // get accounts logic
    const { user_id,username,email } = req.token; // destrucuring req token object 
    // console.log(id);
    try{
        let accounts = await prisma.account.findMany({
            where:{
                userId:user_id
            }
        })

        return res.json({
            statusCode:200,
            message:"Succesful",
            accounts
        })
        
    }catch(error){
        return res.json({
            statusCode:404,
            message:"No Accounts Found"
        })
    }
}



module.exports = {
    getAccounts
};