import React from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/auth/AuthContext";

import { login } from "../api/auth";
import { setCookie } from "../utils/cookies";

export default function Login() {
	const { setAuthToken } = React.useContext(AuthContext);

	const [errors, setErrors] = React.useState([]);

	const [cred, setCred] = React.useState({
		email: "",
		password: "",
	});
	const credCopy = JSON.parse(JSON.stringify(cred));

	const back = React.useRef(null);

	function setEmail(event) {
		credCopy.email = event.target.value;
		setCred(credCopy);
	}

	function setPassword(event) {
		credCopy.password = event.target.value;
		setCred(credCopy);
	}

	async function handleLogin(event) {
		// submit email and password, and store auth token in auth state
		const data = await login(cred.email, cred.password);
		if ("errors" in data) {
			// got an object containing array of errors in return
			setErrors(data.errors);
		} else {
			setErrors([]);
			setAuthToken(data.authToken);
			setCookie("authToken", data.authToken);
			back.current.click();
		}
	}

	// TODO: forgot password button, and send users a mail with the change password link. Just add a new password and confirm new password fields there
	return (
		<div className="signup-body">
			<Link ref={back} to="/" />

			<h1 className="signing-title fw-normal">REVEAL</h1>

			<main className="form-signin w-100 m-auto">
				<form>
					<div className="form-floating">
						<input onChange={setEmail} type="email" className="login-email-input form-control" id="floatingInput" placeholder="name@example.com" value={cred.email} />
						<label htmlFor="floatingInput">Email address</label>
					</div>
					<div onChange={setPassword} className="form-floating">
						<input type="password" className="login-password-input form-control" id="floatingPassword" placeholder="Password" value={cred.password} />
						<label htmlFor="floatingPassword">Password</label>
					</div>

					<div className="checkbox mb-3">
						<label>
							<input type="checkbox" value="remember-me" /> Remember me
						</label>
					</div>
					<button type="button" onClick={async () => await handleLogin()} className="signin-btn btn btn-lg">
						Log in
					</button>
					{errors.length !== 0 && (
						<div className="signup-alert alert alert-danger" role="alert">
							{errors.map((error, index) => (
								<div key={index}>{error}</div>
							))}
						</div>
					)}
					<hr className="signing-line" />
					<p className="new-user-text">New User?</p>
					<Link to="/signup">
						<button type="button" className="create-btn btn btn-lg">
							Create New Account
						</button>
					</Link>
				</form>
			</main>
		</div>
	);
}
