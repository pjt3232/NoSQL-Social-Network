const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/index');

//creates the app using express and the PORT
const PORT = process.env.PORT || 3001;
const app = express();

//middleware for the express server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//opens port for the API server
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
