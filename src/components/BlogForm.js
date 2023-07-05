import { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ addBlog }) => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [url, setUrl] = useState('');

	const clearForm = () => {
		setTitle('');
		setAuthor('');
		setUrl('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newBlog = { title, author, url };
		addBlog(newBlog);
		clearForm();
	};

	return (
		<form className="blogForm" onSubmit={handleSubmit}>
			<label htmlFor="title">title:</label>
			<input
				id="title"
				className="titleInput"
				type="text"
				name="title"
				required
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				placeholder="Enter title"
			/>
			<label htmlFor="">author:</label>
			<input
				id="author"
				className="authorInput"
				type="text"
				name="author"
				required
				onChange={(e) => setAuthor(e.target.value)}
				value={author}
				placeholder="Enter author"
			/>
			<label htmlFor="url">url:</label>
			<input
				id="url"
				className="urlInput"
				type="url"
				name="url"
				onChange={(e) => setUrl(e.target.value)}
				value={url}
				placeholder="Enter url"
			/>
			<button>Create</button>
		</form>
	);
};

BlogForm.propTypes = {
	addBlog: PropTypes.func.isRequired,
};

export default BlogForm;
