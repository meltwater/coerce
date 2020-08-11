import { coerce, coerceArray, coerceArrayParameter, coerceParameter } from './index';

const ERROR_MESSAGE = 'You failing the hardest';
class FakeClassForTesting { }
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
        const value = new FakeClassForTesting('strings are fun');

        expect(coerceParameter(value, FakeClassForTesting, '')).toBe(value);
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

describe('coerceArray', () => {
    it('should be a function', () => {
        expect(coerceArray).toEqual(jasmine.any(Function));
    });

    it('should throw if values is not an array', () => {
        expect(() => coerceArray({}, FakeClassForTesting, 'Yay!')).toThrowError(/Array/);
    });

    it('should coerce every value in the array', () => {
        const values = [
            { hooray: 'yes' },
            { oh: 'no' },
            { OHHH: 'YEAHHH!!' }
        ];

        const result = coerceArray(values, FakeClassForTesting, 'Yay!');

        expect(result).toEqual(jasmine.arrayContaining([
            jasmine.any(FakeClassForTesting),
            jasmine.any(FakeClassForTesting),
            jasmine.any(FakeClassForTesting)
        ]));
    });

    it('should throw if coercion fails', () => {
        const values = [
            { hooray: 'yes' }
        ];

        expect(() => coerceArray(values, FailingClassForTesting, 'Yay!')).toThrow();
    });
});

describe('coerceArrayParameter', () => {
    it('should be a function', () => {
        expect(coerceArrayParameter).toEqual(jasmine.any(Function));
    });

    it('should throw if values is not an array', () => {
        expect(() => coerceArrayParameter({}, FakeClassForTesting, 'Yay!')).toThrowError(/Array/);
    });

    it('should coerce every value in the array', () => {
        const values = [
            { hooray: 'yes' },
            { oh: 'no' },
            { OHHH: 'YEAHHH!!' }
        ];

        const result = coerceArrayParameter(values, FakeClassForTesting, 'Yay!');

        expect(result).toEqual(jasmine.arrayContaining([
            jasmine.any(FakeClassForTesting),
            jasmine.any(FakeClassForTesting),
            jasmine.any(FakeClassForTesting)
        ]));
    });

    it('should throw if coercion fails', () => {
        const parameterName = 'valuesOfGoodness';
        const values = [
            { hooray: 'yes' }
        ];

        expect(() => coerceArrayParameter(values, FailingClassForTesting, parameterName)).toThrowError(new RegExp(parameterName));
    });
});

describe('coerceParameter', () => {
    it('should be a function', () => {
        expect(coerceParameter).toEqual(jasmine.any(Function));
    });

    it('should return value if it is an instanceof Type', () => {
        const value = new FakeClassForTesting('strings are fun');

        expect(coerceParameter(value, FakeClassForTesting, '')).toBe(value);
    });

    it('should cast into the type and return Typed version', () => {
        const value = {};

        expect(coerceParameter(value, FakeClassForTesting, '')).toEqual(jasmine.any(FakeClassForTesting));
    });

    it('should cast into the type and return Typed version', () => {
        const parameterName = 'theBestParameter';
        expect(() => coerceParameter({}, FailingClassForTesting, parameterName)).toThrowError(parameterName);
    });

    it('should add inner message to error message', () => {
        const parameterName = 'theBestParameter';

        const errorMessageRegex = new RegExp(`${parameterName}.*${ERROR_MESSAGE}`);
        expect(() => coerceParameter({}, FailingClassForTesting, parameterName)).toThrowError(errorMessageRegex);
    });
});