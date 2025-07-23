import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) {
      await Log("backend", "error", "register", "User exists: " + email);
      return res.status(400).json({ error: "User exists" });
    }
    if (password.length < 6) {
      await Log(
        "backend",
        "error",
        "register",
        "Password too short for: " + email
      );
      return res.status(400).json({ message: "6 charaxters" });
    }
    const hashedPass = await bcrypt.hash(password, 15);
    const user = new User({ name, email, password: hashedPass });
    await user.save();
    res.status(201).json({ message: "User created" });
  } catch (err) {
    await Log("backend", "fatal", "register", err.message || err);
    res.status(500).json({ error: "Server Error" });
  }
};

export const login = async (req, res) => {
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
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    res.json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    await Log("backend", "fatal", "login", err.message || err);
    res.status(500).json({ error: "Server Error" });
  }
};