import express, { Application } from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import router from "./router/app.routes.js";
import session from "express-session";
import initializePassport from "./config/passport.js";
import passport from "passport";
import db from "./config/db.js";

const app: Application = express()

app.set('trust proxy', false)
dotenv.config()

app.use(cors({ origin: process.env.FRONTEND_URL, methods: "GET, POST, PUT, PATCH, DELETE", credentials: true }))
app.use(express.urlencoded({
    extended: true
}))

initializePassport()
app.use(session({
    secret: process.env.APP_SECRET || '',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.DOMAIN == '127.0.0.1' ? false : true }
}))


app.use(passport.initialize());
app.use(passport.session());

app.use(router)

app.listen(process.env.PORT, () => {
    // connect DB
    db.connect()
    console.log(`Server is running at http://${process.env.DOMAIN}:${process.env.PORT}`);
})




