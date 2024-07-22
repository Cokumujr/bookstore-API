const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPaswword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      email,
      password: hashedPaswword,
      role,
    });

    await user.save();

    res.status(201).json({ message: "user created succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error registering user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      userId: user._id,
      role: user.role,
      username: user.username,
      email: user.email
    };

    const token = jwt.sign(payload, '1234', {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

module.exports = { register, login };
