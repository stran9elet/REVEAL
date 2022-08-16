import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Home from "./Home";
import About from "./About";
import Write from "./Write";
import Login from "./Login";
import Post from "./Post";
import Signup from "./Signup";
import YourPosts from "./YourPosts";
import Account from "./Account";
// import Grad from "./Grad";
import { getCookie } from "../utils/cookies";
import React from "react";
import AuthContext from "../context/auth/AuthContext";

function App() {
	const { setAuthToken } = React.useContext(AuthContext);

	React.useEffect(() => {
		setAuthToken(getCookie("authToken"));
	}, []);

	// const gradColors = [
	// 	"rgb(255, 192, 203)", // just basic pink
	// 	"rgb(197, 228, 197)",
	// 	"rgb(245, 245, 216)",
	// 	"rgb(192, 239, 255)",
	// ];

	// const leftBound = -500;
	// const rightBound = window.innerWidth + 500;
	// const randomPoint = leftBound + Math.floor(Math.random() * (rightBound - leftBound));
	// let top = 0;

	// console.log(randomPoint);

	// const gradStyle = {
	// 	top: top,
	// 	left: randomPoint,
	// 	backgroundImage: "radial-gradient(circle closest-side, " + gradColors[0] + " 0%, #00000000 100%)",
	// };

	// const gradStyleArray = {};

	return (
		<>
			{/* <div className="grad-container">
				<div className="grad pink"></div>
				<div className="grad green"></div>
				<div className="grad yellow"></div>
				<div className="grad blue"></div>
				<div className="grad orange"></div>
			</div> */}
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/write"
						element={
							<>
								<div className="margin-div"></div>
								<Write />
								<div className="margin-div"></div>
							</>
						}
					/>
					<Route
						path="/about"
						element={
							<>
								<div className="margin-div"></div>
								<About />
								<div className="margin-div"></div>
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								<div className="margin-div"></div>
								<Login />
								<div className="margin-div"></div>
							</>
						}
					/>
					<Route
						path="/signup"
						element={
							<>
								<div className="margin-div"></div>
								<Signup />
								<div className="margin-div"></div>
							</>
						}
					/>
					<Route
						path="/post/:postId"
						element={
							<>
								<div className="margin-div"></div>
								<Post />
								<div className="margin-div"></div>
							</>
						}
					/>
					<Route
						path="/my-posts"
						element={
							<>
								<div className="margin-div"></div>
								<YourPosts />
								<div className="margin-div"></div>
							</>
						}
					/>
					<Route
						path="/my-account"
						element={
							<>
								<div className="margin-div"></div>
								<Account />
								<div className="margin-div"></div>
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
