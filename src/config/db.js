const mongodb=require("mongoose")

async function connectDb(){
    try{
        console.log(process.env.DB_STRING)
        const connect = await mongodb.connect(process.env.DB_STRING);
        console.log("connection", connect.connection.host);
    }catch(err){
         console.log(err.message)
            process.exit(1);
       
    }
}

module.exports = connectDb;