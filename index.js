const connectDB = require('./config/dbConnection');
const app = require('./app');
require("dotenv").config();

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});