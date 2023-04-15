const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();



const AccountDeletion = async (req,res)=>{
    console.log("HIT");
    const { accountId } = req.query; // destructures req query object
    console.log("SUCCESFUL");

    try{
        await prisma.account.delete({
            where:{
                accountId:`${accountId}`
            }
        })

        return res.json({
            message:`Succesfully deleted account ${accountId}`,
            statusCode:200
        })
    }catch(error){
        console.log(error);
        return res.json({
            message:"Cannot delete account",
            statusCode:400
        })
    }


}



module.exports = {
    AccountDeletion
}