const mongoose =require('mongoose')
const reviewSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'User'
       },
    name:{
        type:String,
        required:false
    },
    rating:{
        type:Number,
        required:false,
        
    },
    comment:{
        type:String,
        required:false
    },
   
})

const productSchema = mongoose.Schema({
    user:{
     type:mongoose.Schema.Types.ObjectId,
     required:true,
     ref: 'User'
    },
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
        
    },
    brand:{
        type:String,
        required:true
    },
    
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:false,
        default: 0

    },
     numReviews:{
        type:Number,
        required:false,
        default:0
    }, 
    category:{
        type:String,
        required:true
    }, 
    price:{
        type:Number,
        required:true
    },
   
    
});
const Product = mongoose.model('Product',productSchema);
module.exports = Product