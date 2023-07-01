import { useState } from 'react';

const BlogForm = ({ blog, setBlog, setBlogs }) => {
	const [title, setTitle] = useState(blog.title || '');
	const [author, setAuthor] = useState(blog.author || '');
	const [url, setUrl] = useState(blog.url || '');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newBlog = { title, author, url };
		setBlog(newBlog);
		setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
	};

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor="title">title:</label>
			<input
				id="title"
				type="text"
				name="title"
				required
				onChange={(e) => setTitle(e.target.value)}
			/>
			<label htmlFor="">author:</label>
			<input
				id="author"
				type="text"
				name="author"
				required
				onChange={(e) => setAuthor(e.target.value)}
			/>
			<label htmlFor="url">url:</label>
			<input
				id="url"
				type="url"
				name="url"
				onChange={(e) => setUrl(e.target.value)}
			/>
			<button>Create</button>
		</form>
	);
};

export default BlogForm;
