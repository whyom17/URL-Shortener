import {generateShortUrl} from '../utils/helper.js';
import { saveShortUrl } from '../dao/short_url.js';
import { getUserByShortUrl } from '../dao/short_url.js';

export const createShortUrlServiceWithoutUser = (url) => {
    const shortUrl = generateShortUrl(7);
    if (!shortUrl) throw new Error('Failed to generate short URL');
    
    saveShortUrl({fullUrl: url, shortUrl});
    return shortUrl;
};

export const createShortUrlServiceWithUser = (url, userId, slug= false) => {
    const shortUrl = slug || generateShortUrl(7);
    const urlExists = getUserByShortUrl(shortUrl);
    if (!urlExists) throw new ConflictError('Custom slug already in use. Please choose another one.');
    
    saveShortUrl({fullUrl :url, shortUrl, userId});
    return shortUrl;
};

export const incrementClickCount = async (urlData) => {
    urlData.clicks += 1;
    await urlData.save();
}