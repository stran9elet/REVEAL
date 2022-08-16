import React from "react";
import { Link } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AuthContext from "../context/auth/AuthContext";
import { deleteCookie } from "../utils/cookies";
import { getCookie } from "../utils/cookies";
// import "../node_modules/jquery/dist/jquery.min.js";

function Navbar() {
	const { authToken, setAuthToken } = React.useContext(AuthContext);

	function logout() {
		setAuthToken("");
		deleteCookie("authToken");
	}

	return (
		<nav className="navbar navbar-expand-lg">
			<div className="nav-content container-fluid">
				<Link className="navbar-brand" to="/">
					REVEAL
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<Link className="nav-link" aria-current="page" to="/">
								Home
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/about">
								About
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/write">
								Write
							</Link>
						</li>
						{!authToken ? ( // if authToken is a falsy value
							<li className="nav-item">
								<Link className="nav-link" to="/login">
									Login
								</Link>
							</li>
						) : (
							<li>
								<div className="user-dropdown btn-group">
									<button type="button" className="user-icon-button btn" data-bs-toggle="dropdown" aria-expanded="false">
										<AccountCircleIcon sx={{ fontSize: 40 }} />
									</button>
									<ul className="dropdown-menu dropdown-menu-end">
										<li>
											<Link className="user-link" to="/my-account">
												<button className="dropdown-item" type="button">
													Account
												</button>
											</Link>
										</li>
										<li>
											<Link className="user-link" to="/my-posts">
												<button className="dropdown-item" type="button">
													Your Posts
												</button>
											</Link>
										</li>

										{/* <li>
										<button className="dropdown-item" type="button">
											Your Comments
										</button>
									</li> */}
										<li>
											<button onClick={logout} className="dropdown-item" type="button">
												Log out
											</button>
										</li>
									</ul>
								</div>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
