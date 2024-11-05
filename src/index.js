// module.exports = {app}
const {app} = require("./server.js");

// module.exports = app;
// const app = require();

require("dotenv").config();
// const dotenv = require("dotenv");
// dotenv.config();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});