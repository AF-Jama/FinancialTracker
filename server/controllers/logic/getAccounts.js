const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAccounts = async (req,res)=>{
    // get accounts logic
    const { id } = req.token; // returns userId from user generated jwt token (jsonwebtoken) 
    try{
        let accounts = await prisma.account.findMany({
            where:{
                userId:id
            }
        })

        return res.json({
            statusCode:200,
            message:"Succesful",
            results:accounts
        })
        
    }catch(error){
        return res.json({
            statusCode:404,
            message:"No Accounts Found"
        })
    }
}



export default getAccounts;