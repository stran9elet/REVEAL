import {Link} from "react-router-dom";

function Card(props) {
	return (
		<Link className="card-link" to={"/post/" + props.post._id}>
			<div className="home-card card column">
				<div className="card-body">
					<h5 className="card-title">{props.post.title.slice(0, 100)}...</h5>
					<p className="card-text">{props.post.content.slice(0, 140)}...</p>
					<p>
						<i className="heart fa-solid fa-heart"></i> <span className="likeCount">{props.post.reactions.likes}</span>
					</p>
				</div>
			</div>
		</Link>
	);
}

export default Card;
