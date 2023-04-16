const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



const addTransaction = async (req,res)=>{
    console.log("HIT");
    const { user_id,username,email } = req.token; // destrucuring req token object
    const { amount,transactionType,accountTo,accountFrom,newBalance,accountLimit,description} = req.body;

    // console.log(req.body);
    
    try{
        if(transactionType === "Deposit"){
            return await prisma.$transaction(async (tx)=>{
                const updatedAccount = await tx.account.update({
                    data:{
                        balance:newBalance,
                    },
                    where:{
                        accountId:accountFrom
                    }
                })
        
                if(updatedAccount.balance>updatedAccount) throw new Error("Deposit transaction exceeds account limit");
                
                const addedTransaction = await tx.transactions.create({
                    data:{
                        transactionType:'Deposit',
                        transactionAmount:parseFloat(amount),
                        accountTo:null,
                        description:description||null,
                        accountId:accountFrom,                      
                    },
                })
        
        
                return res.json({
                    message:"Succesful Deposit transaction",
                    statusCode:200
                })
            })
        }
            
        if(transactionType === "Withdrawal"){
            return await prisma.$transaction(async (tx)=>{
                const updatedAccount = await tx.account.update({
                    data:{
                        balance:newBalance,
                    },
                    where:{
                        accountId:accountFrom
                    }
                })
        
                if(updatedAccount.balance<0) throw new Error("Withdrawal balance cannot go below 0");
                
                const addedTransaction = await tx.transactions.create({
                    data:{
                        transactionType:'Withdrawal',
                        transactionAmount:parseFloat(amount),
                        accountTo:null,
                        description:description||null,
                        accountId:accountFrom,                      
                    },
                })
        
        
                return res.json({
                    message:"Succesful Deposit transaction",
                    statusCode:200
                })
            })
        }

        if(transactionType === "Transfer"){
            return await prisma.$transaction(async (tx)=>{
                const updatedAccountFrom = await tx.account.update({
                    data:{
                        balance:newBalance,
                    },
                    where:{
                        accountId:accountFrom
                    }
                })
        
                if(updatedAccount.balance<0) throw new Error("Withdrawal balance cannot go below 0");
                
                const addedTransaction = await tx.transactions.create({
                    data:{
                        transactionType:'Withdrawal',
                        transactionAmount:parseFloat(amount),
                        accountTo:null,
                        description:description||null,
                        accountId:accountFrom,                      
                    },
                })
        
        
                return res.json({
                    message:"Succesful Deposit transaction",
                    statusCode:200
                })
            })
        }
        }
    }catch(error){
        return res.json({
            message:"Cannot carry out transaction",
            statusCode:401
        })
    }

}



module.exports = {
    addTransaction
}