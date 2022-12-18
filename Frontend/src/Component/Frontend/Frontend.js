import React, { useEffect, useState } from "react";
import Instance from "../../Instance";

const Frontend = () => {
	const [blogData, setBlogData] = useState(null);

	useEffect(() => {
		Instance.get(`/api-get-approved-blog`, {
			headers: { authorization: `Bearer ${sessionStorage.getItem("token$")}` },
		})
			.then(({ data }) => {
				console.log("userData", data);
				setBlogData(data?.data);
			})
			.catch((err) => {
				console.log("err", err?.response?.data?.messege);
			});
	}, []);

	return (
		<>
			<div className='row mx-0'>
				{blogData &&
					blogData.map((value, i) => (
						<div className=' d-flex justify-content-center mt-5 ml-4' key={i}>
							<div
								className='card w-100 loginCard'
								style={{ maxWidth: "400px" }}>
								<h2>{value.blogTitle}</h2>
								<img
									src={`http://localhost:5005/Images/${value.blogImage}`}
									className='card-img-top'
									alt='...'
									style={{ height: "100px", width: "200px" }}
								/>
								<div className='card-body text-left'>
									{value.blogDescription}
								</div>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Frontend;
