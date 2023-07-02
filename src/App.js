import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const notificationTypes = {
	error: 'error',
	success: 'success',
	info: 'info',
	warning: 'warning',
};

const App = () => {
	const [notification, setNotification] = useState({});
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const [blog, setBlog] = useState({
		title: '',
		author: '',
		url: '',
	});

	const addBlog = (blog) => {
		setBlog(blog);
		setBlogs([...blogs, blog]);
		blogService.create(blog);
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

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const user = await loginService.login({ username, password });
			localStorage.setItem('loggedInBlogUser', JSON.stringify(user));
			blogService.setToken(user.token);
			setUser(user);
			setUsername('');
			setPassword('');
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
				<LoginForm
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
					handleSubmit={handleLogin}
				/>
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
				<BlogForm blog={blog} setBlog={setBlog} addBlog={addBlog} />
			)}
			{user && (
				<>
					<h2>Blogs</h2>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</>
			)}
		</div>
	);
};

export default App;
