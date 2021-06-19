const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const asyncHandler = require('express-async-handler')
const protect = require('../middlewares/authMiddleware')
const multer = require('multer');
const cors = require('cors');
const storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, 'backend/routes/images/');
  },
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});
const app = express();
app.use(express.json());
app.use(cors());
router.use(express.static('backend/routes/images/'));
app.use(express.static('backend/routes/images/'));
router.get('/',asyncHandler(async(req,res)=>{
    const products = await Product.find({})
    res.json(products)
}))
router.get('/:id',asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)

    res.json(product)
}))
router.delete('/:id',asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    product.remove();
    res.send('user deleted successufly')
    
   
}))
router.put('/:id',asyncHandler(async(req,res)=>{
    const product = await Product.findById(req.params.id)
    if(product){
        product.name = req.body.name || product.name,
        product.price = req.body.price || product.price
        product.category = req.body.category || product.category 
        product.brand = req.body.brand || product.brand
        product.user = req.body.user || product.user

       
        const productUpdated = await product.save()
        res.json({
          name:productUpdated.name,
          price:productUpdated.price,
          category:productUpdated.category,
          brand:productUpdated.brand,
          user:product.user

      })
      console.log('id :',req.params.id)
      console.log('product :',product)
      console.log('productUpdated :',producyUpdated)
  
    
      }else{
          res.status(404)
          throw new Error('user not found')
      }
    
   
}))
router.post('/addProduct',upload.single('image'),asyncHandler(async(req,res)=>{
    const {name,price,category,brand,user} = req.body
    const { file } = req;

   
    const product = await Product.create({
        name,price,category,brand,user,image: (file && file.filename) || null,

    })
    if(product){
        res.status(201).json({
            //_id: product._id,
            name:product.name,
            price:product.price,
            category:product.category,
            brand:product.brand,
            user:product.user,
            image:product.image

        })
    }else{
        res.status(400)
        throw new Error('invalid product data')
    }
   
}))

  


module.exports = router