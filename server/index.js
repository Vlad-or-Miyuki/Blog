import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import authRoute from './routes/auth.js';
import postRoute from './routes/post.js';
import commentRoute from './routes/comment.js';

const app = express();
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadsPath = path.join(__dirname, 'uploads');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mern_blog';

app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use('/uploads', express.static(uploadsPath));
app.use(express.static(uploadsPath));

app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/comments', commentRoute);

async function start() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log('Error:', e);
  }
}

start();
