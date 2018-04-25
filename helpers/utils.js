require("dotenv").config()
const {JWT_SECRET} = process.env
const jwt = require("jsonwebtoken");
const Utils = {
    generateToken(email, password){
        const payload = {email, password};
        return jwt.sign(payload, JWT_SECRET, {
            algorithm: "HS256"
        })
    }
}

module.exports = Utils;