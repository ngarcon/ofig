// 1. require le module
const Sequelize = require ('sequelize');

// 2. Créer un client
const client = new Sequelize(process.env.PG_URL, {
   define: { timestamps: false, }
});

// 3. Exporter le client connecté
module.exports = client;