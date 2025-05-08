const express = require("express");
const connectDB = require('./config/dbConnection');
const routes = require('./routes');

const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use('/api', routes);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});