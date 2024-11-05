const express = require("express");

const app = express();

app.use(express.json());

// Enable this if you want front-end to have more freedom about hwo they make requests
// eg. this is for HTML URL-encoded forms
// app.use(express.urlencoded({extended: true}));

app.get("/", (request, response) => {
    response.json({
        message: "Hello, world!!"
    });
});

module.exports = {
    app
}