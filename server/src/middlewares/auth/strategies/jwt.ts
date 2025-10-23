import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt'
import passport, { initialize } from 'passport'
import authModel from '../../../modules/auth/auth.model.js'
import mongoose from 'mongoose'

export default function configureJWTStrategy() {
    const jwtStrategy = new JWTStrategy(
        {
            secretOrKey: process.env.APP_SECRET || '',
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                ExtractJwt.fromHeader('token')
            ])
        },
        async (payload, done) => {
            try {
                const user: mongoose.Document | null = await authModel.findOne({ _id: payload.id, isDeleted: false }).exec()
                
                if (!user) {
                    return done(null, false)
                }
                return done(null, user)
            } catch (err) {
                return done(err as Error, false)
            }
        }
    )

    passport.use(jwtStrategy)

    passport.serializeUser((user : any, done) => {
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