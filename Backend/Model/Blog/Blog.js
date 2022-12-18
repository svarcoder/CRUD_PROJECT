/** @format */

const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema(
	{
		blogTitle: {
			type: String,
			default: "",
			required: true,
		},
		blogDescription: {
			type: String,
			default: "",
			required: true,
		},
		blogImage: {
			type: String,
			default: "",
			required: true,
		},
		status: {
			type: Boolean,
			default: false,
			required: true,
		},
		userId: {
			type: ObjectId,
			ref: "users",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("blog", blogSchema);
