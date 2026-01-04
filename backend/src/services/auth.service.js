import { ConflictError } from "../utils/errorHandler.js";
import { findUserByEmail } from "../dao/user.dao.js";
import { createUser } from "../dao/user.dao.js";
import { signToken } from "../utils/helper.js";

export const registerUser = async (name, email, password) => {
    const user = await findUserByEmail(email);
    
    if (user) throw new ConflictError('User already exists');
    
    const newUser = await createUser(name, email, password);
    const token = signToken(email);
    return {token, user: newUser};
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmail(email);
    
    if (!user || user.password !== password) throw new new Error('Invalid Credentials');
    
    const token = signToken(email);
    return {token, user};
}