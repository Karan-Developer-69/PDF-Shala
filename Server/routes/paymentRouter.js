const express = require("express");
const router = express.Router();
const { randomBytes, createHash } = require('node:crypto');
const { Cashfree } = require('cashfree-pg');

const cashfree = new Cashfree(
    Cashfree.SANDBOX,
    process.env.CASHFREE_APP_ID,
    process.env.CASHFREE_SECRET_KEY 
  );

async function generateOrderId() {
    const uniqueID = randomBytes(16).toString('hex');
    const hash = createHash('sha256').update(uniqueID).digest('hex');
    return hash.substring(0, 20);
}

router.post('/checkout', async (req, res) => {
    const {amount,user} = req.body;
    console.log("User checkout:",user,"amount:",amount)
    try {
      const request = {
        order_amount: amount,
        order_currency: "INR",
        order_id: await generateOrderId(),
        customer_details: {
          customer_id: "CUST_123456789",
          customer_email:user.email,
          customer_phone: user.mobileNumber,
          customer_name: user.username
        }
      };
  
      const { data } = await cashfree.PGCreateOrder(request);
      // Respond with order_id & session_id
      res.json({
        success: true,
        order_id: data.order_id,
        payment_session_id: data.payment_session_id
      });
    } catch (err) {
      console.error('Order creation error:', err);
      res.status(500).json({
        success: false,
        error: err.message || 'Failed to create order'
      });
    }
  });

router.post('/verify', async (req, res) => {
    try {
      const { order_id } = req.body;
      if (!order_id) {
        return res.status(400).json({ success: false, error: 'Missing order_id' });
      }
  
      // Fetch order details
      const { data: order } = await cashfree.PGFetchOrder(order_id);
  
      res.json({ success: true, order });
    } catch (err) {
      console.error('Payment verification error:', err);
      res.status(500).json({
        success: false,
        error: err.response?.data || err.message || 'Verification failed'
      });
    }
});

module.exports = router;