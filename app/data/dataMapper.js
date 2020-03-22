const client = require('./db_client');

const dataMapper = {
    getAllFigurines : (callback) => {
    const query = `SELECT * FROM "figurine";`
    
    client.query(query, callback);
    },

    getOneFigurine : (figId, callback) => {

    const query = `SELECT * FROM "figurine" WHERE "id"=$1;`;
    const values = [figId];
    client.query(query, values, callback);
    },

    getReviewsAbout: (figId, callback) => {
    const query = `SELECT * FROM "review" WHERE "figurine_id"=$1;`;
    const values = [figId];
    client.query(query, values, callback);
    },

    getAllReviews : (callback) => {
    const query = `SELECT * FROM "review";`;
    
    client.query(query, callback);
    },

    countCategory: (category, callback) => {

        const query = `SELECT COUNT(*) FROM "figurine" WHERE "category"=$1;`;

        const values = [category]; 

        client.query(query, values, callback); 
    }

}

module.exports = dataMapper ;