import configureGoogleStrategy from "../middlewares/auth/strategies/google.js";
import configureJWTStrategy from "../middlewares/auth/strategies/jwt.js";


export default function initializePassport() {
    configureJWTStrategy();
    configureGoogleStrategy();
}