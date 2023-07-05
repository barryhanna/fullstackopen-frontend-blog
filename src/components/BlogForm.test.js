import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import BlogForm from './BlogForm';
import userEvent from '@testing-library/user-event';

describe('<BlogForm />', () => {
	test('check form details are added correctly', async () => {
		const blogPost = {
			title: 'Test Title',
			author: 'Tester 2',
			url: 'http://localhost',
		};

		const addBlogMock = jest.fn();
		const user = userEvent.setup();

		render(<BlogForm addBlog={addBlogMock} />);

		const titleInput = screen.getByPlaceholderText('Enter title');
		user.type(titleInput, blogPost.title);

		const authorInput = screen.getByPlaceholderText('Enter author');
		user.type(authorInput, blogPost.author);

		const urlInput = screen.getByPlaceholderText('Enter url');
		user.type(urlInput, blogPost.url);

		const submitButton = screen.getAllByText('Create');

		user.click(submitButton);

		expect(addBlogMock.mock.calls).toHaveLength(0);
	});
});
