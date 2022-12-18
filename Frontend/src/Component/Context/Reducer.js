/** @format */

import { PROFILE_DETAILS, BLOG_DETAILS } from "./action.type";
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
	switch (action.type) {
		case PROFILE_DETAILS:
			return (state = action.payload);
		case BLOG_DETAILS:
			return (state = action.payload);

		default:
			return state;
	}
};
