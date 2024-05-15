const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
require('dotenv').config();

const tokenExpiry = process.env.JWTOKENEXPIRY || '1h';


async function signInUser(req, res) {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: tokenExpiry });
    res.cookie('token', token, {httpOnly:true})
    res.status(200).json({ token });
  } catch (error) {
    //Log to console and log file with Winston logger
    logger.info(error);
    res.status(500).json({ error: 'Failed to sign in user' });
  }
}

module.exports = signInUser;
