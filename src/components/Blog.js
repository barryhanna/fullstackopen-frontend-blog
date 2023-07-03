import React from 'react';

const Blog = ({ blog }) => {
	const blogStyle = {
		padding: 10,
		paddingLeft: 16,
		borderRadius: 5,
		borderWidth: 1,
		marginBottom: 8,
		boxShadow: '0 2px 4px rgba(0,0,0,.2)',
	};

	const viewButtonStyle = {
		display: 'inline-block',
		marginLeft: 'auto',
	};

	const [showFullDetails, setShowFullDetails] = React.useState(false);

	return (
		<div style={blogStyle}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{/* <pre>{JSON.stringify(blog, null, 2)}</pre> */}
				{blog.title} {blog.author}{' '}
				<button
					style={viewButtonStyle}
					onClick={() => setShowFullDetails(!showFullDetails)}
				>
					{showFullDetails ? 'hide' : 'view'}
				</button>
			</div>
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
