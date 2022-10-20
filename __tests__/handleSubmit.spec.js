/**
 * @jest-environment jsdom
 */

import { handleSubmit } from '../src/client/js/events';

describe('Testing the submitButton function', () => {
	test('submitButton exists', () => {
	expect(handleSubmit).toBeDefined();
	})
});
