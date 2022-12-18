import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Instance from "../../Instance";
import Header from "../Admin/Header";
import Context from "../Context/Context";
import { PROFILE_DETAILS } from "../Context/action.type";
import moment from "moment";

const ViewContent = () => {
	const [contentDetails, setContentDetails] = useState(null);
	const [content, setContent] = useState(null);
	const [loader, setLoader] = useState(false);
	const { dispatchDetails } = useContext(Context);
	const history = useHistory();

	useEffect(() => {
		setLoader(true);
		Instance.get(`/api-all-user-view`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("userData", data);
				setContentDetails(data?.userData);
				setContent(data?.userData);
				setLoader(false);
			})
			.catch((err) => {
				console.log("err", err?.response?.data?.messege);
				setLoader(false);
			});
	}, []);

	const DetailsEdit = (Details) => {
		dispatchDetails({
			type: PROFILE_DETAILS,
			payload: { Details },
		});
		history.push(`/edit/content/${Details._id}`);
	};

	const HandelDelite = async (value, e) => {
		setContentDetails(content.filter((temp) => temp._id !== value._id));
		await Instance.delete(`/api-user-delete/${value._id}`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(async () => {
				console.log("Sucesss Delite");
			})
			.catch((err) => {
				console.log("Error in delete", err);
			});
	};

	return (
		<>
			<Header />
			<div className=' d-flex justify-content-center mt-5'>
				<div className='card w-100 loginCard' style={{ maxWidth: "1000px" }}>
					<div className='card-body text-center'>
						<div className='row mb-4 ml-2'>
							<Link
								to='/add/content'
								type='button'
								className='themeButton loginButton'>
								Add
							</Link>
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
										<th scope='col'>First Name</th>
										<th scope='col'>Last Name</th>
										<th scope='col'>Email</th>
										<th scope='col'>Action</th>
									</tr>
								</thead>
								<tbody>
									{contentDetails &&
										contentDetails.map((value, i) => (
											<tr key={i}>
												<td>{i + 1}</td>
												<td>
													{moment(new Date(value?.createdAt)).format(
														"DD/MM/YYYY"
													)}
													<br />

													{new Date(value?.createdAt).toLocaleTimeString()}
												</td>
												<td>{value.firstName}</td>
												<td>{value.lastName}</td>
												<td>{value.email}</td>
												<td>
													<div className='d-flex flex-row p-0 justify-content-center align-items-center'>
														<button
															onClick={() => DetailsEdit(value)}
															type='button'
															className='cardButton cardTypeButton'>
															Edit
														</button>
														<button
															onClick={() => HandelDelite(value)}
															type='button'
															className='cardButton cardTypeButton ml-2'>
															Delete
														</button>{" "}
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

export default ViewContent;
