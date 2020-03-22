const express = require('express');

// on importe nos controllers
const mainController = require('./controllers/mainController');
const cartController = require('./controllers/cartController');

const cartMiddleware = require('./middlewares/cartMiddleware')


const router = express.Router();

// Afficher la page d'accueil
router.get('/', mainController.homePage);

// Page descriptif d'un article
router.get('/article/:id', mainController.articlePage);

// Afficher la page descrptif d'une article 
router.get('/cart', cartMiddleware, cartController.cartPage);

// Ajout d'un élément au panier
router.get('/cart/add/:id', cartMiddleware, cartController.addNewItem);

// Retrait d'un élément du panier
router.get('/cart/delete/:id', cartMiddleware, cartController.deleteItem);



// on exporte le router 
module.exports = router;