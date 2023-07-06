describe('Blog app', () => {
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3003/api/testing/reset');
		// const user = {
		// 	name: 'DaveDave',
		// 	username: 'dave',
		// 	password: 'davedave',
		// };
		// cy.request('POST', 'http://localhost:3003/api/users/', user);
		cy.visit('http://localhost:3000');
	});

	it('front page can be opened', function () {
		cy.visit('http://localhost:3000');
		cy.contains('Login');
	});
});
