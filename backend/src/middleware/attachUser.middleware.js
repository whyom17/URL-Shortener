import { verifyToken } from "../utils/helper.js";
import { findUserByEmail } from "../dao/user.dao.js";

export const attachUser = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next();

    try {
        const decoded = verifyToken(token); 
        const user = await findUserByEmail(decoded.userEmail.email);
        req.user = user;
        next();
    } catch (error) {
        next();
    }
};
