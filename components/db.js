mongoose.connect('mongodb://127.0.0.1/kyc', { useNewUrlParser: true });
  mongoose.connection.on('connected', () => {
  console.log(`[!] Connected to MongoD`);
});
mongoose.set('useFindAndModify', false);


mongoose.connection.on('error', (err) => {
  console.log(`[X] ${err}`)
});


module.exports = mongoose
