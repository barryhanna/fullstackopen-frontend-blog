import { useState, useEffect, createRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const notificationTypes = {
	error: 'error',
	success: 'success',
	info: 'info',
	warning: 'warning',
};

const App = () => {
	const [notification, setNotification] = useState({});
	const [blogs, setBlogs] = useState([]);

	const [user, setUser] = useState(null);

	const newBlogFormRef = createRef();

	const [blog, setBlog] = useState({
		title: '',
		author: '',
		url: '',
	});

	const addBlog = async (blog) => {
		newBlogFormRef.current.toggleVisibility();
		blog.likes = 0;
		setBlog(blog);
		blogService.setToken(user.token);
		const newBlog = await blogService.create(blog);
		// console.log('NEW BLOG', newBlog);
		blog.id = newBlog.id;
		blog.user = { name: newBlog.user.name };
		setBlogs([...blogs, blog]);
		displayNotification(
			notificationTypes.success,
			`'${blog.title}' by '${blog.author}' added.`
		);
	};

	const displayNotification = (type, message) => {
		setNotification({
			type,
			message,
		});
		setTimeout(() => {
			setNotification({});
		}, 5000);
	};

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		const loggedInBlogUserJSON = localStorage.getItem(
			'loggedInBlogUser'
		);
		if (loggedInBlogUserJSON) {
			setUser(JSON.parse(loggedInBlogUserJSON));
		}
	}, []);

	const handleLogin = async (username, password) => {
		try {
			const user = await loginService.login({ username, password });
			localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);

			displayNotification({
				type: notificationTypes.success,
				message: 'Successfully logged in',
			});
		} catch (err) {
			displayNotification(
				notificationTypes.error,
				'Wrong username or password'
			);
		}
	};

	return (
		<div>
			{notification.message && (
				<p className={`notification ${notification.type}`}>
					<span>{notification.type}</span>:{' '}
					<span>{notification.message}</span>
				</p>
			)}
			{!user && (
				<Togglable buttonText="Login">
					<LoginForm handleLogin={handleLogin} />
				</Togglable>
			)}
			{user && (
				<p>
					{user.username} is logged in.{' '}
					<button
						onClick={() => {
							setUser(null);
							localStorage.removeItem('loggedInBlogUser');
						}}
					>
						Logout
					</button>
				</p>
			)}
			{user && (
				<Togglable buttonText="Add New Blog" ref={newBlogFormRef}>
					<BlogForm blog={blog} setBlog={setBlog} addBlog={addBlog} />
				</Togglable>
			)}
			{user && (
				<>
					<h2>Blogs</h2>
					{blogs
						.sort((a, b) => b.likes - a.likes)
						.map((blog) => (
							<Blog
								key={blog.id}
								blog={blog}
								user={user}
								setBlogs={setBlogs}
							/>
						))}
				</>
			)}
		</div>
	);
};

export default App;
