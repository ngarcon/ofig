const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const cartController = require('./controllers/cartController');


const router = express.Router();

// page d'accueil
router.get('/', mainController.homePage);

// page article
router.get('/article/:id', mainController.articlePage);


// page panier
router.get('/cart', cartController.cartPage);

// page panier
router.get('/cart/add/:id', cartController.addNewItem);

// page panier
router.get('/cart/delete/:id', cartController.deleteItem);

// on exporte le router 
module.exports = router;