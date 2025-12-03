import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import authModel from '../../../modules/auth/auth.model.js'
import AuthRepo from '../../../modules/auth/auth.repo.js'

export default function configureGoogleStrategy() {
    const googleStrategy = new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: `${process.env.FRONTEND_URL}/auth/google/callback`
    }, async (accessToken, refreshToken, profile: any, done) => {
        try {
            let user = await authModel.findOne({
                loginProvider: "Google",
                email: Array.isArray(profile.emails) ? profile.emails[0].value : profile.email,
                isDeleted: false,
            })

            if (user) {
                // check login ID for the sake of security
                const isIdValid = await AuthRepo.compareLoginIds(profile.id, user.loginId ?? '')
                if (!isIdValid) {
                    user=null
                }
            }

            // This part of if statement cannot be replaced with 'else' block because the security and this part both are independent
            if (!user) {
                user = await authModel.create(
                    {
                        loginId: await AuthRepo.encryptLoginId(profile.id),
                        firstName: profile.name?.givenName,
                        lastName: profile.name?.familyName,
                        email: Array.isArray(profile.emails) ? profile.emails[0].value : profile.emails,
                        profilePicture: Array.isArray(profile.photos) ? profile.photos[0].value : profile.photos,
                        loginProvider: "Google",
                        password: false
                    }
                )
            }

            

            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
    })

    passport.use(googleStrategy)

    passport.serializeUser((user: any, done) => {
        done(null, user._id ?? user.id ?? user)
    })

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await authModel.findOne({ _id: id, isDeleted: false })
            done(null, user)
        } catch (error) {
            done(error, null)
        }
    })
}
