/**
 * Validate an object is an instance of the expected type, or is a valid constructor object for the requested type
 * @param {*} value - The value for validation
 * @param {*} Type - The type for instance of comparison
 * @param {string} messageOrOptions - The message to be displayed if coercion fails
 * @returns {*} - Instance of provided Type
 * @throws {TypeError} - If the value is not coercable.
 */
/**
 * Validate an object is an instance of the expected type, or is a valid constructor object for the requested type
 * @param {*} value - The value for validation
 * @param {*} Type - The type for instance of comparison
 * @param {string|object} messageOrOptions - Options for coerce. See below
 * @param {object} messageOrOptions.parameterName - The name of the parameter being coerced
 * @returns {*} - Instance of provided Type
 * @throws {TypeError} - If the value is not coercable.
 */
export function coerce(value, Type, messageOrOptions) {
    let errorMessage = messageOrOptions;
    if (typeof messageOrOptions !== 'string') {
        errorMessage = `${messageOrOptions.parameterName} should be coerceable to ${Type.name}. Provided value: ${JSON.stringify(value, null, 2)}`;
    }

    if (value instanceof Type) {
        return value;
    }

    try {
        return new Type(value);
    }
    catch (error) {
        throw new TypeError(`${errorMessage} Inner Error: ${error.message}`);
    }
}
export default coerce;

/**
 * Validate an array of objects are an instance of the expected type, or are a valid constructor object for the requested type
 * @param {Array<*>} values - The array of values for validation
 * @param {*} Type - The type for instance of comparison
 * @param {string} messageOrOptions - The message to be displayed if coercion fails
 * @returns {Array<*>} - Array of instances of provided Type
 * @throws {TypeError} - If values is not an array
 * @throws {TypeError} - One of the array values is not coercable.
 */
/**
 * Validate an array of objects are an instance of the expected type, or are a valid constructor object for the requested type
 * @param {Array<*>} values - The array of values for validation
 * @param {*} Type - The type for instance of comparison
 * @param {object} messageOrOptions - Options for coerceArray. See below
 * @param {object} messageOrOptions.parameterName - The name of the parameter being coerced
 * @returns {Array<*>} - Array of instances of provided Type
 * @throws {TypeError} - If values is not an array
 * @throws {TypeError} - One of the array values is not coercable.
 */
export function coerceArray(values, Type, messageOrOptions) {
    if (!Array.isArray(values)) {
        throw new TypeError(`values must be an Array. Provided value: ${values}`);
    }

    return values.map(value => coerce(value, Type, messageOrOptions));
}
