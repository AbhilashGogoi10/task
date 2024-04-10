require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const PORT = 4002;

// middleware
app.use(express.json());
app.use(cors());
app.use(authRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server start at Port No :${PORT}`);
});
