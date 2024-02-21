import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose' 
import userRoutes from './routes/user.route.js'
import productRoutes from "./routes/product.route.js"

import 'dotenv/config';

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {} )
.then(() => {
    console.log("Connected to the database!");
    })
mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', userRoutes)
app.use('/', productRoutes)

app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app