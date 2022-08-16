import React, { useContext } from "react";
import { getMyPosts } from "../api/post";
import AuthContext from "../context/auth/AuthContext";

import CardGrid from "./CardGrid";

const YourPosts = () => {
	const { authToken } = useContext(AuthContext);

	const [posts, setPosts] = React.useState([]);

	async function handleMyPosts() {
		const data = await getMyPosts(authToken);

		if ("errors" in data) {
			// got an object containing array of errors in return
			console.log(data.errors);
		} else {
			setPosts(data);
		}
	}

	React.useEffect(() => {
		handleMyPosts();
	}, []);

	return <CardGrid posts={posts} />;
};

export default YourPosts;
