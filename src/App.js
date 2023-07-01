import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [user, setUser] = useState(null);

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
