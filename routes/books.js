const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route :/books
 * Method:Get
 * Description:Getting all books
 * Access:Public
 * Parameters:None
 */

router.get("/", (req, res) => {
    res.status(200).json({
        sucess: true,
        message: "Got all the books",
        data: books,
    })
});
router.get("/issued", (req, res) => {
    const usersWithIssuedBook = users.filter((each) => {
        if (each.issuedBook) return each
    });
    const issuedBooks = [];
    usersWithIssuedBook.forEach((each) => {
        const book = books.find((book) => (book.id === each.issuedBook));

        book.issuedBy = each.name;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    });
    if (issuedBooks.length == 0) {
        return res.status(404).json({
            success: false,
            message: "No Book Have Issued Yet.."
        });

    }
    return res.status(200).json({
        success: true,
        message: "Users with the issued books",
        data: issuedBooks,
    })
});

/**
 * Route :/books/:id
 * Method:Get
 * Description:Getall books by their id
 * Access:Public
 * Parameters:id
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const book = books.find((each) => each.id === id)
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",

        });
    }
    return res.status(200).json({
        success: true,
        message: "Found The Book By Their Id",
        data: book,
    });
});







module.exports = router;