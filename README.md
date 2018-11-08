# @meltwater/coerce

A simple javascript package for type checking an object

# Install

```bash
npm i --save @meltwater/coerce
```

# API reference

Please see [full api documentation here](docs/API.md)

# Usage

```javascript
class ValidatedObject {
    constructor({ value }) {
        if(typeof value !== string) {
            throw new TypeError(`options.value must be a string. Provided value: ${value}`);
        }

        this.value = value;
        Object.freeze(this);
    }
}

const badValue = { value: 1234 };
coerce(badValue, ValidatedObject, 'Booooooom!');
// This will throw a TypeError with the message 'Booooooom!'

const goodValue = { value: 'so good' };
const typedValue = coerce(goodValue, ValidatedObject, 'Booooooom');
// This will return a new object that is an instanceof ValidatedObject with typedValue.value === 'so good'
```
