const express = require("express");
const { productModel } = require("../config/db");
const router = express.Router();
const path = require('path');
const fs = require('fs');

const multer  = require('multer');
const { console } = require("inspector");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // you can separate dest based on file.mimetype if you want separate folders
      cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
      // use timestamp + original name to avoid collisions
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, '_');
      cb(null, `${name}-${Date.now()}${ext}`);
    }
  });

const fileFilter = (req, file, cb) => {
    if (file.fieldname === 'pdf' && file.mimetype === 'application/pdf') {
      cb(null, true);
    } else if (file.fieldname === 'image' && file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
};
const upload = multer({ storage, fileFilter });
router.get("/get-pdfs",async(req,res)=>{
    const products = await productModel.find();
    res.status(200).json(products);
});



const cpUpload = upload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 }
  ]);

router.post('/add-products', cpUpload, async (req, res) => {
  try {
    // Multer puts files in req.files
    const pdfFile = req.files.pdf?.[0];
    const imageFile = req.files.image?.[0];

    if (!pdfFile || !imageFile) {
      return res.status(400).json({ message: 'Both PDF and image are required.' });
    }

    const { title, price } = req.body;

    // 4. Persist to database
    const product = await productModel.create({
      title,
      price: parseFloat(price),
      pdf: pdfFile.filename,
      image: imageFile.filename
    });

    return res.status(201).json({
      message: 'Product added successfully',
      product
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/remove-product/:id', async (req,res)=>{
  const productId = req.params.id;
  const deletedProduct = await productModel.findByIdAndDelete(productId);
  const imagePath =  `${path.join(__dirname,"../uploads")}/${deletedProduct.image}`;
  const pdfPath =  `${path.join(__dirname,"../uploads")}/${deletedProduct.pdf}`;

  fs.rm(imagePath,(err)=>{
    if(err){
      console.log("Error: ",err.message);
    }
    console.log("Image Deleted...")
  })
  fs.rm(pdfPath,(err)=>{
    if(err){
      console.log("Error: ",err.message);
    }
    console.log("Pdf Deleted...")
  })
  res.status(200).send(`Product removed sucessfully..`);
})

router.put('/update-product/:id',cpUpload,async (req,res)=>{
  const pdfFile = req.files.pdf?.[0];
  const imageFile = req.files.image?.[0];
  const _id = req.params.id;
  const product = await productModel.findById(_id);
  const image = imageFile !== undefined ? imageFile.filename : product.image;
  const pdf = pdfFile !== undefined ? pdfFile.filename : product.pdf;
  try {
    const {title,price} = req.body;
    const editedProduct = await productModel.findByIdAndUpdate(_id,{
      title,
      price,
      image,
      pdf
    });
    const defaultPath =  `${path.join(__dirname,"../uploads")}`;
    if(image){
      
      const imagePath =  `${defaultPath}/${product.image}`;
      fs.unlink(imagePath,(err)=>{
        if(err){
          console.log("Error: ",err.message);
        }
      })
    }
    
      if(pdf){
        const pdfPath =  `${defaultPath}/${product.pdf}`;
        fs.unlink(pdfPath,(err)=>{
          if(err){
            console.log("Error: ",err.message);
          }
        })
      }
    await editedProduct.save()
    
    res.status(200).send(editedProduct);
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
