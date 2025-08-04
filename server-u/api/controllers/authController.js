const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Log } = require("../middleware/loggerClient");

const register = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email.trim().toLowerCase();
    const exists = await User.findOne({ email });

    if (exists) {
      await Log("backend", "error", "register", "User exists: " + email);
      return res.status(400).json({ message: "User exists" });
    }

    if (password.length < 6) {
      await Log("backend", "error", "register", "Password too short for: " + email);
      return res.status(400).json({ message: "Minimum 6 characters for Password" });
    }

    const hashedPass = await bcrypt.hash(password, 15);
    const user = new User({ name, email, password: hashedPass });
    await user.save();

    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.log(err);
    await Log("backend", "fatal", "register", err.message || err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      await Log("backend", "error", "login", "User not found: " + email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      await Log("backend", "error", "login", "Wrong password for: " + email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });

    res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
  } catch (err) {
    console.log(err);
    await Log("backend", "fatal", "login", err.message || err);
    res.status(500).json({ error: "Server Error" });
  }
};

const current = (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    return res.status(200).json(req.user);
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    await Log("backend", "fatal", "logout", err.message || err);
  }
};

module.exports = {
  register,
  login,
  current,
  logoutUser
};
