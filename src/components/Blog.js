import React from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, setBlogs, user }) => {
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

	const incrementLikes = async () => {
		blogService.setToken(user.token);
		const response = await blogService.patch(blog.id, {
			...blog,
			likes: blog.likes + 1,
		});
		// console.log('SERVER RESPONSE', response);
		blog.likes = response.likes;

		setBlogs((prevBlogs) => {
			const updatedBlog = prevBlogs.filter(
				(b) => b.id === blog.id
			)[0];
			const index = prevBlogs.findIndex((b) => b.id === blog.id);

			return [
				...prevBlogs.slice(0, index),
				updatedBlog,
				...prevBlogs.slice(index + 1),
			];
		});
	};

	const handleRemove = async (id) => {
		if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)) {
			blogService.setToken(user.token);
			await blogService.delete(id);
			setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== id));
		}
	};

	const [showFullDetails, setShowFullDetails] = React.useState(false);

	return (
		<div style={blogStyle}>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				{/* <pre>{JSON.stringify(blog, null, 2)}</pre> */}
				<p>
					<span className="blogTitle">{blog.title}</span>{' '}
					<span className="blogAuthor">{blog.author}</span>
				</p>
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
						{blog.likes}{' '}
						<button onClick={incrementLikes}>like</button>
					</p>
					<p>{blog?.user?.name}</p>
					<button
						style={{
							color: 'white',
							background: 'rgba(252, 61, 112, 1.00)',
						}}
						onClick={() => handleRemove(blog.id)}
					>
						remove
					</button>
				</>
			)}
		</div>
	);
};

Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	setBlogs: PropTypes.func.isRequired,
	user: PropTypes.object.isRequired,
};

export default Blog;
