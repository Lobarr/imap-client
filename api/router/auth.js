const auth = require('express').Router();
const validator = require('email-validator');
const utils = require('../../helpers/utils');

/**
 * @api {post} /api/v1/init Get token
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 0.0.1
 * @apiParam {string} username Username
 * @apiParam {string} password Password
 * @apiParamExample {json} Example request 
 * {
 *  "email": "example@example.com",
 *  "password": "example"
 * }
 * @apiSuccess {string} token JWT for auth
 * @apiSuccessExample Example data on success:
 * {
 *  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxvYmFyciIsImlhdCI6MTUwNzQzMDQ1Mn0.a09hk0-BTJTa_JwjzAdhIi8mtkMa03cCi9I-u1puJr0"
 * }
 * @apiError (Unauthorized 401) {string} status Error message
 * @apiErrorExample {json} Example data on error:
 * {
 *  "status": "Invalid email"
 * } 
 */
auth.post("/api/v1/init", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        if(validator.validate(email)){
            let token = utils.generateToken(email, password);
            res.send({ token });           
        } else {
            res.status(400).send({
                status: "Invalid email address"
            })
        }
      } else {
        res.status(400).send({ status: "Incomplete Request" });
      }
    } catch (error) {
        res.status(500).send({ status: error.message });
    }
  });

  module.exports = auth;