import React from "react";

import CardGrid from "./CardGrid";

import { getPosts } from "../api/post";

export default function Home(props) {
	const [posts, setPosts] = React.useState([]);

	async function fetchData() {
		const data = await getPosts();
		// TODO: get only the post ids, title, content and likes here, and apply infinite scrolling
		setPosts(data.slice().reverse());
	}

	React.useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div className="home-margin-div">
				<div className="heading-text heading-anim">
					<h1>REVEAL</h1>
					<p>your real side</p>
				</div>
				<i className="animated bounce fa-solid fa-chevron-down chevron chevron-1"></i>
				<i className="animated bounce fa-solid fa-chevron-down chevron chevron-2"></i>
			</div>
			<CardGrid posts={posts} />
		</>
	);
}
