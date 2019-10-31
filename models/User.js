const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
firstName: String,
lastName: String,
emailAddress: String,
telegram: String,
dateOfBirth: String,
address1: String,
address2: String,
city: String,
state: String,
nationality: String,
zipCode: String,
paymentMethod: String,
photos: Array,
});

userSchema.set('timestamps', true)

module.exports = mongoose.model('User', userSchema);
