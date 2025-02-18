import { response } from "express";
import bcrypt from "bcrypt";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    res.status(200).json({ msg: newUser });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check the user if it's already logged in
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if the user's password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate cookie token and send it to the user

    // res.setHeader("Set-Cookie", "test=" + "myValue");

    // Generate JWT token
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      { 
        id: user.id, 
        username: user.username 
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

  
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true
        maxAge: age
      })
      .status(200)
      .json({ message: "Login successful" });

    
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
    console.error(error);
  }
};

export const logout = (req, res) => {
 res.clearCookie("token").status(200).json({ message: "User logged out" }); 
};
