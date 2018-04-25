require('dotenv').config();
const {NODE_ENV, PORT} = process.env;
// const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const port = PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());

if (NODE_ENV === "dev"){
    app.use(morgan("short"));
}


app.get("/api/v1", (req, res) => {
    res.send({
        status: "running"
    })
})

app.use(require('./api/router/auth'))
app.use(require('./api/router/email'))

app.listen(5002, () => {
    if (NODE_ENV === "dev"){
        console.log(`Server running on port ${port}`)
    }
})



