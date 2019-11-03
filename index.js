const dotenv = require('dotenv').config();
const db = require('./components/db');
const express = require('express');
const helmet = require('helmet')
const exphbs = require('express-handlebars');
const app = express();
const cors = require('cors');
const port = process.env.SERVER_PORT || 5002;
const server = app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
  const router = require('./routes/');
  app.engine('handlebars', exphbs());
  app.set('view engine', 'handlebars');
  app.use(helmet());
  app.use(express.static('public'));
  app.use(express.json());
  app.use(cors());
  app.use('/', router);
})
