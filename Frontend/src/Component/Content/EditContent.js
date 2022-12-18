import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";
import Instance from "../../Instance";
import Header from "../Admin/Header";
import Context from "../Context/Context";

const EditContent = () => {
	const { details } = useContext(Context);

	const history = useHistory();

	const [adminDetails, setAdminDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	useEffect(() => {
		if (!details) return;
		setAdminDetails({
			firstName: details?.Details?.firstName,
			lastName: details?.Details?.lastName,
			email: details?.Details?.email,
			password: details?.Details?.password,
			confirmPassword: details?.Details?.confirmPassword,
		});
	}, [details]);

	const handelChange = (e) => {
		setAdminDetails({
			...adminDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();
		Instance.put(
			"/api-user-update",
			{
				firstName: adminDetails.firstName,
				lastName: adminDetails.lastName,
				email: adminDetails.email,
				password: adminDetails.password,
				confirmPassword: adminDetails.confirmPassword,
				_id: details?.Details?._id,
			},
			{
				headers: {
					authorization: `Bearer ${sessionStorage.getItem("token$")}`,
				},
			}
		)
			.then(({ data }) => {
				console.log("save", data);
				history.push("/view/content");
			})
			.catch((err) => {
				console.log("Err", err?.response?.data?.messege);
			});
	};

	if (details == null) {
		return <Redirect to='/view/content' />;
	}

	return (
		<>
			<Header />
			<div className=' d-flex justify-content-center mt-5'>
				<div
					className='card w-100 loginCard mb-5'
					style={{ maxWidth: "1000px" }}>
					<h4>Edit Content Writer</h4>
					<div className='card-body text-left'>
						<form>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>First Name</label>
								<input
									type='text'
									className='form-control'
									aria-describedby='emailHelp'
									id='firstName'
									placeholder='First Name'
									value={adminDetails.firstName}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Last Name</label>
								<input
									type='text'
									className='form-control'
									aria-describedby='emailHelp'
									id='lastName'
									placeholder='Last Name'
									value={adminDetails.lastName}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>Email address</label>
								<input
									type='email'
									className='form-control'
									aria-describedby='emailHelp'
									id='email'
									placeholder='Email'
									value={adminDetails.email}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputPassword1'>Password</label>
								<input
									type='password'
									className='form-control'
									id='password'
									placeholder='*****'
									value={adminDetails.password}
									onChange={handelChange}
									autoComplete='off'
								/>
							</div>
							<div className='form-group'>
								<label htmlFor='exampleInputPassword1'>Confirm Password</label>
								<input
									type='password'
									className='form-control'
									id='confirmPassword'
									placeholder='*****'
									value={adminDetails.confirmPassword}
									onChange={handelChange}
									autoComplete='off'
								/>
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

export default EditContent;
