const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

const Product = require('../models/product');
const Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
    const successMsg = req.flash('success')[0];
    Product.find(function (err, docs) {
        const productChunks = [];
        const chunkSize = 3;
        for (let i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'Shopping Application',
            products: productChunks,
            successMsg: successMsg,
            noMessages: !successMsg
        });
    });
});

router.get('/add-to-cart/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    Product.findById(productId, function (err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/reduce/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/shoppingCart');
});

router.get('/remove/:id', function (req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {items: {}});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/shoppingCart');
});

router.get('/shoppingCart', function (req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shoppingCart', {products: null});
    }
    const cart = new Cart(req.session.cart);
    res.render('shop/shoppingCart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});

router.get('/checkout', isLoggedIn, function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shoppingCart');
    }
    const cart = new Cart(req.session.cart);
    const errMsg = req.flash('error')[0];
    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
});

router.post('/checkout', isLoggedIn, function (req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shoppingCart');
    }

    const cart = new Cart(req.session.cart);

    const stripe = require("stripe")("sk_test_fwmVPdJfpkmwlQRedXec5IxR");
    stripe.charges.create({
        amount: cart.totalPrice * 100,
        currency: "kes",
        source: req.body.stripeToken, // obtained with Stripe.js
        description: "Test Charge"
    }, function (err, charge) {
        if (err) {
            req.flash('error', err.message);
            return res.redirect('/checkout');
        }
        const order = new Order({
            user: req.user,
            cart: cart,
            address: req.body.address,
            name: req.body.name,
            paymentId: charge.id
        });
        order.save(function (err, result) {
            req.flash('success', 'Successfully bought product!');
            req.session.cart = null;
            res.redirect('/');
        });
    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}
