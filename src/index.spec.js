import coerce from './index';

const ERROR_MESSAGE = 'You failing the hardest';
class FakeClassForTesting {}
class FailingClassForTesting {
    constructor() {
        throw new Error(ERROR_MESSAGE);
    }
}
describe('coerce', () => {
    it('should be a function', () => {
        expect(coerce).toEqual(jasmine.any(Function));
    });

    it('should return value if it is an instanceof Type', () => {
        const value = 'strings are fun';

        expect(coerce(value, String, '')).toEqual(value);
    });

    it('should cast into the type and return Typed version', () => {
        const value = {};

        expect(coerce(value, FakeClassForTesting, '')).toEqual(jasmine.any(FakeClassForTesting));
    });

    it('should cast into the type and return Typed version', () => {
        const errorMessage = 'south things have gone';

        const errorMessageRegex = new RegExp(`${errorMessage}`);
        expect(() => coerce({}, FailingClassForTesting, errorMessage)).toThrowError(errorMessageRegex);
    });

    it('should add inner message to error message', () => {
        const errorMessage = 'south things have gone';

        const errorMessageRegex = new RegExp(`${errorMessage}.*${ERROR_MESSAGE}`);
        expect(() => coerce({}, FailingClassForTesting, errorMessage)).toThrowError(errorMessageRegex);
    });
});