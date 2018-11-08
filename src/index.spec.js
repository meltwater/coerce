import coerce from './index';

class FakeClassForTesting {}
class FailingClassForTesting {
    constructor() {
        throw new Error('You failing the hardest');
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

        expect(() => coerce({}, FailingClassForTesting, errorMessage)).toThrowError(errorMessage);
    });
});