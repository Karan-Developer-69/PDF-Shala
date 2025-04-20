
module.exports.verifyUser = (req,res,next) =>{
    if (true){
        req.userData = {
            name:"Karan",
            email:"karan@gmail.com",
        }
        next();
    } else {
        
    }
}