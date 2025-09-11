import express, { Application } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import router from "./router/app.routes.js";
import { log } from "console";

const app:Application = express()

app.set('trust proxy', false)
dotenv.config()

app.use(cors({origin: process.env.FRONTEND_URL, methods: "GET, POST, PUT, PATCH, DELETE"}))
app.use(express.urlencoded({
    extended: true
}))

app.use(router)

app.listen(process.env.PORT, () => {
    // connect DB
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT}`);    
})




