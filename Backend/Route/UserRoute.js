const express = require("express");
const router = express.Router();
const { myValidations } = require("../Validator/Validator");
const authRoute = require("../Middlewire/UserMiddlewire");
const {
	singleUserView,
	addUser,
	userLogin,
	allUserView,
	userUpdate,
	userDelete,
} = require("../Controller/Login/UserController");

router.post("/api-user-singup", authRoute, myValidations, addUser);
router.post("/api-user-login", userLogin);
router.get("/api-all-user-view", authRoute, allUserView);
router.get("/api-single-user-view", authRoute, singleUserView);
router.put("/api-user-update", authRoute, userUpdate);
router.delete("/api-user-delete/:id", authRoute, userDelete);

module.exports = router;
