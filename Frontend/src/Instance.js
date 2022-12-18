/** @format */

import axios from "axios";

const Instance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
});

export default Instance;
