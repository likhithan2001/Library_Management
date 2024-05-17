const express = require("express");
const { users } = require("../data/users.json");
const router = express.Router();

/**
 * Route :/users
 * Method:Get
 * Description:Get all users users
 * Access:Public
 * Parameters:None
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: users,
    });
});

/** http://localhost:8081/users/2
 * Route: /users/:id
 * Method:Get
 * Description:Get single user by thier id
 * Access:Public
 * Parameters:id
 */

router.get("/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User does not exit"
        });
    }
    return res.status(200).json({
        success: true,
        message: "User Found",
        data: user,
    })
});

//  Route: /users
//   Method:POST -> passing certain information
//   Description:creating a new user
//   Access:Public
//   Parameters:none

router.post("/", (req, res) => {
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body

    const user = users.find((each) => each.id === id);

    if (user) {
        return res.status(404).json({
            success: false,
            message: "User with the ID Exists",
        });
    }

    users.push({
        id,
        name,
        surname,
        email,
        subscriptionType,
        subscriptionDate,

    });
    return res.status(201).json({
        success: true,
        message: "User added successfully",
        data: users
    })

});
//  Route: /users/id
//   Method:PUT
//   Description:updating user by their id
//   Access:Public
//   Parameters:id

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "user does not exist",
        });
    }
    const updateUserData = users.map((each) => {
        if (each.id === id) {
            return {
                ...each, //each and everything in the field
                ...data, //geting it from the body (request)
            };
        }
        return each;
    });
    return res.status(200).json({
        success: true,
        message: "User Updated",
        data: updateUserData
    })
});

//  Route: /users/id
//   Method:DELETE
//   Description:Deleting user by their id
//   Access:Public
//   Parameters:id

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User does not exist"
        });
    }
    const index = users.indexOf(user);
    users.splice(index, 1) // remove index 

    return res.status(200).json({
        success: true,
        message: "Deleted User..",
        data: users
    })

})

module.exports = router;