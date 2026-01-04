import { verifyToken } from "../utils/helper.js"
import { findUserByEmail } from "../dao/user.dao.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken
    if(!token) return res.status(401).json({message : "Unauthorized"})

    try {
        const decoded = verifyToken(token) // returns payload (here, email)
        const user = await findUserByEmail(decoded)
        if(!user) return res.status(401).json({message : "Unauthorized"})
        req.user = user
        next()
    } catch(error) {
        return res.status(401).json({message : "Unauthorized"})
    }
}