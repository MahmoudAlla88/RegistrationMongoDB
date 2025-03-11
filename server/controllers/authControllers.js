// const User = require("../models/user");

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// exports.signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const existingUser = await user.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({ message: "Email already in use" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await user.create({ name, email, password: hashedPassword });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const users = await user.findOne({ email });

//     if (!users || !(await bcrypt.compare(password, users.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ userId: users._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000
//     });

//     res.status(200).json({ message: "Login successful", users: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong while logging in" });
//   }
// };

// exports.getProfile = async (req, res) => {
//   try {
//     const users = await user.findById(req.users.userId).select("-password");
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch profile" });
//   }
// };

// exports.logout = (req, res) => {
//   res.clearCookie("token");
//   res.status(200).json({ message: "Logged out successfully" });
// };
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong while logging in" });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch profile" });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
