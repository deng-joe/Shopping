const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

const Product = require('../models/product');
const Order = require('../models/order');

const axios = require('axios');

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

    const mpesaRequest = {
        amount: '1',
        accountReference: 'test',
        callbackUrl: 'http://callback.url',
        description: 'test',
        phoneNumber: '254713153671'
    };
    axios.post('https://safaricom-node-stk.herokuapp.com/api/v1/stkpush/process', mpesaRequest).then(
        result => {
            console.log(result);
            const order = new Order({
                user: req.user,
                cart: cart,
                phone: mpesaRequest.phoneNumber
            });
            order.save(function (err, result) {
                req.flash('success', 'Transaction successful!');
                req.session.cart = null;
                res.redirect('/');
            });
        }
    ).catch(err => {
        console.error(err);
        req.flash('error', err.message);
        return res.redirect('/checkout');
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
