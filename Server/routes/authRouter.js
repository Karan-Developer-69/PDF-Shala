const express = require("express");
const { verifyUser, login, register } = require("../middleware/authMiddleware");


const router = express.Router();

router.post('/verify',verifyUser,(req,res)=>{
    res.status(200).send(req.user);
});

router.post("/register",register)
router.post("/login",login)

module.exports = router;