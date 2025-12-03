import mongoose from "mongoose";

const authSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type: String,
        required: function(this: mongoose.Document & { loginProvider?: String }) {
            return this.loginProvider === "JWT";
        },
        maxlength: 60
    },
    profilePicture: {
        type: String,
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    loginProvider: {
        type: String,
        enum: ["JWT", "Google", "Facebook", "Twitter", "GitHunb"],
        default: "JWT"
    },

    // required: false = we cannot derive loginId if user logins with email and password (NORMAL LOGIN), || but required: true = if the user logs in using social media
    loginId: {
        type: String,
        required: function(this: mongoose.Document & { loginProvider: String }) {
            return this.loginProvider !== "JWT"
        }
    },

    // default: false = if the user registers using registration form || but default: true = if the user uses social media services to register
    isVerified: { 
        type: Boolean,
        default: function(this: mongoose.Document & {loginProvider: String}) {
            return this.loginProvider !== "JWT"
        }
    },

    // this is to ask the user if the user wants to change the picture, and later on by default the last saved image will be used
    isNewUser: {
        type: Boolean,
        default: true
    }
}, {
    versionKey: false,
    timestamps: true,
})

const authModel = mongoose.model("user", authSchema)
export default authModel