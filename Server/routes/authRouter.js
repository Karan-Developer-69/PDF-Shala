const express = require("express");
const { verifyUser } = require("../middleware/authMiddleware");
const router = express.Router();

// router.get('/verify',verifyUser,(req,res)=>{
//     res.status(200).send(req.userData);
// });

router.post("/register",(req,res)=>{
    console.log("Data :",req.body)
    res.status(200).send("Register sucessfull !")
})
router.post("/login",(req,res)=>{
    console.log("Data :",req.body)
    res.status(200).send("Login sucessfull !")
})

module.exports = router;