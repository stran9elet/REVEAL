const BASE_URL = "http://localhost:3001/api/auth";

export async function login(email, password) {
	// wait for the server to respond. Server will respond with a promise
	const url = BASE_URL + "/login";

	const body = { email, password };

	let response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(body),
	});

	// we can access response.status if we want to know the status code received

	const data = await response.json(); // parses JSON response into a promise, which will give the native JavaScript objects upon resolving
	return data;
	// idk why but promise gets automatically resolved when returned from a function
}

export async function signup(name, email, password) {
	const url = BASE_URL + "/signup";

	const body = { name, email, password };

	let response = await fetch(url, {
		method: "POST",
		mode: "cors",
		cache: "no-cache",
		credentials: "same-origin",
		headers: {
			"Content-Type": "application/json",
		},
		redirect: "follow",
		referrerPolicy: "no-referrer",
		body: JSON.stringify(body),
	});

	const data = await response.json();
	return data;
}

export async function getUser(authToken) {
	const url = BASE_URL + "/user";

	console.log(authToken);

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
