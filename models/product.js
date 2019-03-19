const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('mongoose-unique-validator');

const schema = new Schema({
    imagePath: {type: String, required: true, unique: true},
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}
});

schema.plugin(validator);

module.exports = mongoose.model('Product', schema);
