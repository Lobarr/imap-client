const email = require("express").Router();
const jwt = require("jsonwebtoken")
const EmailService = require('../controller/email')
const Middlewares = require("../../helpers/middleware")
email.use(Middlewares.auth)

email.post("/api/v1/thread", async (req, res) => {
    try {
        const {from} = req.body;
        const token = req.headers["x-ccp-token"];
        const payload = jwt.decode(token);
        const thread = await EmailService.thread(from, payload);
        res.send(thread)
    } catch (error) {
        res.status(500).send({
            stats: error.message
        })
    }    
})

module.exports = email;