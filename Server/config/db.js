const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    image: String,
    rating:{
        type:Number,
        default:0
    },
    reviews:{
        type:Number,
        default:0
    },
    downloads:{
        type:Number,
        default:0
    },
    pdf:{
        type:String,
        required:true
    }
})

const userSchema = new mongoose.Schema({
    username: String,
    lastName: String,
    email: String,
    mobileNumber:Number,
    password: String,
    isAdmin: {
        default:false,
        type: Boolean,
    }
})

const productModel = mongoose.model('Product', productSchema);
const userModel = mongoose.model('User', userSchema);;
module.exports = {
    connectDB,
    productModel,
    userModel
};