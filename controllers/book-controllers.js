const { UserModel, BookModel } = require("../modals/index");
const IssuedBook = require("../dtos/book-dto");

exports.getAllBooks = async(req, res) => {
    const books = await BookModel.find();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Book Found"
        })
    }
    res.status(200).json({
        success: true,
        data: books,
    })
};

exports.getSingleBookById = async(req, res) => {
    const { id } = req.params;
    const book = await BookModel.findById(id);

    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book Not Found",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Found the Book By their Id",
        data: book,
    });
};

// const usersWithIssuedBook = users.filter((each) => {
//     if (each.issuedBook) return each
// });
// const issuedBooks = [];
// usersWithIssuedBook.forEach((each) => {
//     const book = books.find((book) => (book.id === each.issuedBook));

//     book.issuedBy = each.name;
//     book.issuedDate = each.issuedDate;
//     book.returnDate = each.returnDate;

//     issuedBooks.push(book);
// });
// if (issuedBooks.length == 0) {
//     return res.status(404).json({
//         success: false,
//         message: "No Book Have Issued Yet.."
//     });

// }
// return res.status(200).json({
//     success: true,
//     message: "Users with the issued books",
//     data: issuedBooks,
// })


exports.getAllIssuedBooks = async(req, res) => {
    const users = await UserModel.find({
        issuedBook: { $exists: true },
    }).populate("issuedBook");

    const IssuedBook = users.map((each) => new IssuedBook(each));




    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Book Have Issued Yet.."
        });

    }
    return res.status(200).json({
        success: true,
        message: "Users with the issued books",
        data: issuedBooks,
    });

};


exports.addNewBook = async(req, res) => {
    const { data } = req.body;

    if (!data) {
        return res.status(400).json({
            success: false,
            message: "No Data to Add a Book",
        })
    };
    await BookModel.create(data);
    const allBooks = await BookModel.find();

    return res.status(201).json({
        success: true,
        message: "Added Book Successfully",
        data: allBooks,
    });
}

exports.updateBookById = async(req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const updateBook = await BookModel.findOneAndUpdate({
            _id: id,
        },
        data, {
            new: true,

        });
    return res.status(200).json({
        success: true,
        message: "Updated a Book by Their Id",
        data: updateBook,
    });


};