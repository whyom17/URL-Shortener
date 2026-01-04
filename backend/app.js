import express from 'express';
import {nanoid} from 'nanoid';
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/models/short_url.model.js';
import dotenv from 'dotenv';
import short_url from './src/routes/short_url.route.js';
import auth_route from './src/routes/auth.routes.js';
import { redirectToFullUrl } from './src/controller/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { attachUser} from './src/middleware/attachUser.middleware.js';

dotenv.config(".env");
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors(
    {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    }
));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(attachUser);

app.use('/api/auth', auth_route);
app.use('/api/create', short_url);

app.get('/:shortUrl', redirectToFullUrl);

app.use(errorHandler)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});