/**
 * Represents a table filter for a single column.
 */
export default class TableFilter {
    /**
     * The column the filter is applied to.
     */
    field;

    /**
     * The filter operator.
     */
    operator;

    /**
     * The filter value.
     */
    value;

    /**
     * Creates a TableFilter.
     *
     * @param {string} field the column the filter is applied to
     * @param {string} operator the filter operator
     * @param {string} value the filter value
     */
    constructor(field, operator, value) {
        this.field = field;
        this.operator = operator;
        this.value = value;
    }
}
