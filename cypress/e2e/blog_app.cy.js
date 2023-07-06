describe('Blog app', () => {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		const user = {
			name: 'DaveDave',
			username: 'dave',
			password: 'davedave',
		};
		cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function () {
		cy.visit('http://localhost:3000');
		cy.contains('Login');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.visit('http://localhost:3000');
			cy.contains('Login').click();
			cy.get('#username').type('dave');
			cy.get('#password').type('davedave');
			cy.get('#loginBtn').click();
			cy.contains('dave is logged in');
		});

		it('fails with wrong credentials', function () {
			cy.visit('http://localhost:3000');
			cy.contains('Login').click();
			cy.get('#username').type('dave');
			cy.get('#password').type('wrongdave');
			cy.get('#loginBtn').click();
			cy.contains('Wrong username or password').and(
				'have.css',
				'color',
				'rgb(206, 70, 70)'
			);
		});
	});

	describe('When logged in', function () {
		beforeEach(function () {
			cy.login({ username: 'dave', password: 'davedave' });
		});

		it('A blog can be created', function () {
			cy.visit('http://localhost:3000');
			cy.contains('Add New Blog').click();
			cy.get('#title').type('Test Blog');
			cy.get('#author').type('Test Blog Author');
			cy.get('#url').type('http://localhost');
			cy.contains('Create').click();
			cy.contains('Test Blog');
		});

		it('A user can like a blog', function () {
			cy.visit('http://localhost:3000');
			cy.contains('Add New Blog').click();
			cy.get('#title').type('Test Blog');
			cy.get('#author').type('Test Blog Author');
			cy.get('#url').type('http://localhost');
			cy.contains('Create').click();
			cy.contains('Test Blog');
			cy.contains('view').click();
			cy.contains('like').click();
			cy.get('.likes').contains('1');
		});

		it('A user can delete a blog of theirs', function () {
			cy.addBlog({
				title: 'Test Blog',
				author: 'Test Blog Author',
				url: 'http://localhost',
			});
			cy.contains('view').click();
			cy.contains('remove').click();
			cy.contains('Test Blog').should('not.exist');
		});

		it('that only the creator can see the delete button of a blog', function () {
			cy.addBlog({
				title: 'Test Blog',
				author: 'Test Blog Author',
				url: 'http://localhost',
			});

			const user2 = {
				name: 'BobBob',
				username: 'bob',
				password: 'bobbob',
			};
			cy.request('POST', 'http://localhost:3003/api/users/', user2);
			cy.login({
				username: user2.username,
				password: user2.password,
			});
			cy.visit('http://localhost:3000');
			cy.contains('bob is logged in.');
			cy.contains('view').click();
			cy.contains('remove').should('not.exist');
		});
	});
});
