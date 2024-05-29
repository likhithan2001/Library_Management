const express = require("express");
const { getAllUsers, getSingleUserById, deleteUser, updateUserData, createNewUser, getSubscriptionDetailsById } = require("../controllers/user-controllers");
const { users } = require("../data/users.json");

const { UserModel, BookModel } = require("../modals/index");
const router = express.Router();

/**
 * Route :/users
 * Method:Get
 * Description:Get all users users
 * Access:Public
 * Parameters:None
 */
router.get("/", getAllUsers);

/** http://localhost:8081/users/2
 * Route: /users/:id
 * Method:Get
 * Description:Get single user by thier id
 * Access:Public
 * Parameters:id
 */

router.get("/:id", getSingleUserById);

//  Route: /users
//   Method:POST -> passing certain information
//   Description:creating a new user
//   Access:Public
//   Parameters:none

router.post("/", createNewUser);
//  Route: /users/id
//   Method:PUT
//   Description:updating user by their id
//   Access:Public
//   Parameters:id

router.put("/:id", updateUserData);

//  Route: /users/id
//   Method:DELETE
//   Description:Deleting user by their id
//   Access:Public
//   Parameters:id

router.delete("/:id", deleteUser);



//  Route: /users/subscription-details/:id
//   Method:get
//   Description:Get all  users subscription details
//   Access:Public
//   Parameters:id

router.get("/subscription-details/:id", getSubscriptionDetailsById);



module.exports = router;