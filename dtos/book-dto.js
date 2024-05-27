class IssuedBook {
    _id;
    name;
    genre;
    price;
    publisher;
    issuedBy;
    issuedDate;
    returnDate;


    //Whenever we create obj, the constructor gets invoked - Parameterized constructor

    constructor(user) {
        this._id = user.IssuedBook._id;
        this.name = user.IssuedBook.name;
        this.genre = user.IssuedBook.genre;
        this.price = user.IssuedBook.price;
        this.publisher = user.IssuedBook.publisher;
        this.issuedBy = user.issuedBy;
        this.issuedDate = user.issuedDate;
        this.returnDate = user.returnDate;
    }

}

module.exports = IssuedBook;