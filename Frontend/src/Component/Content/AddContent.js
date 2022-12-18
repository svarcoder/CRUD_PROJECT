import React, { useState } from "react";
import { useHistory } from "react-router";
import Instance from "../../Instance";
import Header from "../Admin/Header";

const AddContent = () => {
	const history = useHistory();

	const [adminDetails, setAdminDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handelChange = (e) => {
		setAdminDetails({
			...adminDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onSubmitSignIn = (e) => {
		e.preventDefault();
		Instance.post(
			"/api-user-singup",
			{
				firstName: adminDetails.firstName,
				lastName: adminDetails.lastName,
				email: adminDetails.email,
				password: adminDetails.password,
				confirmPassword: adminDetails.confirmPassword,
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
	return (
		<>
			<Header />

			<div className=' d-flex justify-content-center mt-5'>
				<div
					className='card w-100 loginCard mb-5'
					style={{ maxWidth: "1000px" }}>
					<h4>Add Content Writer</h4>
					<div className='card-body text-left'>
						<form>
							<div className='form-group'>
								<label htmlFor='exampleInputEmail1'>First Name</label>
								<input
									type='email'
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
									type='email'
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
								Add Content Writer
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddContent;
