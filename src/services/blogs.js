import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.put(`${baseUrl}/${id}`, newObject, config);
	return request.then((response) => response.data);
};

const patch = (id, newObject) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.patch(`${baseUrl}/${id}`, newObject, config);
	return request.then((response) => response.data);
};

const handleDelete = async (id) => {
	const config = {
		headers: { Authorization: token },
	};
	await axios
		.delete(`${baseUrl}/${id}`, config)
		.then((res) => console.log(res));
};

const setToken = (newToken) => {
	token = `Bearer ${newToken}`;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	getAll,
	create,
	update,
	patch,
	setToken,
	delete: handleDelete,
};
