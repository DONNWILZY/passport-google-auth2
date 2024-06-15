const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const generateAuthToken = (user) => {
    return jwt.sign({ userId: user._id }, process.env.JWT_SEC_KEY, { expiresIn: '1d' });
};

module.exports = { generateAuthToken };
