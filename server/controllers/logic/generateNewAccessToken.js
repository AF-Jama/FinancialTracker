const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


const genNewAccessToken = (req,res)=>{
    // triggered to generate new access token when current token expires, refresh token must exist and must be valid
    
}