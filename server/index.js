import { configDotenv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

// Constants
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

async function start () {
    try {
        await mongoose.connect (
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.h9j5vam.mongodb.net/${DB_NAME}?appName=Cluster0`,
        )
        
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()