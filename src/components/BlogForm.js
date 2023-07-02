import { useState } from 'react';

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
				type="text"
				name="title"
				required
				onChange={(e) => setTitle(e.target.value)}
				value={title}
			/>
			<label htmlFor="">author:</label>
			<input
				id="author"
				type="text"
				name="author"
				required
				onChange={(e) => setAuthor(e.target.value)}
				value={author}
			/>
			<label htmlFor="url">url:</label>
			<input
				id="url"
				type="url"
				name="url"
				onChange={(e) => setUrl(e.target.value)}
				value={url}
			/>
			<button>Create</button>
		</form>
	);
};

export default BlogForm;
