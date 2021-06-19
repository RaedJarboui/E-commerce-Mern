const mongoose = require('mongoose')
const colors = require('colors')
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.Mongo_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`MongoDB Connected : ${conn.connection.host}`.cyan.underline)
    }catch(error){
        console.log(`Error:${error.message}`.red.underline.bold)
        process.exit(1)
    }
}
module.exports = connectDB