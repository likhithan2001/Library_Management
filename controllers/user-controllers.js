const { UserModel, BookModel } = require("../modals/index");

exports.getAllUsers = async(req, res) => {
    const users = await UserModel.find();

    if (users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No users Found in the database"
        });
    }
    res.status(200).json({
        success: true,
        message: "These are the user info",
        data: users,
    });
};

exports.getSingleUserById = async(req, res) => {
    const { id } = req.params;
    const user = await UserModel.findById({ _id: id });
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Does Not Exist",
        });
    }
    return res.status(200).json({
        success: true,
        message: "User Found",
        data: user,
    });
}

exports.createNewUser = async(req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;
}

exports.updateUserData = async(req, res) => {
    const { id } = req.params;
    const { data } = req.body;
    const updatedUserData = await UserModel.findOneAndUpdate({ _id: id }, {
        $Set: {
            ...data
        }
    }, {
        new: true
    });
    return res.status(200).json({
        success: true,
        message: "User Updated !!",
        data: updatedUserData,
    })

}

exports.deleteUser = async(req, res) => {
    const { id } = req.params;
    const user = await UserModel.deleteOne({ _id: id });

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User Does Not Exist",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Deleted User..",
        data: user,
    })
};

exports.getSubscriptionDetailsById = async(req, res) => {
    const { id } = req.params;
    // find({_id:id})
    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User With The ID Didnt Exist",
        });
    }

    const getDateInDays = (data = "") => {
        let date;
        if (data === "") {
            date = new Date();
        } else {
            date = new Date(data);
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;
    };

    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "Standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    };
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
        ...user,
        isSubscriptionExpired: subscriptionExpiration < currentDate,
        daysLeftForExpiration: subscriptionExpiration <= currentDate ?
            0 :
            subscriptionExpiration - currentDate,
        fine: returnDate < currentDate ?
            subscriptionExpiration <= currentDate ?
            100 :
            50 :
            0,
    };
    return res.status(200).json({
        success: true,
        message: "Subscription detail for the user is: ",
        data,
    });
}