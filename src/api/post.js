const BASE_URL = "http://localhost:3001/api/posts";

// TODO: implement update and delete routes for post, update and delete routes for comment, and delete routes for comments. For that, first give ids to each comment

export async function getPosts(n = -1) {
	let url = BASE_URL;
	if (n > 0) url = BASE_URL + "?n=" + n;

	let response = await fetch(url, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});

	const data = await response.json();
	return data;
}

export async function getMyPosts(authToken) {
	let url = BASE_URL + "/myposts";

	let response = await fetch(url, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			"Auth-Token": authToken,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});

	const data = await response.json();
	return data;
}

export async function getPost(postId) {
	let url = BASE_URL + "/" + postId;

	let response = await fetch(url, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});

	const data = await response.json();
	return data;
}

export async function deletePost(authToken, postId) {
	let url = BASE_URL + "/" + postId;

	let response = await fetch(url, {
		method: "DELETE",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			"Auth-Token": authToken,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});

	const data = await response.json();
	return data;
}

export async function postPost(authToken, title, content) {
	let url = BASE_URL + "/write";

	const body = { title, content };

	let response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			"Auth-Token": authToken,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return data;
}

export async function postComment(authToken, postId, comment) {
	let url = BASE_URL + "/" + postId + "/comment";

	const body = { comment };

	let response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			"Auth-Token": authToken,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return data;
}

export async function getReaction(authToken, postId) {
	let url = BASE_URL + "/" + postId + "/reaction";

	let response = await fetch(url, {
		method: "GET",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			"Auth-Token": authToken,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});

	const data = await response.json();
	return data;
}

export async function postReaction(authToken, postId, reactionType) {
	let url = BASE_URL + "/" + postId + "/reaction";

	const body = { reactionType };

	let response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			"Auth-Token": authToken,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return data;
}

export async function deleteReaction(authToken, postId) {
	let url = BASE_URL + "/" + postId + "/reaction";

	let response = await fetch(url, {
		method: "DELETE",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			"Auth-Token": authToken,
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
	});

	const data = await response.json();
	return data;
}
