const dotenv = require('dotenv').config()
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.MONGO_HOST || 'localhost'}/${process.env.MONGO_DB || 'kyc'}`, { useNewUrlParser: true });
  mongoose.connection.on('connected', () => {
  console.log(`[!] Connected to MongoD`);
});
mongoose.set('useFindAndModify', false);


mongoose.connection.on('error', (err) => {
  console.log(`[X] ${err}`)
});


module.exports = mongoose
