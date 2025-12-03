import { Request, Response } from "express"
import jwt from 'jsonwebtoken'
import authRepo from "./auth.repo.js"
import authModel from "./auth.model.js"
import MailSender from "../../helper/mailSender.js"

type Controller = (req: Request, res: Response) => Promise<void> | void

class AuthController {
    testServer: Controller = (req, res) => {
        try {
            res.status(200).send({
                status: 200,
                message: 'The server is working'
            })
        } catch (error) {
            console.log('error in the server', error);
            res.status(500).send({
                status: 500,
                message: 'Error occured in server'
            })
        }
    }

    googleAuthCallback: Controller = async (req: Request, res: Response) => {
        try {
            if (req.user) {
                const secret = process.env.APP_SECRET || "N3W_S36R8"
                const token = jwt.sign({ ...req.user }, secret, { algorithm: 'HS256' })
                res.status(200).send({
                    status: 200,
                    message: "Authentication Successful",
                    data: {
                        user: req.user,
                        token
                    }
                })
            }

        } catch (error) {
            console.log('error in the server', error);
            res.status(500).send({
                status: 500,
                message: 'Error occured in server',
                error
            })

        }
    }

    registerUser: Controller = async (req, res) => {
        try {


            // check for first name
            if (!req.body.firstName) {
                res.status(206).send({
                    status: 206,
                    message: "First Name not received",
                    data: null
                })
                return
            }
            // check for last name
            if (!req.body.lastName) {
                res.status(206).send({
                    status: 206,
                    message: "Last Name not received",
                    data: null
                })
                return
            }
            // check for email
            if (!req.body.email) {
                res.status(206).send({
                    status: 206,
                    message: "Email not received",
                    data: null
                })
                return
            }
            // check for password
            if (!req.body.password) {
                res.status(206).send({
                    status: 206,
                    message: "Password not received",
                    data: null
                })
                return
            }
            // check for Photo
            if (!req.file) {
                res.status(206).send({
                    status: 206,
                    message: "Profile picture not received",
                    data: null
                })
                return
            }


            // check if the email is already registered
            const isEmailExists = await authRepo.isEmailExists(req.body.email)
            if (isEmailExists) {
                res.status(403).send({
                    status: 403,
                    message: "Email already exists, Please consider Login",
                    data: null
                })
                return
            }

            // hash the RAW password
            const hashedPassword = await authRepo.hashPassword(req.body.password)
            req.body.password = hashedPassword

            // set profile picture filename if file is provided
            const uploadedFile = req.file as { filename?: string } | undefined
            if (uploadedFile && typeof uploadedFile.filename === 'string') {
                req.body.profilePicture = uploadedFile.filename
            } else {
                req.body.profilePicture = null
            }

            const userCreated = await authModel.create(req.body)

            const mailVerifierToken = await authRepo.mailVerifier()

            const mailOptions = {
                clientEmail: req.body.email,
                subject: "Verification Email",
                textBody: `Copy and Paste this key in Hot-Resume ${mailVerifierToken}`,
                html: `
                    <h1> Verify Email </h1>
                    <p> please Verify using this button </p>
                    <a href="${process.env.FRONTEND_URL}/verifyEmail?token=${mailVerifierToken}">Verify</a>
                `
            }

            const sendEmail = new MailSender()
            const emailResponse = await sendEmail.sendmail(mailOptions)

            console.log('Email Response ', emailResponse);

            if (userCreated && emailResponse) {
                res.status(200).send({
                    status: 200,
                    message: "User Created Successfully",
                    data: {
                        email: req.body.email,
                    }
                })
            }

            return

        } catch (error) {
            console.log('error in the server', error);
            res.status(500).send({
                status: 500,
                message: 'Error occured in server',
                error
            })
        }
    }

    checkEmailFunctionality:Controller = async (req, res) => {
        try {
            const mailOptions = {
                clientEmail: req.body.email,
                subject: "Verification Email",
                textBody: `Copy and Paste this key in Hot-Resume `,
                html: `
                    <h1> Verify Email </h1>
                    <p> please Verify using this button </p>
                    
                `
            }

            const sendEmail = new MailSender()
            const emailResponse = await sendEmail.sendmail(mailOptions)

            console.log('Email Response ', emailResponse);

            if (emailResponse) {
                res.status(200).send({
                    status: 200,
                    message: "Email service is working",
                    data: emailResponse
                })
            }
        } catch (error) {
            console.log('error in the server', error);
            res.status(500).send({
                status: 500,
                message: 'Error occured in server',
                error
            })
            
        }
    }
}

export default new AuthController