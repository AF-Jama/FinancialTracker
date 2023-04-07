const { PrismaClient, TransactionType } = require('@prisma/client');
const { v4:uuidv4 } = require('uuid');

const prisma = new PrismaClient();

let users = [
    // user seed 
    {
        email:"Janemanning@gmail.com",
        password:"$2b$10$yf/fmsjqxeYLQvoACtI7.u0DRhx/WfXllCDe2klJTJ3gmDz0h.63G",
        username:"JamesManning01",
        email_Verified:false,
    },
    {
        email:"Karlmanning@gmail.com",
        password:"$2b$10$yf/fmsjqxeYLQvoACtI7.u0DRhx/WfXllCDe2klJTJ3gmDz0h.63G",
        username:"KarlManning01",
        email_Verified:false,
    },
    {
        email:"Paulmanning@gmail.com",
        password:"$2b$10$yf/fmsjqxeYLQvoACtI7.u0DRhx/WfXllCDe2klJTJ3gmDz0h.63G",
        username:"PaulManning01",
        email_Verified:false,
    },
    {
        email:"Timmanning@gmail.com",
        password:"$2b$10$yf/fmsjqxeYLQvoACtI7.u0DRhx/WfXllCDe2klJTJ3gmDz0h.63G",
        username:"TimManning01",
        email_Verified:false,
    }
]

let accounts = [
    {
        accountType:'Business',
        accountLimit:250000,
        accountId:uuidv4(), // accountId universal unique id
        userId:"21a97d20-aa41-47f5-b1a5-90717308462b"
    },
    {
        accountType:'Business',
        accountLimit:250000,
        accountId:uuidv4(), // accountId universal unique id
        balance:1100.40,
        userId:"4dfe120a-9b96-47da-a33d-e507f9d3bcbd"
    },
    {
        accountType:'Corporate',
        accountLimit:2000000,
        accountId:uuidv4(), // accountId universal unique id
        balance:946.12,
        userId:"8aaf365d-e957-4a1b-9521-e5bdd07fd28c"
    },
    {
        accountType:'Corporate',
        accountLimit:2000000,
        accountId:uuidv4(), // accountId universal unique id
        balance:234.72,
        userId:"fe04a16f-e945-4e5b-90a7-f0d9e60e3c3a"
    }
]

let transaction = [
    {
        transactionId:uuidv4(),
        transactionType:"Withdrawal",
        transactionAmount:24.37,
        description:"Withdrawing funds for shopping",
        accountTo:null,
        accountId:"0bb092b4-3a6d-4f53-8318-3830abaf18c3"

    },
    {
        transactionId:uuidv4(),
        transactionType:"Withdrawal",
        transactionAmount:24.37,
        description:"Withdrawing funds for company lunch",
        accountTo:null,
        accountId:"3899ad54-3e21-43c1-8542-85ee8509adc1"
    },
    {
        transactionId:uuidv4(),
        transactionType:"Deposit",
        transactionAmount:276.47,
        description:"Depositing paycheck",
        accountTo:null,
        accountId:"334201f1-d233-4e92-a6c9-461014f01a00"
    },
    {
        transactionId:uuidv4(),
        transactionType:"Transfer",
        transactionAmount:44.56,
        description:"Transfer",
        accountTo:"334201f1-d233-4e92-a6c9-461014f01a00",
        accountId:"0bb092b4-3a6d-4f53-8318-3830abaf18c3"
    }
]


const seeding = async ()=>{
    try{
        // let res = await prisma.user.create({
        //     data:{
        //         email:"joemanning@gmail.com",
        //         password:"$2b$10$yf/fmsjqxeYLQvoACtI7.u0DRhx/WfXllCDe2klJTJ3gmDz0h.63G",
        //         email_Verified:false,
        //     }
        // });

        let res = await prisma.account.create({
            data:{
                accountType:'Basic',
                accountLimit:20000,
                accountId:uuidv4(), // accountId universal unique id
                userId:2
            }
        })
    
        console.log(res);

    }catch(error){
        console.log(error);
    }
}

// seeding();

const usersSeed = async ()=>{
    await prisma.user.createMany({
        data:users
    })
    .then(res=>console.log(res))
    .catch(error=>console.log(error))
}

const accountsSeed = async ()=>{
    await prisma.account.createMany({
        data:accounts
    })
    .then(res=>console.log(res))
    .catch(error=>console.log(error))
}

const transactionsSeed = async ()=>{
    await prisma.transactions.createMany({
        data:transaction
    })
    .then(res=>console.log(res))
    .catch(error=>console.log(error))
}

// usersSeed();
// accountsSeed();
transactionsSeed();