import React from 'react';

const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const [showFullDetails, setShowFullDetails] = React.useState(false);

	return (
		<div style={blogStyle}>
			{/* <pre>{JSON.stringify(blog, null, 2)}</pre> */}
			{blog.title} {blog.author}{' '}
			<button onClick={() => setShowFullDetails(!showFullDetails)}>
				{showFullDetails ? 'hide' : 'view'}
			</button>
			{showFullDetails && (
				<>
					<p>{blog.url}</p>
					<p>
						{blog.likes} <button>like</button>
					</p>
					<p>{blog?.user?.name}</p>
				</>
			)}
		</div>
	);
};

export default Blog;
