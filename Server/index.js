// server.js
const express = require('express');
const cors = require('cors');// npm install uuid
const dotenv = require("dotenv")            // npm install dotenv
// Your other routers…
const authRouter = require('./routes/authRouter');
const pdfRouter  = require('./routes/PdfRouter');
const paymentRouter  = require('./routes/paymentRouter');

dotenv.config();                          

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND, // Allows all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/auth', authRouter);
app.use('/pdf', pdfRouter);
app.use('/payment', paymentRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
