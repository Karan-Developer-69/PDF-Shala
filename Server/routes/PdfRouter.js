const express = require("express");
const router = express.Router();

router.get("/get-pdfs",(req,res)=>{
    console.log("debug: Request recived ")
    res.status(200).json([
        { id: 1, image: 'https://picsum.photos/id/1011/300/200', title: 'React in Depth PDF', price: '499', rating: 0, reviews: 0,  downloads: 0 },
        { id: 2, image: 'https://picsum.photos/id/1012/300/200', title: 'Advanced JavaScript Guide', price: '599', rating: 0, reviews: 0,  downloads: 0 },
        { id: 3, image: 'https://picsum.photos/id/1013/300/200', title: 'CSS Mastery E-book', price: '399', rating: 0, reviews: 0,  downloads: 0 },
        { id: 4, image: 'https://picsum.photos/id/1014/300/200', title: 'Full-Stack Bundle', price: '1299', rating: 0, reviews: 0,  downloads: 0 },
      ])
});


module.exports = router;
