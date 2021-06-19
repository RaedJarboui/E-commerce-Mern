const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const colors = require('colors')
const productRouter = require('./routes/products')
const userRouter = require('./routes/users')

dotenv.config()
connectDB()
const app = express();
app.use(express.json())
//router.use(express.static('backend/routes/images/'));
app.use(express.static('backend/routes/images/'));
app.get('/',(req,res)=>{
    res.send('api is running')
})
app.use('/api/products',productRouter)
app.use('/api/users',userRouter)


const Port = process.env.PORT || 5000
app.listen(Port,console.log('server running on port 5000'.yellow.bold));