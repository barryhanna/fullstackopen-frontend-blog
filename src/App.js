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

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const user = await loginService.login({ username, password });
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
					handleSubmit={handleSubmit}
				/>
			)}
			{user && (
				<p>
					{user.username} is logged in.{' '}
					<button onClick={() => setUser(null)}>Logout</button>
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
