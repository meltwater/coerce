/**
 * Validate an object is an instance of the expected type, or is a valid constructor object for the requested type
 * @param {*} value - The value for validation
 * @param {*} Type - The type for instance of comparison
 * @param {string} message - The message to be displayed if coercion fails
 * @returns {*} - Instance of provided Type
 * @throws {TypeError} - If the value is not coercable.
 */
export default function coerce (value, Type, message) {
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