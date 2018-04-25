require('dotenv').config();
const jwt = require('jsonwebtoken');

const Middlewares = {
    async auth(req, res, next){
        try {
            const token = req.headers["x-ccp-token"];
            if(!token){
                return res.status(401).send({
                    status: "No token passed"
                });
            }
            return next();    
        } catch (error) {
            console.log(error.message);
            return res.status(500).send({
                status: error.message
            });
        }
    }
}

module.exports = Middlewares;