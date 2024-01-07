import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
import { calcPrices } from '../utils/calcPrices.js';
import { verifyPayPalPayment, checkIfNewTransaction } from '../utils/paypal.js';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY
);

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  } else {
    // NOTE: here we must assume that the prices from our client are incorrect.
    // We must only trust the price of the item as it exists in
    // our DB. This prevents a user paying whatever they want by hacking our client
    // side code - https://gist.github.com/bushblade/725780e6043eaf59415fbaf6ca7376ff

    // get the ordered items from our database
    const itemsFromDB = await Product.find({
      _id: { $in: orderItems.map((x) => x._id) },
    });

    // map over the order items and use the price from our items from database
    const dbOrderItems = orderItems.map((itemFromClient) => {
      const matchingItemFromDB = itemsFromDB.find(
        (itemFromDB) => itemFromDB._id.toString() === itemFromClient._id
      );
      let selectedSize = itemFromClient.size; // Assuming 'size' is a property of the order item
      let price;
      switch (selectedSize) {
        case 'Small':
          price = matchingItemFromDB.price;
          break;
        case 'Medium':
          price = matchingItemFromDB.priceM;
          break;
        case 'Large':
          price = matchingItemFromDB.priceL;
          break;
        default:
          // Handle other cases or errors as needed
          break;
      }
      return {
        ...itemFromClient,
        product: itemFromClient._id,
        price: price,
        _id: undefined,
      };
    });

    // calculate prices
    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const order = new Order({
      orderItems: dbOrderItems,
      user: req.user ? req.user._id : '6526eac0504318033ae7aec5',
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);

    // Mail to Admin

    await sendMail(shippingAddress.address, totalPrice, shippingAddress.phone);

    console.log(shippingAddress);

    await sendMailToUser(
      shippingAddress.email,
      shippingAddress.address,
      totalPrice,
      shippingAddress.phone
    );

    // Send Mail to User
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // NOTE: here we need to verify the payment was made to Stripe before marking
  // the order as paid
  // const { verified, value } = await verifyPayPalPayment(req.body.id);
  // if (!verified) throw new Error('Payment not verified');

  // check if this transaction has been used before
  // const isNewTransaction = await checkIfNewTransaction(Order, req.body.id);
  // if (!isNewTransaction) throw new Error('Transaction has been used before');

  const order = await Order.findById(req.params.id);

  if (order) {
    // check the correct amount was paid
    // const paidCorrectAmount = order.totalPrice.toString() === value;
    // if (!paidCorrectAmount) throw new Error('Incorrect amount paid');

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: 'Stripe Payment ID',
      status: 'Paid',
      update_time: 'Time',
      email_address: 'From Order',
    };

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});

const sendMail = async (address, total, number) => {
  const msg = {
    // to: 'cndn19@hotmail.com',
    to: 'cndn19@hotmail.com', // Change to your admin
    from: 'support@conandune.ae', // Change to your verified sender
    subject: 'New Order Received',
    text: 'Hi, a new order has been placed. Please check the admin panel to proceed further.',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Order Notification</title>
        <style>
            /* Add your custom CSS styles here */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 16px;
                line-height: 1.5;
                color: #555;
            }
            .order-details {
                margin-top: 20px;
                padding: 10px;
                border: 1px solid #ddd;
                background-color: #f9f9f9;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>New Order Notification</h1>
            <p>Dear Admin,</p>
            <p>A new order has been placed on your website. Here are the order details:</p>
            
            <div class="order-details">
                // <p><strong>Order ID:</strong> #12345</p>
                // <p><strong>Customer Name:</strong> Kartikey Rai</p>
                // <p><strong>Customer Email:</strong> Kartikeyarai7@gmail.com</p>
                <p><strong>Customer Number:</strong> ${number}</p>
                <p><strong>Order Total:</strong> ${total} AED</p>
                <p><strong>Shipping Address:</strong> ${address}</p>
            </div>
            
            <p>Please log in to your admin dashboard to process the order.</p>
            
            <p>Thank you for using our service.</p>
        </div>
    </body>
    </html>
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};
const sendMailToUser = async (email, address, total, number) => {
  console.log(email);
  const msg = {
    to: email, // Change to your recipient
    from: 'support@conandune.ae', // Change to your verified sender
    subject: 'New Order Received',
    text: 'Hi, Thanks for your order!',
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            /* Add your CSS styles here */
            body {
                font-family: Arial, sans-serif;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #007BFF;
                color: #ffffff;
                text-align: center;
                padding: 20px;
            }
            .order-details {
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Order Confirmation</h1>
            </div>
            <div class="order-details">
                <p>Dear Customer,</p>
                <p>Thank you for placing your order. Your order has been successfully confirmed.</p>
                <p>Shipping Address: ${address}</p>
                <p>Total Amount: ${total}</p>
                <p>Phone Number: ${number}</p>
            </div>
            <div class="footer">
                <p>If you have any questions or need further assistance, please contact our customer support at support@ConanDune.ae</p>
                <p>Thank you for shopping with us.</p>
            </div>
        </div>
    </body>
    </html>
    
    `,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
