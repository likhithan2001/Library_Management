const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        surname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        issuedBook: {
            type: mongoose.Schema.Types.ObjectId, //it autogenerates the id
            ref: "Book",
            required: false, //user may take or may not

        },
        returnDate: {
            type: "String",
            required: false,
        },
        SubscriptionType: {
            type: "String",
            required: true,
        },
        SubscriptionDate: {
            type: "String",
            required: true,
        }
    },

    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema);