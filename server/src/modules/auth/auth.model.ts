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
        maxlength: 16
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

    loginId: {
        type: String,
        required: function(this: mongoose.Document & { loginProvider: String }) {
            return this.loginProvider !== "JWT"
        }
    }
}, {
    versionKey: false,
    timestamps: true,
})

const authModel = mongoose.model("user", authSchema)
export default authModel