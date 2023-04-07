const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



const getAllAccountTransactions = async (req,res)=>{
    const { accountId } = req.query; // returns accountId from query object
    try{
        let transactions = await prisma.transactions.findMany({
            where:{
                accountId:accountId
            }
        }) // returns all transactions based on accountId foreign key

        return res.json({
            results:transactions,
            statusCode:200,
            message:"Succesful Response"
        })
    }catch(error){
        return res.json({
            statusCode:400,
            message:"UnSuccesful Response",
            statusCode:300
        })
    }
}



export default getAllAccountTransactions;