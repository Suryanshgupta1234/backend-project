require("dotenv").config();

const app = require("./src/app"); 
const connectDB = require("./src/DB/db");
const cors = require("cors");

// ✅ Middleware
app.use(cors());

// ✅ DB + Server start
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});