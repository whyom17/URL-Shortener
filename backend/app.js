import express from 'express';
import {nanoid} from 'nanoid';
import connectDB from './src/config/mongo.config.js';
import urlSchema from './src/models/short_url.model.js';
import dotenv from 'dotenv';
dotenv.config(".env");
import short_url from './src/routes/short_url.route.js';
import { redirectToFullUrl } from './src/controller/short_url.controller.js';
import { errorHandler } from './src/utils/errorHandler.js';
import cors from 'cors';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/create', short_url);
app.get('/:shortUrl', redirectToFullUrl);

app.use(errorHandler)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});