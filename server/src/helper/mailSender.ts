import { google } from 'googleapis'
import nodemailer, { Transporter } from 'nodemailer'
class MailSender {
    private oAuth2Client: any

    constructor() {
        this.oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, process.env.GOOGLE_REDIRECT_URI)
        this.oAuth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN })

    }    

    sendmail = async (params: { clientEmail: string, subject: string, textBody: string, html: string }) => {
        const accessToken = await this.oAuth2Client.getAccessToken()
        console.log('access token from mail', accessToken.token);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: "mern.full.stack.projects@gmail.com",
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                accessToken: accessToken.token ?? ''
            }
        })

        const mailOptions = {
            from: "mern.full.stack.projects@gmail.com",
            to: params.clientEmail,
            subject: params.subject,
            text: params.textBody,
            html: params.html,
        }
        try {
            const info = await transporter.sendMail(mailOptions)
            return info.response
        } catch (error) {
            // throw Error(typeof error === "string" ? error : JSON.stringify(error))
            console.log('error in the nodemailer', error);
        }
    }
}

export default MailSender