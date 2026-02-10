import { configDotenv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

import authRoute from './routes/authRoutes.js'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// Запрос на главную страницу и ответ
app.get('/', (request, response) => {
    response.json({message: 'Всё хорошо!'})
})

// Middleware - дополнение express'а
app.use(cors())
app.use(express.json())

// Routes
// http://localhost:8080
app.use('/api/auth', authRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.h9j5vam.mongodb.net/${DB_NAME}?appName=Cluster0`,
        );
        console.log('\x1b[32m%s\x1b[0m', '✓ MongoDB connected'); // красивый вывод в консоль
        
        app.listen(PORT, () => 
            console.log('\x1b[32m%s\x1b[0m', `✓ Server started on port: ${PORT}`) // красивый вывод в консоль
        );
    } catch (error) {
        console.log('\x1b[31m%s\x1b[0m', `✗ Error: ${error.message}`); // красивый вывод в консоль
    }
}

start();