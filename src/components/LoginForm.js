import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin }) => {
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');

	const login = (e) => {
		e.preventDefault();
		handleLogin(username, password);
	};

	return (
		<form onSubmit={login}>
			<fieldset>
				<label htmlFor="username">Username</label>
				<input
					id="username"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</fieldset>
			<fieldset>
				<label htmlFor="password">Password</label>
				<input
					id="password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</fieldset>
			<button id="loginBtn">Login</button>
		</form>
	);
};

LoginForm.propTypes = {
	handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
