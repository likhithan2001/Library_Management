const express = require("express");
const { getAllBooks, getSingleBookById, getAllIssuedBooks, addNewBook, updateBookById } = require("../controllers/book-controllers.js");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");



const router = express.Router();

const { UserModel, BookModel } = require("../modals/index");
const { getAllBook } = require("../controllers/book-controllers");

/**
 * Route :/books
 * Method:Get
 * Description:Getting all books
 * Access:Public
 * Parameters:None
 */

router.get("/", getAllBooks);


router.get("/issued", getAllIssuedBooks);

/**
 * Route :/books/:id
 * Method:Get
 * Description:Getall books by their id
 * Access:Public
 * Parameters:id
 */

router.get("/:id", getSingleBookById);

/**
 * Route :/
 * Method:post
 * Description: Adding a new book
 * Access:Public
 * Parameters:none
 * Data :id, name ,genre, price, publisher, author
 */
router.post("/", addNewBook);

/**
 * Route :/:id
 * Method:put
 * Description: updating a book by its id
 * Access:Public
 * Parameters:id
 * Data :id, name ,genre, price, publisher, author
 */
router.put("/updateBook/:id", updateBookById)

// router.put("/updateBook/:id", (req, res) => {
//     const { id } = req.params;
//     const { data } = req.body;

//     const book = users.find((each) => each.id === id);
//     if (!book) {
//         return res.status(404).json({
//             success: false,
//             message: "Book does not exist",
//         });
//     }
//     const updateBookData = users.map((each) => {
//         if (each.id === id) {
//             return {
//                 ...each, //each and everything in the field
//                 ...data, //geting it from the body (request)
//             };
//         }
//         return each;
//     });
//     return res.status(200).json({
//         success: true,
//         message: "Book Updated",
//         data: updateBookData
//     })
// });




module.exports = router;