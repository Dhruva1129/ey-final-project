
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); 

const authenticate = (req, res, next) => {
    const token = req.header("Authorization");
    console.log('Authorization header:', token); 

    if (!token) return res.status(401).json({ message: "Access token missing or invalid" });


    try {
        const jwtToken = token.split(" ")[1]; 
        console.log('JWT token:', jwtToken); 
    
        const verified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        console.log('Decoded token:', verified); 
    
        req.user = verified;
        next();
    } catch (error) {
        console.error('Token verification failed:', error); 
        res.status(400).json({ message: "Invalid token" });
    }
    
};


const authorizeRole = (role) => (req, res, next) => {
    if (req.user.role !== role) {
        return res.status(403).json({ message: "Access forbidden" });
    }
    next();
};

module.exports = { authenticate, authorizeRole };
