const { Figurine, Review } = require('../models'); 

const mainController = {
  
  // méthode pour afficher la page d'accueil
  homePage: async (req, res) => {

    try {

      const figurines = await Figurine.findAll({
        include: ["reviews"]
      }); 

      for (const figurine of figurines) {
        let score = figurine.reviews.map(review => review.note);
        if (!!score.length) {
          figurine.note = score.reduce((a, b) => a+b)/score.length; 
        }
      }

      res.render("accueil", {
        figurines
      });

      return res.send(figurines) ; 
      
    } catch (error) {
      console.trace(error); 
    }

  }, 
  
  
  // méthode pour la page article
  articlePage: async (req, res) => {
    
    const figId = req.params.id; 
    
    try {

      const figurine = await Figurine.findByPk(figId, {
        include: ["reviews"]
      }); 
      
      let score = figurine.reviews.map(review => review.note);
      if (!!score.length) {
        figurine.note = score.reduce((a, b) => a+b)/score.length; 
      }
      

      res.render("article", {
        figurine
      });

      return res.send(figurines) ; 
      
    } catch (error) {
      console.trace(error); 
    }
        
        
        
      
      
  
    
  }, 

  showCategory: (req, res) => {



  }
  
}


module.exports = mainController;
