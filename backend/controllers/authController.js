const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register User
exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check agar user pehle se hai
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'User already exists' });

        // Password hash karo (Security requirement)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // User save karo
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // User dhoondo
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid Credentials' });

        // Password match karo
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid Credentials' });

        // JWT Token banao (Is se user login rahega)
        const payload = { userId: user._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, username: user.username });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};