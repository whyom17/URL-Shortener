import {createShortUrlServiceWithoutUser} from '../services/short_url.service.js';
import { getUserByShortUrl } from '../dao/short_url.js';
import { incrementClickCount } from '../services/short_url.service.js';
import wrapAsync from '../utils/tryCatchWrapper.js';

export const createShortUrl = wrapAsync (async (req, res, next) => {
    const {url} = req.body;
    const shortUrl = await createShortUrlServiceWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
});

export const redirectToFullUrl = wrapAsync (async (req, res) => {
    const {shortUrl} = req.params;
    const urlData = await getUserByShortUrl(shortUrl);
    if (urlData) {
        console.log(urlData.fullUrl);
        incrementClickCount(urlData);
        return res.redirect(urlData.fullUrl);
    } else {
        return res.status(404).send('URL not found');
    }
});