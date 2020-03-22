const { Figurine } = require('../models');

const calculSubTotal = (item) => {
  return item.quantity * item.price; 
};

const updateCartData = (req, cart) => {
  
  const cartData = req.session.cartData; 
  
  // On réinitilise le total hors taxe 
  cartData.taxeFreeTotal = 0; 
  
  for (let item in cart) {
    // Calcul du sous-total hors taxe de chaque figurine
    cart[item].subTotal = calculSubTotal(cart[item]); 
  }
  
  
  // calcul du sou-total hors taxe du panier
  
  
  for (let item in cart) {
    cartData.taxeFreeTotal += cart[item].subTotal; 
    cartData.taxeFreeTotal = Number(Math.round((cartData.taxeFreeTotal)+'e2')+'e-2'); 
  }
  
  cartData.taxeTotal = Number(Math.round((cartData.taxeFreeTotal * cartData.taxeRate)+'e2')+'e-2'); 
  cartData.totalWithTaxes = Number(Math.round((cartData.taxeFreeTotal + cartData.taxeTotal + cartData.deliveryFees)+'e2')+'e-2');
};

const cartController = {
  
  // méthode pour afficher le panier
  cartPage: (req, res) => {
    
    const session = req.session; 
    
    const cart = session.cart; 
    const cartData = session.cartData; 
    
    res.render('panier', {
      cart, 
      cartData, 
    });
  }, 
  
  addNewItem: async (req, res) => {
    
    const figId = req.params.id; 
    
    try {

      const cartData = req.session.cartData; // type: Object

      // Vérifier si l'objet existe dans le panier

      let rightItem = req.session.cart.find(entry => entry.id == figId); 

      if (rightItem) {
        console.log("Trouvé", rightItem);
        rightItem.quantity++; 

      } else {
        console.log("Pas trouvé");

        let figurine = await Figurine.findByPk(figId, {
          include: ["reviews"]
        }); 

        figurine.quantity = 1;
        req.session.cart.push(figurine); 

      }
      //console.log("rightItem", rightItem); 
      console.log("status", req.session.cart); 

      //updateCartData(req, cart); 

      res.redirect('/cart');
      
    } catch (error) {
      console.trace(error); 
    }

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
