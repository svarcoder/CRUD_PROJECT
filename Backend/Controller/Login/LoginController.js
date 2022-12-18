/** @format */

const express = require("express");
const router = express.Router();
const Admin = require("../../Model/Login/User");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.addAdmin = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			messege: errors.array(),
		});
	}
	if (req.body.password != req.body.confirmPassword) {
		return res.status(422).json({
			success: false,
			messege: "Password & Confirm Password does't Match",
		});
	}

	const hashedPassword = await bcrypt.hash(req.body.password, 10);

	const { firstName, lastName, email } = req.body;

	let newUser = new Admin({
		firstName,
		lastName,
		email,
		role: "Admin",
		password: hashedPassword,
		confirmPassword: hashedPassword,
	});

	await newUser
		.save()
		.then((result) => {
			return res.status(201).json({
				success: true,
				messege: "Sing Up Successfully",
				data: result,
			});
		})
		.catch((err) => {
			console.log("error", err);
			return res.status(400).json({
				success: false,
				messege: "Something Went Wrong",
			});
		});
};

exports.adminLogin = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).json({
			success: false,
			message: "User Details is Not in DB",
			data: {},
		});
	}

	let tempMail = email.toLowerCase();
	await Admin.findOne({ email: tempMail })
		.then((saveUser) => {
			if (!saveUser) {
				return res.status(422).json({
					success: false,
					message: "User Details is not Valid",
					data: {},
				});
			}

			bcrypt
				.compare(password, saveUser.password)
				.then((isMatch) => {
					if (!isMatch) {
						return res.status(422).json({
							success: false,
							message: "User Details is not Match",
							data: {},
						});
					}

					let token = jwt.sign({ _id: saveUser._id }, "char@123_char$1234");

					return res.status(200).json({
						success: true,
						message: "User details fetch successfully",
						data: {
							token,
							data: saveUser,
						},
					});
				})
				.catch((error) => {
					console.log("Error in admin find ", error);
					return res.status(500).json({
						success: false,
						message: "Something Went Wrong",
						data: {},
					});
				});
		})
		.catch((error) => {
			console.log("Error in user yy  find ", error);
			return res.status(500).json({
				success: false,
				message: "Error in User find",
				data: {},
			});
		});
};
