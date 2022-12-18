import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Instance from "../../Instance";
import Header from "../Admin/Header";
import Context from "../Context/Context";
import { BLOG_DETAILS } from "../Context/action.type";
import moment from "moment";

const ViewAllBlog = () => {
	const history = useHistory();
	const [oneview, setOneView] = useState(null);
	const [blog, setBlog] = useState(null);
	const [blogDetails, setBlogDetails] = useState(null);
	const { dispatchDetails } = useContext(Context);
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setLoader(true);
		Instance.get(`/api-single-user-view`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("user", data);
				setOneView(data?.userData);
				if (data?.userData?.role === "Admin") {
					Instance.get(`/api-get-all-blog`, {
						headers: {
							authorization: `Bearer ${sessionStorage.getItem("token$")}`,
						},
					})
						.then(({ data }) => {
							console.log("user", data);
							setBlog(data?.data);
							setBlogDetails(data?.data);
							setLoader(false);
						})
						.catch((err) => {
							console.log("err", err?.response?.data?.messege);
						});
				} else {
					Instance.get(`/api-get-user-blog/${data?.userData._id}`, {
						headers: {
							authorization: `Bearer ${sessionStorage.getItem("token$")}`,
						},
					})
						.then(({ data }) => {
							console.log("user", data);
							setBlog(data?.data);
							setBlogDetails(data?.data);
							setLoader(false);
						})
						.catch((err) => {
							console.log("err", err?.response?.data?.messege);
							setLoader(false);
						});
				}
			})
			.catch((err) => {
				console.log("err", err?.response?.data?.messege);
				setLoader(false);
			});
	}, []);

	const AddBlog = () => {
		history.push(`/add/blog/${oneview?._id}`);
	};

	const DetailsEdit = (Details) => {
		dispatchDetails({
			type: BLOG_DETAILS,
			payload: { Details },
		});
		history.push(`/edit/blog/${Details._id}`);
	};

	const HandelDelite = async (value, e) => {
		setBlog(blogDetails.filter((temp) => temp._id !== value._id));
		await Instance.delete(`/api-delete-blog/${value._id}`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(async () => {
				console.log("Sucesss Delite");
			})
			.catch((err) => {
				console.log("Error in delete", err);
			});
	};

	const updateStatus = (value) => {
		let __temp = [...blog];

		__temp.forEach((temp, i) => {
			if (temp?._id === value?._id) {
				__temp[i].status = !__temp[i].status;
			}
		});
		setBlog(__temp);
	};

	const Approved = async (value, e) => {
		updateStatus(value);
		await Instance.put(
			`/api-approved-blog/${value._id}`,
			{
				data: "",
			},
			{
				headers: {
					authorization: `Bearer ${sessionStorage.getItem("token$")}`,
				},
			}
		)
			.then(async () => {
				console.log("Sucesss Update");
			})
			.catch((err) => {
				console.log("Error in delete", err);
				updateStatus(value);
			});
	};

	return (
		<>
			<Header />
			<div className=' d-flex justify-content-center mt-5'>
				<div className='card w-100 loginCard' style={{ maxWidth: "1000px" }}>
					<div className='card-body text-center'>
						<div className='row mb-4 ml-2'>
							<button
								onClick={() => AddBlog()}
								type='button'
								className='themeButton loginButton'>
								Add
							</button>
						</div>
						{loader ? (
							<div className='d-flex justify-content-center'>
								<div className='spinner-border' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							</div>
						) : (
							<table className='table'>
								<thead>
									<tr>
										<th scope='col'>Id</th>
										<th scope='col'>Date & Time</th>
										<th scope='col'>Title</th>
										<th scope='col'>Description</th>
										<th scope='col'>Image</th>
										<th scope='col'>Action</th>
									</tr>
								</thead>
								<tbody>
									{blog &&
										blog.map((item, i) => (
											<tr key={i}>
												<td>{i + 1}</td>
												<td>
													{moment(new Date(item?.createdAt)).format(
														"DD/MM/YYYY"
													)}
													<br />

													{new Date(item?.createdAt).toLocaleTimeString()}
												</td>
												<td>{item.blogTitle}</td>
												<td>{item.blogDescription}</td>
												<td>
													{" "}
													<img
														src={`http://localhost:5005/Images/${item.blogImage}`}
														alt='N/A'
														style={{ height: "50px" }}
													/>
												</td>
												<td>
													<div className='d-flex flex-row p-0 justify-content-center align-items-center'>
														<button
															type='button'
															className='cardButton cardTypeButton'
															onClick={() => DetailsEdit(item)}>
															Edit
														</button>
														<button
															type='button'
															className='cardButton cardTypeButton ml-2 '
															onClick={() => HandelDelite(item)}>
															Delete
														</button>
														{oneview?.role === "Admin" &&
														item?.status === false ? (
															<button
																type='button'
																className='cardButton cardTypeButton ml-2 '
																onClick={() => Approved(item)}>
																Approved
															</button>
														) : (
															""
														)}
													</div>
												</td>
											</tr>
										))}
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewAllBlog;
