import bcrypt from "bcryptjs";
import authModel from "./auth.model.js";
import crypto from "crypto";

class AuthRepo {
    async encryptLoginId (id: string) {
        const encryptedId = await bcrypt.hash(id, 10)
        return encryptedId
    }

    async compareLoginIds (id: string, hashedId: string):Promise<boolean> {
        const isValid = await bcrypt.compare(id, hashedId)
        return isValid
    }

    async isEmailExists (email: string) {
        const isExists = await authModel.findOne({ email })
        return isExists
    }

    async hashPassword(rawPassword: string) {
        const hashedPassword = await bcrypt.hash(rawPassword, 10)
        return hashedPassword
    }

    async mailVerifier () {
        const mailVerifierToken = crypto.randomBytes(32).toString("hex")
        return mailVerifierToken
    }
}

export default new AuthRepo