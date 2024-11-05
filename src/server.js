const express = require("express");
const { User } = require("./models/UserModel");
const { generateJWT, validateUserAuth } = require("./functions/jwtFunctions");

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

app.post("/signup", async(request, response) => {
    // check that a username and password are provided in request.body
    let username = request.body.username;
    let password = request.body.password;

    if (!username || !password) {
        response.status(400).json({
            message: "Incorrect or missing sign-up creditials provided."
        });
    }

    // make a user in the DB using the username and password
    let newUser = await User.create({username: username, password: password});

    // make a JSW based on the username and userID
    let newJwt = generateJWT(newUser.id, newUser.username);

    // return the JWT
    response.json({
        jwt: newJwt,
        user: {
            id: newUser.id,
            username: newUser.username
        }
    });
});

app.get("/protectedRoute", validateUserAuth, (request, response) => {
    response.json({
        message: "You can see protected content because you're signed in!!"
    });
});

module.exports = {
    app
}