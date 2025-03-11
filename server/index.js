const express = require("express");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);



const MONGO_URI="mongodb+srv://mahmoudsuleiman678:8fGEQ8R43EL@cluster0.gqrqn.mongodb.net/registration?retryWrites=true&w=majority"
// mongodb+srv://mahmoudsuleiman678:8fGEQ8R43EL@cluster0.gqrqn.mongodb.net/registration?retryWrites=true&w=majority

mongoose.connect(MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Connect to Mong
const PORT=5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));