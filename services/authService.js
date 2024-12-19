const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const responseFormatter = require('../utils/responseFormatter');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.resolve(__dirname, '../certs/private.pem'), 'utf8');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../certs/public.pem'), 'utf8');

const authService = {

    // checkToken: async (token) => {
    //     if (!token) return null;

    //     try {
    //         const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //         return { user: decoded };
    //     } catch (error) {
    //         return null;
    //     }
    // },

    findUser: async ({ email }) => {
        return await User.findOne({ email });
    },

    getUser: async (userData) => {
        const { username, email, password, phone } = userData;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name: username, email, password: hashedPassword, phone, isAdmin: false });
        await user.save();
        return { id: user._id, username: user.name, isAdmin: user.isAdmin };
    },

    register: async (userData) => {
        const { userName, email, password, phone } = userData;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ name: userName, email, password: hashedPassword, phone, isAdmin: false });
        await user.save();
        return { userName: user.name, isAdmin: user.isAdmin };
    },

    login: async (userData) => {
        const { email, password } = userData;
        const user = await User.findOne({email});
        if (!user) throw new Error('User not found');
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid credentials');
        return { userName: user.name, isAdmin: user.isAdmin };
    },

    logout: async (res) => {
        res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Lax' });
    },

    generateToken: (user) => {
        console.log(user)
        const payload = {
            user: {
                id: user.id,
                userName: user.userName,
                isAdmin: user.isAdmin
            }
        };
        const generateOptions = {
            algorithm: 'RS256',
            expiresIn: '1h',
            audience: 'urn:metro:api',
            issuer: 'urn:metro:auth',
        }
        try {
            const token = jwt.sign(payload, privateKey, generateOptions);
            return token;
        } catch (error) {
            throw new Error('Token generation failed');
        }
    },

    setAuthCookies: (res, accessToken) => {
        const csrfToken = crypto.randomUUID();
        console.log(csrfToken)

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.COOKIE_SECURE === 'true',
            sameSite: 'Lax',
            maxAge: 3600000
        });

        res.cookie('X-CSRF-TOKEN', csrfToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === '', // Only in production over HTTPS
            sameSite: 'Lax', // Prevent CSRF attacks
        });

        return csrfToken; // Return CSRF token if needed for frontend
    },

    verifyToken: (token) => {
        try {
            const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
            return decoded;
        } catch (error) {
            return null;
        }
    }
};

module.exports = authService;
