const dotenv = require('dotenv')
const connectDB = require('./config/db')
const mongoose =require('mongoose')
const products = require('./data/products')
const users = require('./data/users')
const Product = require('./models/Product')
const User = require('./models/User')
const Order = require('./models/Order')
dotenv.config()
connectDB()
const importData = async() =>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users);
        const adminUser = createdUser[0]._id
        const sampleProduct = products.map(p=>{
            return {...p,user:adminUser}
        })
        await Product.insertMany(sampleProduct);
        console.log('data imported'.green.inverse)

    }catch(error){
        console.log(error)

    }

}
const destroyData = async() =>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

       
        console.log('data destoyed'.green.inverse)

    }catch(error){
        console.log(error)

    }
}
if(process.argv[2]==='d'){
    destroyData();
}else{
    importData();
}