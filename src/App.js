import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

	const [blog, setBlog] = useState({
		title: '',
		author: '',
		url: '',
	});

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
	}, []);

	useEffect(() => {
		blogService.create(blogs[blogs.length - 1]);
	}, [blogs]);

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
		} catch (err) {
			console.log('Wrong credentials');
		}
	};

	return (
		<div>
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
				<BlogForm blog={blog} setBlog={setBlog} setBlogs={setBlogs} />
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
