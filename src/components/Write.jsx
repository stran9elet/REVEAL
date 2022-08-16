import React from "react";
import { Link } from "react-router-dom";
import { postPost } from "../api/post";

import AuthContext from "../context/auth/AuthContext";

const Write = () => {
	// TODO: option for disabling comments on a post

	const { authToken } = React.useContext(AuthContext);

	const titleLimit = 100;
	const contentLimit = 100000;

	const [title, setTitle] = React.useState("");
	const [titleTooLong, setTitleTooLong] = React.useState(false);

	const [content, setContent] = React.useState("");
	const [contentTooLong, setContentTooLong] = React.useState(false);

	const [postId, setPostId] = React.useState("");

	const postLink = React.useRef(null);

	function handleTitleChange(event) {
		setHeight(event.target);
		setTitle(event.target.value);

		if (event.target.value.length > titleLimit) {
			setTitleTooLong(true);
		} else {
			setTitleTooLong(false);
		}
	}

	function handleContentChange(event) {
		setHeight(event.target);
		setContent(event.target.value);

		if (event.target.value.length > contentLimit) {
			setContentTooLong(true);
		} else {
			setContentTooLong(false);
		}
	}

	async function submit() {
		// submit post and redirect to its post route
		const data = await postPost(authToken, title, content);
		if ("errors" in data) {
			console.log(data.errors);
		} else {
			setPostId(data._id);
		}
	}

	React.useEffect(() => {
		if (postId !== "") postLink.current.click();
	}, [postId]);

	function setHeight(element) {
		element.style.height = "auto";
		element.style.height = element.scrollHeight + "px";
		element.setAttribute("style", "height:" + element.scrollHeight + "px;overflow-y:hidden;");
	}

	return (
		<>
			<Link ref={postLink} to={"/post/" + postId} />
			{authToken ? (
				<div className="write card">
					<div className="post-body">
						<form id="write-form">
							<textarea onChange={handleTitleChange} rows="1" className="write-title" placeholder="Title" value={title} />
							{titleTooLong && (
								<div className="long-alert alert alert-danger" role="alert">
									Title too long!
								</div>
							)}
							<textarea onChange={handleContentChange} rows="15" className="write-text" placeholder="Be brave. Let's all hear that loud and clear..." value={content}></textarea>
							{contentTooLong && (
								<div className="long-alert alert alert-danger" role="alert">
									Post content too long!
								</div>
							)}

							{title.trim() !== "" && !titleTooLong && content.trim() !== "" && !contentTooLong ? (
								<button type="button" onClick={submit} className="enabled-write-button write-button">
									Publish!
								</button>
							) : (
								<div className="disabled-button write-button">Publish!</div>
							)}
						</form>
					</div>
				</div>
			) : (
				<div className="locked-page">
					<i className="write-lock fa-solid fa-lock"></i>
					<p className="write-lock-text">Sign in to write a Post</p>
				</div>
			)}
		</>
	);
};

export default Write;
