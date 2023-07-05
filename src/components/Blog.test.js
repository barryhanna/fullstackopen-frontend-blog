import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';
import userEvent from '@testing-library/user-event';

test('blog renders the blog title and author, but not url and likes', async () => {
	const blog = {
		title: 'Test 1',
		author: 'Tester',
		likes: 0,
		url: 'http://tester.com',
	};
	const user = {
		name: 'Tom',
		id: '48753r984498ry439y98t87',
	};

	const setBlogs = jest.fn();

	render(<Blog blog={blog} setBlogs={setBlogs} user={user} />);

	screen.debug();

	const title = screen.getByText('Test 1');
	const author = screen.getByText('Tester');
	const likes = screen.queryByText('likes');
	const url = screen.queryByText('http://tester.com');

	expect(title).toHaveTextContent(blog.title);
	expect(author).toHaveTextContent(blog.author);
	expect(likes).toBeNull();
	expect(url).toBeNull();
});

test('likes and url are shown when show details button is clicked', async () => {
	const blog = {
		title: 'Test 1',
		author: 'Tester',
		likes: 0,
		url: 'http://tester.com',
	};
	const user = {
		name: 'Tom',
		id: '48753r984498ry439y98t87',
	};

	const setBlogs = jest.fn();
	const userClick = userEvent.setup();

	const { container } = render(
		<Blog blog={blog} setBlogs={setBlogs} user={user} />
	);
	const button = container.querySelector('.showFullDetails');

	await userClick.click(button);

	const likes = container.querySelector('.likes');
	const url = container.querySelector('.url');

	expect(likes).toBeDefined();
	expect(url).toBeDefined();
});
