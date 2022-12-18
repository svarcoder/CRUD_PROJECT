import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Instance from "../../Instance";

const Header = () => {
	const history = useHistory();

	const HandleLogout = () => {
		localStorage.removeItem("token$");
		return history.push("/");
	};

	const [oneview, setOneView] = useState(null);

	useEffect(() => {
		Instance.get(`/api-single-user-view`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("user", data);
				setOneView(data?.userData);
			})
			.catch((err) => {
				console.log("err", err?.response?.data?.messege);
			});
	}, []);

	return (
		<>
			<div className=' d-flex justify-content-center mt-5'>
				<div className='card w-100 loginCard' style={{ maxWidth: "1000px" }}>
					<h2 className='text-left ml-4'>Dashboard</h2>
					<div className='card-body'>
						<nav
							className='navbar navbar-expand-lg navbar-light '
							style={{ backgroundColor: "#e3f2fd" }}>
							<a className='navbar-brand' href='/admin/dashboard'>
								Home
							</a>
							{oneview?.role === "Admin" ? (
								<a className='navbar-brand' href='/view/content'>
									Content-Writer
								</a>
							) : (
								""
							)}
							<a className='navbar-brand' href='/view/blog'>
								Blog
							</a>
							<div className='form-inline my-2 my-lg-0'>
								<a
									href='#'
									className='navbar-brand text-right'
									onClick={(e) => HandleLogout(e)}>
									Log Out
								</a>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
