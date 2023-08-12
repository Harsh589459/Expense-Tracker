const Razorpay = require('razorpay');
const Order = require('../models/ordersModel')
const userController = require("./userController");



exports.purchasePremium = async (req, res) => {


    try {

        var rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })
        const amount = 50000000;
        rzp.orders.create({ amount, currency: 'INR' }, (err, order) => {
            console.log("first")
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            //it comes when you click on buy premium and order is created but it is still pending as user doesn't confirm the order
            req.user.createOrder({ orderid: order.id, status: 'PENDING' }).then(() => {
                console.log("second")
                return res.status(201).json({ order, key_id: rzp.key_id })
            }).catch(err => {
                throw new Error(err)
            })
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err })
    }
}

exports.updateTransactionStatus = async (req, res) => {
    console.log("last")
    try {
        const userId = req.user.id;

        const { payment_id, order_id } = req.body;
        console.log('ror>>>>>>>>>>', req.body)

        const orderConfirmed = await Order.findOne({ where: { orderid: order_id } });
        const updateOrder = orderConfirmed.update({
            payment_id: payment_id,
            status: 'SUCCESSFULL',
        });
        const updateUser = req.user.update({ isPremiumUser: true })

        Promise.all([updateUser, updateOrder]).then(() => {
            return res.status(202).json({
                success: true,
                message: "Transaction Successful",
                token: userController.generateAccessToken(userId, undefined, true),
            })
        }).catch((err) => {
            throw new Error(err);
        })
    }
    catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: "Payment Unscessfull" })
    }
}