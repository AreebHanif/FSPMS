import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.PMS;
    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Error:", error.message);
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({ message: "Not authorized as admin" });
    }
};

export { isAuthenticated, isAdmin };
