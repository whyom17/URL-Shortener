import {generateShortUrl} from '../utils/helper.js';
import { saveShortUrl } from '../dao/short_url.js';
import urlSchema from '../models/short_url.model.js';

export const createShortUrlServiceWithoutUser = (url) => {
    const shortUrl = generateShortUrl(7);
    console.log(shortUrl);
    saveShortUrl(url, shortUrl);
    return shortUrl;
};

export const createShortUrlServiceWithUser = (url, userId) => {
    const shortUrl = generateShortUrl(7);
    console.log(shortUrl);
    saveShortUrl(url, shortUrl, userId);
    return shortUrl;
};

export const incrementClickCount = async (urlData) => {
    urlData.clicks += 1;
    await urlData.save();
}