import Card from "./Card";

const CardGrid = (props) => {
	return (
		<div className="grid-container">
			<div className="row">
				{props.posts.map((post, index) => (
					<div key={index} className="col-md-6 col-xl-4 col-xxl-3">
						<Card post={post} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CardGrid;
