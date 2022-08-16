import React from "react";
import { getUser } from "../api/auth";
import AuthContext from "../context/auth/AuthContext";

const Account = () => {
	const { authToken } = React.useContext(AuthContext);
	const [user, setUser] = React.useState({
		name: "Loading...",
		email: "Loading...",
	});

	React.useEffect(() => {
		handleGetUser();
	}, [authToken]);

	async function handleGetUser() {
		console.log(authToken);
		const data = await getUser(authToken);
		if ("errors" in data) {
			console.log(data.errors);
		} else {
			// console.log(data);
			setUser(data);
		}
	} 

	return (
		<div className="account-div">
			<div className="user-name">name:</div>
			<p className="user-name-ans form-control">{user.name}</p>
			<div className="user-email">email:</div>
			<p className="user-email-ans form-control">{user.email}</p>
		</div>
	);
};

export default Account;
