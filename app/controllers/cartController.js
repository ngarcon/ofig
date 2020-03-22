const dataMapper = require('../data/dataMapper');

const initCart = (req) => {
  req.session.cart = {}; 
  req.session.cartData = {
    deliveryFees: 9.99,
    totalTF: 0.00,
    TVA: 0.00, 
    totalWithTaxes: 0.00,
    taxeRate: 0.2,
  }
};

const calculSubTotal = (item) => {

  return item.quantity * item.price; 

};

const updateCartData = (req, cart) => {

    const cartData = req.session.cartData; 
    cartData.totalTF = 0; 

      for (let item in cart) {
        cart[item].subTotal = calculSubTotal(cart[item]); 
      }
    
      for (let item in cart) {
        cartData.totalTF += cart[item].subTotal; 
        cartData.totalTF = Number(Math.round((cartData.totalTF)+'e2')+'e-2'); 
      }

      cartData.TVA = Number(Math.round((cartData.totalTF * cartData.taxeRate)+'e2')+'e-2'); 
      cartData.totalWithTaxes = Number(Math.round((cartData.totalTF + cartData.TVA + cartData.deliveryFees)+'e2')+'e-2');
    };

const cartController = {

  // méthode pour afficher le panier
  cartPage: (req, res) => {

    
    if (!req.session.cart) {
      initCart(req); 
    }

    const session = req.session; 

    const cart = session.cart; 
    const cartData = session.cartData; 

    res.render('panier', {
      cart, 
      cartData, 
    });
  }, 

  addNewItem: (req, res) => {

   const figId = req.params.id; 

    dataMapper.getOneFigurine(figId, (error, data) => {
      if (error) {
        res.status(500).send(error); 
      } else {

        if (!req.session.hasOwnProperty("cart")) {
          initCart(req); 
        }

        const cart = req.session.cart; 
        const cartData = req.session.cartData; 
        const figurine = data.rows[0];
      
      
        if (cart["figurine"+figId]) {
      
          cart["figurine"+figId].quantity++; 
      
        } else {
      
          cart["figurine"+figId] = figurine; 
          cart["figurine"+figId].quantity = 1; 
      
        }

        updateCartData(req, cart); 
        
        //console.log(req.session); 
        res.redirect('/cart');

      }
    }); 
  }, 

  deleteItem: (req, res) => {

    const figId = req.params.id; 
    
    if (!req.session.hasOwnProperty("cart")) {
      initCart(req); 
    }

    const cart = req.session.cart;   
  
    if (cart["figurine"+figId]) {
  
      cart["figurine"+figId].quantity--; 
      if(cart["figurine"+figId].quantity === 0) {
        delete cart["figurine"+figId]; 
      }
  
    } 


    updateCartData(req, cart); 
    
    //console.log(req.session); 
    res.redirect('/cart');


   }, 
 

};


module.exports = cartController;
