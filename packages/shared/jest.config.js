/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	verbose: true,
	resetMocks: false,
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	moduleNameMapper: {
		'^.+\\.(css|less|scss)$': 'identity-obj-proxy',
		'^@algoroot/ui/(.*)$': '<rootDir>/../ui/src/$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.(js|jsx)$': 'babel-jest',
	},
	transformIgnorePatterns: ['<rootDir>/node_modules/'],
}
