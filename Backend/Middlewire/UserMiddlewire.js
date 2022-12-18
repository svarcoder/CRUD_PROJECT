/** @format */

const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const AdminDetails = mongoose.model('admindetails')
const Customer = require("../Model/Login/User");
let ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = (req, res, next) => {
	const { authorization } = req.headers;

	if (!authorization) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized 1",
			data: {},
		});
	}

	let token = authorization.replace("Bearer ", "");

	jwt.verify(token, "char@123_char$1234", (err, decoded) => {
		if (!decoded || err) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized 2",
				data: {},
			});
		}

		let _id = decoded._id;
		Customer.findById({ _id })
			.then((result) => {
				if (result == undefined || result == null) {
					return res.status(401).json({
						success: false,
						message: "Unauthorized rr 3",
						data: {},
					});
				}
				req.user = result;
				next();
			})
			.catch((err) => {
				console.log("problem with admin fetching ", err);
				return res.status(500).json({
					success: false,
					message: "problem with admin fetching",
					data: {},
				});
			});
	});
};
