const express = require("express");
const router = new express.Router();
const controllers = require("../controllers/userControllers");


router.get('/get-users', controllers.getUsers);
router.get('/get-user/:id', controllers.getUser);
router.put('/update-user/:id', controllers.updateUser);
router.delete('/delete-user/:id', controllers.deleteUser);

module.exports = router;