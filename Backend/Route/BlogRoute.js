const express = require("express");
const {
	addBlog,
	viewAllBlog,
	viewSingleBlog,
	editBlog,
	deleteBlog,
	approvedBlog,
	viewApprovedBlog,
} = require("../Controller/Blog/BlogController");
const router = express.Router();
const authRoute = require("../Middlewire/UserMiddlewire");

router.post("/api-add-blog", authRoute, addBlog);
router.get("/api-get-all-blog", authRoute, viewAllBlog);
router.get("/api-get-approved-blog", viewApprovedBlog);
router.get("/api-get-user-blog/:id", authRoute, viewSingleBlog);
router.put("/api-update-single-blog", authRoute, editBlog);
router.delete("/api-delete-blog/:id", authRoute, deleteBlog);
router.put("/api-approved-blog/:id", authRoute, approvedBlog);

module.exports = router;
