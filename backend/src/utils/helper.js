import { nanoid } from 'nanoid';
import { jwtOptions } from '../config/config.js';
import jwt from 'jsonwebtoken';

export const generateShortUrl = (length) => {
    return nanoid(length);
};

export const signToken = (email) => {
    return jwt.sign({ email }, process.env.JWT_SECRET, jwtOptions);
}

export const verifyToken = (token) => {
    const userEmail = jwt.verify(token, process.env.JWT_SECRET);
    return { userEmail }
}