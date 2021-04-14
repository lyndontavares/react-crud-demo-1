/**
 * The response to a REST call.
 */
export default class Response {
    /**
     * Returns true if the REST call was successfully processed.
     */
    success;

    /**
     * An error message if the REST call failed.
     */
    error;

    constructor(success, error = null) {
        this.success = success;
        this.error = error;
    }
}
