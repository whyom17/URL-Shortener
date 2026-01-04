import wrapAsync from "../utils/tryCatchWrapper.js";
import { registerUser, loginUser } from "../services/auth.service.js";
import { cookieOptions } from "../config/config.js";

export const register_user = wrapAsync(async (req, res) => {
    const {name, email, password} = req.body;
    const {token, user} = await registerUser(name, email, password);

    req.user = user;
    res.cookie('acessToken', token, cookieOptions);
    res.status(200).json({message: "User registered successfully"});
});

export const login_user = wrapAsync( async (req, res) => {
    const {email, password} = req.body;
    const {token, user} = await loginUser(email, password);
    
    req.user = user;
    res.cookie('accessToken', token, cookieOptions);
    res.status(200).json({message: "Login successful"});
});