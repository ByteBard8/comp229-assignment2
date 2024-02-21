import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import config from "./config/index.js"
import mongoose from 'mongoose' 
import userRoutes from './routes/user.route.js'

mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { 
    //useNewUrlParser: true,
//useCreateIndex: true, 
//useUnifiedTopology: true 
} )
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


app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app