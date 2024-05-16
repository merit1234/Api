const bcrypt = require('bcrypt');
const User = require('../../models/User');
const logger = require('../../services/winstonLogger');

async function signUp(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with hashed password
    const newUser = new User({ firstName, lastName, email, password: hashedPassword });
    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    logger.info(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = signUp;
