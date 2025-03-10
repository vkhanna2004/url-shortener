import { createClient } from 'redis';

const redisClient = createClient({
    socket:{
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    },
    password: process.env.REDIS_PASSWORD
});
 
redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis =async()=>{
    try{
        await redisClient.connect();
        console.log("Connected to Redis Cloud successfully !");
    }
    catch(error){
        console.error("Redis Connection Failed: ",error);
    }
};

export { redisClient, connectRedis };