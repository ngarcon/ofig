const client = require('../data/db_client');
const Sequelize = require('sequelize'); 

// Créer la class en tant que fille Sequelize.Model 
class Figurine extends Sequelize.Model {} ;

Figurine.init({
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
    },
    size: {
        type: Sequelize.REAL,
        allowNull: false
    },
    price: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    category: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    visual_name: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    sequelize: client,
    tableName: "figurine", 
});

module.exports = Figurine; 