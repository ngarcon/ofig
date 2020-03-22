const Figurine = require('./figurine');
const Review = require('./review');

Review.belongsTo(Figurine, {
    foreignKey: "figurine_id",
    as: "figurine"
}); 

Figurine.hasMany(Review, {
    foreignKey: "figurine_id",
    as: "reviews"
}); 

module.exports = {
    Figurine, 
    Review
}; 