import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Instance from "../../Instance";

const AdminLogin = () => {
	const history = useHistory();

	const [adminDetails, setAdminDetails] = useState({
		email: "",
		password: "",
	});

	const handelChange = (e) => {
		setAdminDetails({
			...adminDetails,
			[e.target.id]: e.target.value,
		});
	};

	const onLogIn = (e) => {
		e.preventDefault();
		Instance.post("/api-admin-login", {
			email: adminDetails.email,
			password: adminDetails.password,
		})
			.then(({ data }) => {
				console.log("save", data);
				sessionStorage.setItem("token$", data?.data?.token);
				history.push("/admin/dashboard");
			})
			.catch((err) => {
				console.log("Err", err?.response?.data?.messege);
			});
	};

	return (
		<>
			<div
				className=' d-flex justify-content-center'
				style={{ marginTop: "10%" }}>
				<div className='card w-100 loginCard' style={{ maxWidth: "400px" }}>
					<h2>Log In</h2>
					<div className='card-body text-left'>
						<form>
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
							<div className='d-flex flex-column p-0 justify-content-center align-items-center'>
								<button
									type='submit'
									className='themeButton loginButton'
									onClick={(e) => onLogIn(e)}>
									Log In
								</button>

								<Link to='/admin/singup'>SingUP?</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminLogin;
