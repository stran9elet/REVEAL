import React from "react";
import { Link } from "react-router-dom";

import AuthContext from "../context/auth/AuthContext";

import { signup } from "../api/auth";
import { setCookie } from "../utils/cookies";

const Signup = () => {
	const { setAuthToken } = React.useContext(AuthContext);

	const [nameFocused, setNameFocused] = React.useState(false);

	const [errors, setErrors] = React.useState([]);

	const [cred, setCred] = React.useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const credCopy = JSON.parse(JSON.stringify(cred));

	const back = React.useRef(null);

	function setName(event) {
		credCopy.name = event.target.value;
		setCred(credCopy);
	}

	function setEmail(event) {
		credCopy.email = event.target.value;
		setCred(credCopy);
	}

	function setPassword(event) {
		credCopy.password = event.target.value;
		setCred(credCopy);
	}

	function setConfirmPassword(event) {
		credCopy.confirmPassword = event.target.value;
		setCred(credCopy);
	}

	// length of name < 30 characters- need to validate at backend as well
	function validateName(name) {
		if (name.length < 1) {
			return "Please enter a name!";
		} else if (name.length > 30) {
			return "The length of name shall not exceed 30 characters!";
		}
	}

	// length of 1 to 320 characters- automatically done at backend isEmail() validator
	function validateEmail(email) {
		if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
			return "Invalid email address!";
		}
	}

	// length of 8 to 100 characters- need to validate at backend as well
	function validatePassword(password) {
		if (password.length < 8) {
			return "Password must be at least 8 characters!";
		} else if (password.length > 100) {
			return "Password should not exceed 100 characters!";
		}
	}

	function confirmPassword(password, confirmPassword) {
		if (password !== confirmPassword) {
			return "Passwords do not match!";
		}
	}

	async function handleSignup() {
		let errorsCopy = [];
		validateName(cred.name) && errorsCopy.push(validateName(cred.name));
		validateEmail(cred.email) && errorsCopy.push(validateEmail(cred.email));
		validatePassword(cred.password) && errorsCopy.push(validatePassword(cred.password));
		confirmPassword(cred.password, cred.confirmPassword) && errorsCopy.push(confirmPassword(cred.password, cred.confirmPassword));
		setErrors(errorsCopy);
		if (errorsCopy.length !== 0) return;

		const data = await signup(cred.name, cred.email, cred.password);
		if ("errors" in data) {
			// got an object containing array of errors in return
			setErrors(data.errors);
		} else {
			setErrors([]);
			setAuthToken(data.authToken);
			setCookie("authToken", data.authToken)
			back.current.click();
		}
	}

	return (
		<div className="signup-body">
			<Link ref={back} to="/" />

			<h1 className="signing-title fw-normal">REVEAL</h1>

			<main className="form-signin w-100 m-auto">
				<form>
					<div className="name-form form-floating">
						<input onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)} onChange={setName} type="text" className="signup-name-input form-control" id="floatingInput" placeholder="Name" value={cred.name} autoComplete="off" />
						<label htmlFor="floatingInput">Name</label>
						{nameFocused && (
							<div className="name-alert alert alert-primary" role="alert">
								Don't worry. We won't reveal it to anyone 🤫
							</div>
						)}
					</div>
					<div className="form-floating">
						<input onChange={setEmail} type="email" className="signup-email-input form-control" id="floatingInput" placeholder="name@example.com" value={cred.email} />
						<label htmlFor="floatingInput">Email address</label>
					</div>
					<div onChange={setPassword} className="form-floating">
						<input type="password" className="signup-password-input form-control" id="floatingPassword" placeholder="Password" value={cred.password} />
						<label htmlFor="floatingPassword">Password</label>
					</div>
					<div onChange={setConfirmPassword} className="form-floating">
						<input type="password" className="signup-conf-password-input form-control" id="floatingPassword" placeholder="Confirm Password" value={cred.confirmPassword} />
						<label htmlFor="floatingPassword">Confirm Password</label>
					</div>

					<div className="checkbox mb-3">
						<label>
							<input type="checkbox" value="remember-me" /> Remember me
						</label>
					</div>
					<button type="button" onClick={handleSignup} className="signin-btn btn btn-lg">
						Sign Up
					</button>
					{errors.length !== 0 && (
						<div className="signup-alert alert alert-danger" role="alert">
							{errors.map((error, index) => (
								<div key={index}>{error}</div>
							))}
						</div>
					)}
					<hr className="signing-line"/>
					<p className="new-user-text">Existing User?</p>
					<Link to="/login">
						<button type="button" className="create-btn btn btn-lg">
							Log In
						</button>
					</Link>
				</form>
			</main>
		</div>
	);
};

export default Signup;
