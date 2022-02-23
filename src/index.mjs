/**
 * If `value` is an instance of `Type`, this function returns it.
 * Otherwise this function attempts to construct a new instance
 * `Type` using `value` as a constructor parameter.
 *
 * @summary Return an object as an instance of the type, provided.
 *
 * @param {*} value - The value to coerce
 * @param {*} Type - The type to return the object as.
 * @param {string} message - The error message if coercion fails
 * @returns {*} - Instance of provided Type
 *
 * @throws {TypeError} - If the value is not coercable.
 */
export function coerce (value, Type, message) {
    if (value instanceof Type) {
        return value;
    }

    try {
        return new Type(value);
    }
    catch (error) {
        throw new TypeError(`${message} Inner Error: ${error.message}`);
    }
}
export default coerce;

/**
 * Apply `coerce` to an array for a single type.
 *
 * @param {Array<*>} values - The array of values to coerce
 * @param {*} Type - The type each object should be
 * @param {string} message - The error message if coercion fails
 * @returns {Array<*>} - Array of instances of provided `Type`
 *
 * @throws {TypeError} - If `values` is not an array
 * @throws {TypeError} - One of the array values is not coercable.
 */
export function coerceArray (values, Type, message) {
    if(!Array.isArray(values)) {
        throw new TypeError(`values must be an Array. Provided value: ${values}`);
    }

    return values.map(value => coerce(value, Type, message));
}
