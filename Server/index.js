const dotenv = require("dotenv")   
dotenv.config();                          

const express = require('express');
const cors = require('cors');
const path = require('path');
const authRouter = require('./routes/authRouter');
const pdfRouter  = require('./routes/PdfRouter');

const {connectDB} = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const paymentRouter  = require('./routes/paymentRouter');

app.use('/auth', authRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/pdf', pdfRouter);
app.use('/payment', paymentRouter);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
connectDB();
