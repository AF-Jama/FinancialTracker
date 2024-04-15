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
        userId:"3d91e03d-8229-489a-9004-1d03efb99840"
    },
    {
        accountType:'Business',
        accountLimit:250000,
        accountId:uuidv4(), // accountId universal unique id
        balance:1100.40,
        userId:"7b2307e1-967e-44d8-abf9-fde5f7efc721"
    },
    {
        accountType:'Corporate',
        accountLimit:2000000,
        accountId:uuidv4(), // accountId universal unique id
        balance:946.12,
        userId:"8864b838-d2d7-4331-87cc-c3cf78974ad7"
    },
    {
        accountType:'Corporate',
        accountLimit:2000000,
        accountId:uuidv4(), // accountId universal unique id
        balance:234.72,
        userId:"bc60f1bb-2aad-4337-b19c-fd328b2c7816"
    }
]

let transaction = [
    {
        transactionId:uuidv4(),
        transactionType:"Withdrawal",
        transactionAmount:24.37,
        description:"Withdrawing funds for shopping",
        accountTo:null,
        accountId:"dd1f0c63-1419-4f61-9818-352cc9ff97dd"

    },
    {
        transactionId:uuidv4(),
        transactionType:"Withdrawal",
        transactionAmount:24.37,
        description:"Withdrawing funds for company lunch",
        accountTo:null,
        accountId:"670692e9-49c0-4aa8-ae91-7035826d15df"
    },
    {
        transactionId:uuidv4(),
        transactionType:"Deposit",
        transactionAmount:276.47,
        description:"Depositing paycheck",
        accountTo:null,
        accountId:"601eefb4-4c14-4a2c-b9d8-d9e6c2f82364"
    },
    {
        transactionId:uuidv4(),
        transactionType:"Transfer",
        transactionAmount:44.56,
        description:"Transfer",
        accountTo:"45d836ca-c422-4c9d-b94b-28f189604bfe",
        accountId:"dd1f0c63-1419-4f61-9818-352cc9ff97dd"
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

const oneAccountSeed = async ()=>{
    await prisma.account.create({
        data:{
            accountType:'Corporate',
            accountLimit:2000000,
            accountId:uuidv4(), // accountId universal unique id
            balance:1000000,
            userId:"8864b838-d2d7-4331-87cc-c3cf78974ad7"
        }
    })
}

// usersSeed();
// accountsSeed();
// transactionsSeed();
oneAccountSeed();