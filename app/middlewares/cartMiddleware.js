//* Cart Middleware
// Check if a cart exists
// creates it if needed

module.exports = (req, res, next) => {

    if (!req.session.cart) {
        // array contenant les articles du panier
        req.session.cart = []; 

        // données concernant les cart
        req.session.cartData = {
          deliveryFees: 9.99,
          taxeFreeTotal: 0.00,
          taxeTotal: 0.00, 
          totalWithTaxes: 0.00,
          taxeRate: 0.2,
        }
    }

    next(); 
}