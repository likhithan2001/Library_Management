const express = require("express");


const userRouter = require("./routes/users.js");

const booksRouter = require("./routes/books.js");
const app = express();

const port = 8081;

app.use(express.json());



app.get("/", (req, res) => {
    res.status(200).json({
        message: "server is up and running",
    });
});

app.use("/users", userRouter);
app.use("/books", booksRouter);






app.get("*", (req, res) => {
    res.status(404).json({
        message: "This route does not exist",
    });
});




app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});