import React from "react";
import Header from "./Header";

const AdminDashboard = () => {
	return (
		<>
			<Header />
			<div className=' d-flex justify-content-center mt-5'>
				<div className='card w-100 loginCard' style={{ maxWidth: "1000px" }}>
					<div className='card-body text-center'>
						<h2>Welcome to Dashboard</h2>
					</div>
				</div>
			</div>
		</>
	);
};

export default AdminDashboard;
