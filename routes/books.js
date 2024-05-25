const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");



const router = express.Router();

const { UserModel, BookModel } = require("../modals/index");

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

/**
 * Route :/
 * Method:post
 * Description: Adding a new book
 * Access:Public
 * Parameters:none
 * Data :id, name ,genre, price, publisher, author
 */
router.post("/", (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Data to Add A Book",
        });
    }
    const book = books.find((each) => each.id === data.id);
    if (book) {
        return res.status(404).json({
            success: false,
            message: "id Already Exists !!"
        })
    }
    const allBooks = {...books, data };
    return res.status(201).json({
        success: true,
        message: "Added Book successfully",
        data: allBooks,
    })
});

/**
 * Route :/:id
 * Method:put
 * Description: updating a book by its id
 * Access:Public
 * Parameters:id
 * Data :id, name ,genre, price, publisher, author
 */
router.put("/updateBook/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const book = books.find((each) => each.id === id)
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found for this Id"
        });
    }
    const updateData = books.map((each) => {
        if (each.id === id) {
            return {...each, ...data };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        message: "updated a Book By their id",
        data: updateData,
    })

})

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