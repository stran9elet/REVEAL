import React from "react";
import { useParams } from "react-router-dom";
import { getPost, postComment, postReaction } from "../api/post";
import AuthContext from "../context/auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = () => {
	const commentLimit = 2200;

	const { authToken } = React.useContext(AuthContext);

	const [post, setPost] = React.useState({
		_id: "",
		userId: "",
		title: "",
		content: "",
		reactions: {
			likes: 0,
			claps: 0,
			laughs: 0,
			wows: 0,
			cries: 0,
		},
		date: "",
		comments: [],
	});
	const [isCommenting, setIsCommenting] = React.useState(false);
	const [commentText, setCommentText] = React.useState("");
	const [commentTooLong, setCommentTooLong] = React.useState(false);

	const { postId } = useParams();

	React.useEffect(() => {
		handleGetPost();
	}, []);

	async function handleGetPost() {
		const data = await getPost(postId);
		if ("errors" in data) {
			// got an object containing array of errors in return
			console.log(data.errors);
		} else {
			data.date = formatDate(data.date);
			setPost(data);
		}
	}

	function toggleCommentingState(event) {
		setIsCommenting(!isCommenting);
		if (!isCommenting) {
			setCommentTooLong(false);
			setCommentText("");
		}
	}

	async function handlePostComment(event) {
		// post the comment to the comment list and database and re-render the comment list
		const data = await postComment(authToken, postId, commentText);
		if ("errors" in data) {
			// got an object containing array of errors in return
			console.log(data.errors);
		} else {
			data.date = formatDate(data.date);
			setPost(data);
		}
	}

	function handleCommentChange(event) {
		setHeight(event.target);
		setCommentText(event.target.value);

		if (event.target.value.length > commentLimit) {
			setCommentTooLong(true);
		} else {
			setCommentTooLong(false);
		}
	}

	function setHeight(element) {
		element.style.height = "auto";
		element.style.height = element.scrollHeight + "px";
		element.setAttribute("style", "height:" + element.scrollHeight + "px;overflow-y:hidden;");
	}

	async function react(event) {
		if (authToken === "") {
			toast("You must be signed in to react");
			return;
		}
		const data = await postReaction(authToken, post._id, event.target.getAttribute("name"));
		if ("errors" in data) {
			console.log(data.errors);
		} else {
			data.date = formatDate(data.date);
			setPost(data);
		}
	}

	function formatDate(d) {
		let date = new Date(d);

		var options = {
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		};

		date = date.toLocaleDateString("en", options);
		return date;
	}

	return (
		<>
			<ToastContainer position="top-right" autoClose={5000} hideProgressBar={true} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />{" "}
			<div className="post card">
				<div className="post-body">
					<h5 className="post-title">{post.title}</h5>
					<h6 className="post-date">{post.date}</h6>
					<p className="post-text">{post.content}</p>
					<p className="post-reactions">
						{/* TODO: reduce the opacity of reactions, and make reactions clickable, and increase the opacity of clicked reaction */}
						<span className="reaction">
							<i onClick={react} name="0" className="heart fa-solid fa-heart"></i> <span className="likeCount">{post.reactions.likes}</span>
						</span>
						<span className="reaction">
							<i onClick={react} name="1" className="clap fa-solid fa-hands-clapping"></i> <span className="likeCount">{post.reactions.claps}</span>
						</span>
						<span className="reaction">
							<span onClick={react} name="2" className="laugh">
								🤣
							</span>{" "}
							<span className="likeCount">{post.reactions.laughs}</span>
						</span>
						<span className="reaction">
							<span onClick={react} name="3" className="wow">
								😯
							</span>{" "}
							<span className="likeCount">{post.reactions.wows}</span>
						</span>
						<span className="reaction">
							<span onClick={react} name="4" className="cry">
								😢
							</span>{" "}
							<span className="likeCount">{post.reactions.cries}</span>
						</span>
					</p>
				</div>
			</div>
			<div className="comment-section">
				<h2 className="comment-heading">Comments</h2>

				{authToken ? (
					!isCommenting && (
						<button onClick={toggleCommentingState} className="comment-button post-date">
							Add comment +
						</button>
					)
				) : (
					<div className="disabled-comment-button post-date">
						<i className="fa-solid fa-lock"></i> Sign in to add a comment
					</div>
				)}
			</div>
			{isCommenting && (
				<>
					<form className="comment-form">
						<textarea rows="1" onChange={handleCommentChange} className="comment-input" placeholder="Enter your comment here..." value={commentText} />
						<button type="button" className="comment-cancel-button post-date" onClick={toggleCommentingState}>
							Cancel
						</button>
						{commentText !== "" && !commentTooLong ? (
							<button
								type="button"
								className="enabled-post-button comment-post-button post-date"
								onClick={(event) => {
									handlePostComment(event);
									toggleCommentingState();
								}}
							>
								Post
							</button>
						) : (
							<div className="disabled-button comment-post-button post-date">Post</div>
						)}

						{commentTooLong && (
							<div className="long-alert alert alert-danger" role="alert">
								Comment too long!
							</div>
						)}
					</form>
				</>
			)}
			{post.comments
				.slice()
				.reverse()
				.map(({ userId, comment }, index) => (
					<div key={index} className="comment card">
						<div className="comment-body">
							<p className="comment-text">{comment}</p>
						</div>
					</div>
				))}
		</>
	);
};

export default Post;
