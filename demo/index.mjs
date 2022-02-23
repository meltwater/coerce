import { coerce } from '../src/index.mjs';

class Simple {
    constructor ({ anArray, aBoolean, aNumber, aString }) {
        if (! Array.isArray(anArray)) throw new TypeError(`anArray must be an array. Value: ${anArray}`);
        if (typeof aBoolean !== 'boolean') throw new TypeError(`aBoolean must be a boolean. Value: ${aBoolean}`);
        if (typeof aNumber !== 'number') throw new TypeError(`aNumber must be a number. Value: ${aNumber}`);
        if (typeof aString !== 'string') throw new TypeError(`aString must be a array. Value: ${aString}`);

        this.anArray = anArray;
        this.aBoolean = aBoolean;
        this.aNumber =  aNumber;
        this.aString = aString;

        Object.freeze(this);
    }
}

class Complex {
    constructor({ simpleOne }) {
        this.simpleOne = coerce(simpleOne, Simple, `simpleOne must be a Simple. Value: ${simpleOne}`);

        Object.freeze(this);
    }
}

const somethingSimple = {
    anArray: [1,2,3],
    aBoolean: true,
    aNumber: 42,
    aString: 'not too complicated'
};

console.log('Coerce somethingSimple into Simple');
const somethingReallySimple = coerce(somethingSimple, Simple, 'somethingSimple must be Simple');

console.log('A new somethingReallyComplex');
const somethingReallyComplex = new Complex({
    simpleOne: somethingReallySimple
});

console.log('Coerce somethingReallyComplex into somethingElseReallyComplex');
const somethingElseReallyComplex = coerce(somethingReallyComplex, Complex, 'somethingReallyComplex is Complex');
