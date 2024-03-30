const express = require("express");
const { users } = require("./data/users.json");

const app = express();

const port = 8081;

app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up and running",
    });
});

/**
 * Route :/users
 * Method:Get
 * Description:Get all users users
 * Access:Public
 * Parameters:None
 */
app.get("/users", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist",
    });
});



app

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});