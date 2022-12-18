import React from "react";
import { Route, Switch } from "react-router";
import AdminDashboard from "../Component/Admin/AdminDashboard";
import AdminLogin from "../Component/Admin/AdminLogin";
import SingUp from "../Component/Admin/SingUp";
import AddBlog from "../Component/Blog/AddBlog";
import EditBlog from "../Component/Blog/EditBlog";
import ViewAllBlog from "../Component/Blog/ViewAllBlog";
import AddContent from "../Component/Content/AddContent";
import ContentLogin from "../Component/Content/ContentLogin";
import EditContent from "../Component/Content/EditContent";
import ViewContent from "../Component/Content/ViewContent";
import Frontend from "../Component/Frontend/Frontend";

const HomeRoute = () => {
	return (
		<>
			<Switch>
				<Route exact path='/' component={Frontend}></Route>
				<Route exact path='/admin/login' component={AdminLogin}></Route>
				<Route exact path='/admin/singup' component={SingUp}></Route>
				<Route exact path='/admin/dashboard' component={AdminDashboard}></Route>
				<Route exact path='/add/content' component={AddContent}></Route>
				<Route exact path='/view/content' component={ViewContent}></Route>
				<Route exact path='/edit/content/:id' component={EditContent}></Route>
				<Route exact path='/add/blog/:id' component={AddBlog}></Route>
				<Route exact path='/view/blog' component={ViewAllBlog}></Route>
				<Route exact path='/edit/blog/:id' component={EditBlog}></Route>
				<Route exact path='/login/content' component={ContentLogin}></Route>
			</Switch>
		</>
	);
};

export default HomeRoute;
