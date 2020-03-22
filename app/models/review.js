const client = require('../data/db_client');
const Sequelize = require('sequelize'); 

// Créer la class en tant que fille Sequelize.Model 
class Review extends Sequelize.Model {} ;

Review.init({
    author:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    note:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    message:{
        type: Sequelize.TEXT,
    },
}, {
    sequelize: client,
    tableName: "review", 
}); 

module.exports = Review; 