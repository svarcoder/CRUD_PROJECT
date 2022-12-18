import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import Instance from "../../Instance";
import Header from "../Admin/Header";
import Context from "../Context/Context";

const EditBlog = () => {
	const { details } = useContext(Context);

	const history = useHistory();

	const [adminDetails, setAdminDetails] = useState({
		blogTitle: "",
		blogDescription: "",
		blogImage: null,
	});

	useEffect(() => {
		if (!details) return;
		setAdminDetails({
			blogTitle: details?.Details?.blogTitle,
			blogDescription: details?.Details?.blogDescription,
		});
	}, [details]);

	const handelChange = (e) => {
		e.preventDefault();
		if (e.target.id === "photo") {
			let file = e.target.files[0];
			setAdminDetails((prevState) => {
				return {
					...prevState,
					blogImage: file,
				};
			});
		} else {
			setAdminDetails({
				...adminDetails,
				[e.target.id]: e.target.value,
			});
		}
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();
		let data = new FormData();

		data.append("blogImage", adminDetails.blogImage);
		data.append("blogTitle", adminDetails.blogTitle);
		data.append("blogDescription", adminDetails.blogDescription);
		data.append("_id", details?.Details?._id);

		Instance.put(`/api-update-single-blog`, data, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("save", data);
				history.push("/view/blog");
			})
			.catch((err) => {
				console.log("Err", err?.response?.data?.messege);
			});
	};

	if (details == null) {
		return <Redirect to='/view/blog' />;
	}

	return (
		<>
			<Header />
			<div className=' d-flex justify-content-center mt-5'>
				<div
					className='card w-100 loginCard mb-5'
					style={{ maxWidth: "1000px" }}>
					<h4>Edit Blog</h4>
					<div className='card-body text-left'>
						<form>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Title</label>
								<input
									type='email'
									className='form-control'
									aria-describedby='emailHelp'
									id='blogTitle'
									placeholder='Title'
									value={adminDetails.blogTitle}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Description</label>
								<input
									type='email'
									className='form-control'
									aria-describedby='emailHelp'
									id='blogDescription'
									placeholder='Description'
									value={adminDetails.blogDescription}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>
							<div className='input-group mb-3'>
								<div className='input-group-prepend'>
									<span className='input-group-text' id='inputGroupFileAddon01'>
										Upload
									</span>
								</div>
								<div className='custom-file'>
									<input
										type='file'
										className='custom-file-input'
										aria-describedby='inputGroupFileAddon01'
										id='photo'
										onChange={handelChange}
										accept='image/*'
									/>
									<label
										className='custom-file-label'
										htmlFor='inputGroupFile01'>
										Choose file
									</label>
								</div>
							</div>

							<button
								type='submit'
								className='themeButton loginButton'
								onClick={(e) => onSubmitSignIn(e)}>
								Update
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default EditBlog;
