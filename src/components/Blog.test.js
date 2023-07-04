import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

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
	// const likes = screen.getByText('likes');
	// const url = screen.getByText('http://tester.com');
	console.log('TITLE', title);
	const expectedTitle = '<span class="blogTitle">Test 1</span>';
	expect(title).toBe(expectedTitle);
	expect(author).toBe(blog.author);
	expect(author).not.toBe(blog.author);
	expect(author).not.toBe(blog.author);
});
