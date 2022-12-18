import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Instance from "../../Instance";

const SingUp = () => {
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
		Instance.post("/api-admin-singup", {
			firstName: adminDetails.firstName,
			lastName: adminDetails.lastName,
			email: adminDetails.email,
			password: adminDetails.password,
			confirmPassword: adminDetails.confirmPassword,
		})
			.then(({ data }) => {
				console.log("save", data);
				history.push("/admin/login");
			})
			.catch((err) => {
				console.log("Err", err?.response?.data?.messege);
			});
	};

	return (
		<>
			<div>
				<div className='m-5 d-flex justify-content-center '>
					<div className='card w-100 loginCard' style={{ maxWidth: "400px" }}>
						<h2>Sing Up</h2>
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
									<label htmlFor='exampleInputPassword1'>
										Confirm Password
									</label>
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
								<div className='d-flex flex-column p-0 justify-content-center align-items-center'>
									<button
										type='submit'
										className='themeButton loginButton'
										onClick={(e) => onSubmitSignIn(e)}>
										Sing Up
									</button>

									<Link to='/admin/login'>LogIn?</Link>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SingUp;
