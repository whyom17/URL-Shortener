// DAO: Data Access Object

import urlSchema from '../models/short_url.model.js';
import { ConflictError } from '../utils/errorHandler.js';

export const saveShortUrl = async ({fullUrl, shortUrl, userId}) => {
    try{
        const newUrl = new urlSchema({ fullUrl, shortUrl });
        if (userId) {
            newUrl.userId = userId;
        }
        await newUrl.save();
    }catch(err){
        if (err.code === 11000) {
            // Duplicate shortUrl, generate a new one and try again
            throw new ConflictError('Duplicate short URL generated. Please try again.');
        }
        throw err;
    }
}

export const getUserByShortUrl = async (shortUrl) => {
    const user = await urlSchema.findOne({shortUrl});
    return user;
};