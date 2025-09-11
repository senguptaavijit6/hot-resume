import mongoose, { Mongoose } from "mongoose";

class DB {
    async connect() {
        try {
            const dbUri = process.env.DB_URI;
            if (!dbUri) {
                throw new Error("DB_URI environment variable is not defined");
            }
            await mongoose.connect(dbUri);
        } catch (error) {
            console.log("Database Connection Failed", error);
            
        }
    }
}

export default new DB