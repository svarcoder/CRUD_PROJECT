const express = require("express");
const router = express.Router();
const Blog = require("../../Model/Blog/Blog");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { ObjectID } = require("mongodb");
const multer = require("multer");
const path = require("path");

let objectId = mongoose.Types.ObjectId;

exports.addBlog = async (req, res) => {
	let blogStorage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "./Public/Blog");
		},
		filename: function (req, file, cb) {
			cb(
				null,
				file.fieldname + "-" + Date.now() + path.extname(file.originalname)
			);
		},
	});

	let upload = multer({ storage: blogStorage }).fields([
		{ name: "blogImage", maxCount: 1 },
	]);

	upload(req, res, async (errorFile) => {
		const { blogImage, blogTitle, blogDescription } = req.body;
		let Id = req.body.id;

		let blogId = objectId(Id);
		console.log("blogImage", req.files.blogImage);

		if (errorFile) {
			console.log("Error in Image Upload ", errorFile);
			return res.status(500).json({
				success: false,
				message: "The File is Not Get",
				data: {},
			});
		} else {
			console.log("blogImage111", blogImage);
			const imageFile =
				req.files.blogImage != undefined
					? req.files.blogImage[0].filename
					: blogImage;
			let newBlog = new Blog({
				blogTitle,
				blogDescription,
				blogImage: imageFile,
				userId: blogId,
			});

			newBlog
				.save()
				.then(() => {
					return res.status(201).json({
						success: true,
						message: "Blog Added Succesfully",
						data: {},
					});
				})
				.catch((err) => {
					console.log("Error in upload pdf", err);
					return res.status(400).json({
						success: false,
						message: "Error in Upload Image",
						data: {},
					});
				});
		}
	});
};

exports.viewAllBlog = async (req, res) => {
	Blog.find()
		.then((result) => {
			return res.status(201).json({
				success: true,
				message: "Blog Fetch Succesfully",
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({
				success: false,
				message: "Error in Blog View",
				data: {},
			});
		});
};

exports.viewApprovedBlog = async (req, res) => {
	Blog.find({ status: true })
		.then((result) => {
			return res.status(201).json({
				success: true,
				message: "Approved Blog Fetch Succesfully",
				data: result,
			});
		})
		.catch((err) => {
			console.log(err);
			return res.status(400).json({
				success: false,
				message: "Error in Blog View",
				data: {},
			});
		});
};

exports.viewSingleBlog = async (req, res) => {
	let Id = req.params.id;

	let blogId = objectId(Id);

	Blog.find({ userId: blogId })
		.then((result) => {
			return res.status(201).json({
				success: true,
				messege: "Single Blog Fetch Successfully",
				data: result,
			});
		})
		.catch((err) => {
			return res.status(404).json({
				success: false,
				messege: "Error in API",
				error: err,
			});
		});
};

exports.editBlog = async (req, res) => {
	let blogStorage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, "./Public/Blog");
		},
		filename: function (req, file, cb) {
			cb(
				null,
				file.fieldname + "-" + Date.now() + path.extname(file.originalname)
			);
		},
	});

	let upload = multer({ storage: blogStorage }).fields([
		{ name: "blogImage", maxCount: 1 },
	]);

	upload(req, res, async (errorFile) => {
		const { blogImage, blogTitle, blogDescription } = req.body;
		let Id = req.body._id;

		let blogId = objectId(Id);

		console.log("blogImage", req.files.blogImage);

		if (errorFile) {
			console.log("Error in Image Upload ", errorFile);
			return res.status(500).json({
				success: false,
				message: "The File is Not Get",
				data: {},
			});
		} else {
			// console.log("blogImage111", blogImage);
			const ImageDetails = await Blog.findById({ _id: blogId }).catch((err) =>
				console.error(err)
			);

			const imageFile =
				req.files.blogImage != undefined
					? req.files.blogImage[0].filename
					: ImageDetails?.blogImage;

			console.log("====================================");
			console.log("AAAA", ImageDetails);
			console.log("====================================");

			await Blog.findByIdAndUpdate(
				{ _id: blogId },
				{
					blogTitle,
					blogDescription,
					blogImage: imageFile,
				}
			)
				.then((result) => {
					return res.status(201).json({
						success: true,
						messege: "Blog Updated Succesfully",
						data: result,
					});
				})
				.catch((err) => {
					console.log("error", err);
					return res.status(400).json({
						success: false,
						messege: "Error in Upload Image",
					});
				});
		}
	});
};

exports.deleteBlog = async (req, res) => {
	let Id = req.params.id;

	let blogId = objectId(Id);

	Blog.findByIdAndDelete({ _id: blogId })
		.then((result) => {
			return res.status(201).json({
				success: true,
				messege: "Blog Deleted Successfully",
				data: result,
			});
		})
		.catch((err) => {
			console.log("error", err);
			return res.status(400).json({
				success: false,
				messege: "Error in Delete",
			});
		});
};

exports.approvedBlog = async (req, res) => {
	let Id = req.params.id;

	let blogId = objectId(Id);

	Blog.findByIdAndUpdate(
		{ _id: blogId },
		{
			status: true,
		}
	)
		.then((result) => {
			return res.status(201).json({
				success: true,
				messege: "Blog Activated Successfully",
				data: result,
			});
		})
		.catch((err) => {
			console.log("error", err);
			return res.status(400).json({
				success: false,
				messege: "Error in Activated",
			});
		});
};
