import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import StudentsHttpClient from './StudentsHttpClient';
import AlertDialog from '../Dialogs/AlertDialog';
import ConfirmDialog from '../Dialogs/ConfirmDialog';
import TableFilterTextDialog from '../TableFilters/TableFilterTextDialog';
import TableFilter from './TableFilter';
import StudentDetailTable from './StudentDetailTable';
import './StudentsTable.css'

export default class StudentsTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            students: [], totalStudents: 0, isLoading: true, rowsPerPage: 5, page: 0, sortColumn: 'lastName', sortOrder: 'asc', selectedStudents: new Set(), isAdding: false, isEditingStudentId: -1,
            validationErrors: new Map(), addEditStudentId: '', addEditFirstName: '', addEditLastName: '', addEditStudentEmail: '', isConfirmDialogOpen: false, handleConfirm: null, confirmDialgMsg: '',
            isAlertDialogOpen: false, alertDialogTitle: '', alertDialogMsg: '', deleteStudentId: -1, isTableFilterTextDialogOpen: false, tableFilters: new Map(), filterColumn: null, expandedStudents: new Set()
        };

        // Create a reference for the TableFilterTextDialog element
        this.filterDialogElement = React.createRef();

        // Bind 'this' to the following methods so they can access 'this'
        this.renderDisplayStudentRow = this.renderDisplayStudentRow.bind(this);
        this.renderEditStudentRow = this.renderEditStudentRow.bind(this);
        this.handleAlertDialogClose = this.handleAlertDialogClose.bind(this);
        this.retrieveStudents = this.retrieveStudents.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleSelectAllClick = this.handleSelectAllClick.bind(this);
        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleDeleteSelectedStudents = this.handleDeleteSelectedStudents.bind(this);
        this.handleConfirmDeleteSelectedStudents = this.handleConfirmDeleteSelectedStudents.bind(this);
        this.handleDeleteStudent = this.handleDeleteStudent.bind(this);
        this.handleConfirmDeleteStudent = this.handleConfirmDeleteStudent.bind(this);
        this.handleConfirmDialogClose = this.handleConfirmDialogClose.bind(this);
        this.handleTableFilterTextDialogClose = this.handleTableFilterTextDialogClose.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilterClear = this.handleFilterClear.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleEditStudent = this.handleEditStudent.bind(this);
        this.handleSaveEditStudent = this.handleSaveEditStudent.bind(this);
        this.handleCloseEditStudent = this.handleCloseEditStudent.bind(this);
        this.handleAddStudent = this.handleAddStudent.bind(this);
        this.handleSaveAddStudent = this.handleSaveAddStudent.bind(this);
        this.handleCloseAddStudent = this.handleCloseAddStudent.bind(this);
        this.hasValidationError = this.hasValidationError.bind(this);
        this.getValidationError = this.getValidationError.bind(this);
        this.disableSave = this.disableSave.bind(this);
        this.isColumnFiltered = this.isColumnFiltered.bind(this);
        this.getColumnFilterClass = this.getColumnFilterClass.bind(this);
        this.getFilterOperator = this.getFilterOperator.bind(this);
        this.getFilterValue = this.getFilterValue.bind(this);
        this.isStudentExpanded = this.isStudentExpanded.bind(this);
        this.expandStudent = this.expandStudent.bind(this);
        this.collapseStudent = this.collapseStudent.bind(this);

        this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, this.state.page, this.state.rowsPerPage, this.state.tableFilters, true);
    }

    /**
     * Returns true if the student's detail row is expanded.
     *
     * @param {number} studentId the studentId to check
     */
    isStudentExpanded(studentId) {
        return this.state.expandedStudents.has(studentId);
    }

    /**
     * Adds the student to the set of expanded students.
     *
     * @param {number} studentId the studentId to add to the set of expanded students
     */
    expandStudent(studentId) {
        let newExpandedStudents = new Set(this.state.expandedStudents);
        newExpandedStudents.add(studentId);
        this.setState({ expandedStudents: newExpandedStudents });
    }

    /**
     * Removes the student from the set of expanded students.
     *
     * @param {number} studentId the studentId to remove from the set of expanded students
     */
    collapseStudent(studentId) {
        let newExpandedStudents = new Set(this.state.expandedStudents);
        newExpandedStudents.delete(studentId);
        this.setState({ expandedStudents: newExpandedStudents });
    }

    /**
     * Returns true if a filter is applied to this column.
     *
     * @param {string} column the column to check
     */
    isColumnFiltered(column) {
        return this.state.tableFilters.has(column);
    }

    /**
     * Returns the class to apply to the table column header based on whether or not it is filtered.
     *
     * @param {string} column the column
     */
    getColumnFilterClass(column) {
        if (this.isColumnFiltered(column)) {
            return 'column-filtered';
        }

        return 'column-not-filtered';
    }

    /**
     * Called when the Filter button is clicked in the filter dialog. Applies a filter to a column.
     *
     * @param {string} operator the filter operator
     * @param {string} value the filter value
     */
    handleFilter(operator, value) {
        const filter = new TableFilter(this.state.filterColumn, operator, value);

        let newTableFilters = new Map(this.state.tableFilters);
        newTableFilters.set(this.state.filterColumn, filter);

        // We set the page to 0 since the user may be on a page that will no longer exist after the filter is applied.
        const newPage = 0;

        this.setState({ isTableFilterTextDialogOpen: false, tableFilters: newTableFilters, filterColumn: null, page: newPage });

        this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, newPage, this.state.rowsPerPage, newTableFilters);
    }

    /**
     * Called when the Clear button is clicked in the filter dialog. Clears a filter from a column.
     */
    handleFilterClear() {
        let newTableFilters = new Map(this.state.tableFilters);
        newTableFilters.delete(this.state.filterColumn);
        this.setState({ isTableFilterTextDialogOpen: false, tableFilters: newTableFilters, filterColumn: null });

        this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, this.state.page, this.state.rowsPerPage, newTableFilters);
    }

    /**
     * Returns the current filter operator for the column that will be displayed in the filter dialog.
     */
    getFilterOperator(filterColumn) {
        if (this.state.tableFilters.has(filterColumn)) {
            return this.state.tableFilters.get(filterColumn).operator;
        }

        return 'Is equal to';
    }

    /**
     * Returns the current filter value for the column that will be displayed in the filter dialog.
     */
    getFilterValue(filterColumn) {
        if (this.state.tableFilters.has(filterColumn)) {
            return this.state.tableFilters.get(filterColumn).value;
        }

        return '';
    }

    /**
     * Sets isTableFilterTextDialogOpen to false to close the filter dialog.
     */
    handleTableFilterTextDialogClose() {
        this.setState({ isTableFilterTextDialogOpen: false });
    }

    /**
     * Sets isConfirmDialogOpen to false to close the confirm dialog
     */
    handleConfirmDialogClose() {
        this.setState({ isConfirmDialogOpen: false });
    }

    /**
     * Sets isAlertDialogOpen to false to close the alert dialog
     */
    handleAlertDialogClose() {
        this.setState({ isAlertDialogOpen: false });
    }

    /**
     * Called to retrieve the students after events like filtering, add student, delete student, etc.
     *
     * @param {string} sortColumn 
     * @param {string} sortOrder 
     * @param {number} page 
     * @param {number} rowsPerPage 
     * @param {Map<string, TableFilter>} tableFilters 
     * @param {boolean} constructorCall 
     */
    retrieveStudents(sortColumn, sortOrder, page, rowsPerPage, tableFilters, constructorCall = false) {
        // If not being called from the constructor, set isLoading to true
        if (!constructorCall) {
            this.setState({ isLoading: true });
        }
        StudentsHttpClient.getStudents(sortColumn, sortOrder, page, rowsPerPage, tableFilters)
            .then(response => {
                this.setState({ students: response.students, totalStudents: response.totalStudents, isLoading: false });
            })
    }

    /**
     * Called when a change page event occurs.
     *
     * @param {*} event 
     * @param {*} newPage 
     */
    handleChangePage(event, newPage) {
        this.setState({ page: newPage });
        this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, newPage, this.state.rowsPerPage, this.state.tableFilters);
    }

    /**
     * Called when rows per page is changed.
     *
     * @param {*} event 
     */
    handleChangeRowsPerPage(event) {
        let newRowsPerPage = parseInt(event.target.value, 10);
        let newPage = 0;
        this.setState({ page: newPage, rowsPerPage: newRowsPerPage });
        this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, newPage, newRowsPerPage, this.state.tableFilters);
    }

    /**
     * Called when a column header is clicked on to change the sorting of the table.
     *
     * @param {string} newSortColumn the column header that was clicked
     */
    handleChangeSort(newSortColumn) {
        let newSortOrder = 'asc';
        if (this.state.sortColumn === newSortColumn && this.state.sortOrder === 'asc') {
            newSortOrder = 'desc';
        }

        this.setState({ sortColumn: newSortColumn, sortOrder: newSortOrder });
        this.retrieveStudents(newSortColumn, newSortOrder, this.state.page, this.state.rowsPerPage, this.state.tableFilters);
    }

    /**
     * Called when select all checkbox is checked or unchecked. Either selects or unselects all students.
     */
    handleSelectAllClick() {
        if (this.state.selectedStudents.size === this.state.totalStudents) {
            // All are selected so user wants to unselect them all.
            this.state.selectedStudents.clear();
        } else if (this.state.totalStudents <= this.state.rowsPerPage) {
            // None or some are selected so user wants to select them all.
            // There's only 1 page of students so we just need to select the ones on the page.
            this.state.selectedStudents.clear();
            this.state.students.forEach(row => this.state.selectedStudents.add(row));
        } else {
            // None or some are selected so user wants to select them all.
            // There are multiple pages so we need to retrieve them all so we can select them all.
            this.setState({ isLoading: true });
            this.state.selectedStudents.clear();
            StudentsHttpClient.getStudents(this.sortColumn, this.sortDirection, 0, Number.MAX_VALUE, this.state.tableFilters)
                .then(response => {
                    response.students.forEach(row => this.state.selectedStudents.add(row));
                    this.setState({ isLoading: false, selectedStudents: this.state.selectedStudents });
                });
        }

        this.setState({ selectedStudents: this.state.selectedStudents });
    }

    /**
     * Called when the checkbox for a student is checked or unchecked. Adds or removes the student from the set of selected students.
     *
     * @param {Student} student the student that was checked or unchecked
     */
    handleSelectClick(student) {
        if (this.state.selectedStudents.has(student)) {
            this.state.selectedStudents.delete(student);
        } else {
            this.state.selectedStudents.add(student);
        }

        this.setState({ selectedStudents: this.state.selectedStudents });
    }

    /**
     * Called when delete selected students icon is clicked.
     */
    handleDeleteSelectedStudents() {
        // If no students are selected, display a message and return
        if (this.state.selectedStudents.size === 0) {
            this.setState({ isAlertDialogOpen: true, alertDialogTitle: 'Info', alertDialogMsg: 'No students are selected.' });
            return;
        }

        this.setState({ isConfirmDialogOpen: true, handleConfirm: this.handleConfirmDeleteSelectedStudents, confirmDialgMsg: 'Are you sure you want to delete the selected students?' });
    }

    /**
     * Processes the deleting of selected students.
     */
    handleConfirmDeleteSelectedStudents() {
        // Set the table as loading and close the dialog
        this.setState({ isLoading: true, isConfirmDialogOpen: false });

        // Get array of studentIds to be deleted
        let studentIds = new Array(this.state.selectedStudents.size);
        this.state.selectedStudents.forEach(s => studentIds.push(s.studentId));

        // Delete the students
        StudentsHttpClient.deleteStudents(studentIds)
            .then(response => {
                if (!response.success) {
                    // Set the table as not loading and display the error
                    this.setState({ isLoading: false, isAlertDialogOpen: true, alertDialogTitle: 'Error', alertDialogMsg: response.error });
                } else {
                    
                    // We set the page to 0 since the user may be on a page that will no longer exist after the students are deleted
                    const newPage = 0;
                    this.setState({ page: newPage });

                    // Retrieve students to refresh the table with the deleted students removed
                    this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, newPage, this.state.rowsPerPage, this.state.tableFilters);
                }
            })
    }

    /**
     * Called when delete icon is clicked for a student.
     *
     * @param {Student} student the student to delete
     */
    handleDeleteStudent(student) {
        this.setState({ isConfirmDialogOpen: true, deleteStudentId: student.studentId, handleConfirm: this.handleConfirmDeleteStudent, confirmDialgMsg: 'Are you sure you want to delete the selected student?' });
    }

    /**
     * Processes the deleting of a student.
     */
    handleConfirmDeleteStudent() {
        // Set the table as loading and close the dialog
        this.setState({ isLoading: true, isConfirmDialogOpen: false, deleteStudentId: -1 });

        // Delete the student
        StudentsHttpClient.deleteStudent(this.state.deleteStudentId)
            .then(response => {
                if (!response.success) {
                    // Set the table as not loading and display the error
                    this.setState({ isLoading: false, isAlertDialogOpen: true, alertDialogTitle: 'Error', alertDialogMsg: response.error });
                } else {
                    // Retrieve students to refresh the table with the deleted student removed
                    this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, this.state.page, this.state.rowsPerPage, this.state.tableFilters);
                }
            })
    }

    /**
     * Called when edit icon is clicked for a student. Places the student's row in edit mode.
     *
     * @param {Student} student the student to edit
     */
    handleEditStudent(student) {
        this.setState({ isAdding: false, isEditingStudentId: student.studentId, addEditStudentId: student.studentSchoolId, addEditFirstName: student.firstName, addEditLastName: student.lastName, addEditStudentEmail: student.studentEmail });
    }

    /**
     * Processes the editing of a student.
     */
    handleSaveEditStudent() {

        let student = { studentId: this.state.isEditingStudentId, studentSchoolId: this.state.addEditStudentId, firstName: this.state.addEditFirstName, lastName: this.state.addEditLastName, studentEmail: this.state.addEditStudentEmail };

        StudentsHttpClient.updateStudent(student)
            .then(response => {
                if (!response.success) {
                    this.setState({ isAlertDialogOpen: true, alertDialogTitle: 'Error', alertDialogMsg: response.error });
                } else {
                    // Set isEditingStudentId=-1 to close the edit student row
                    this.setState({ isEditingStudentId: -1 });

                    // Retrieve students to refresh the table with the updated student
                    this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, this.state.page, this.state.rowsPerPage, this.state.tableFilters);
                }
            })
    }

    /**
     * Processes the cancel of an edit student by returning the student's row to display mode.
     */
    handleCloseEditStudent() {
        // Closing edit student row so need to set isEditingStudentId=-1 and clear all validation errors
        this.state.validationErrors.clear();
        this.setState({ isEditingStudentId: -1, validationErrors: this.state.validationErrors });
    }

    /**
     * Called when add student icon is clicked. Opens the add row a the top of the table.
     */
    handleAddStudent() {
        this.setState({ isAdding: true, isEditingStudentId: -1, addEditStudentId: '', addEditFirstName: '', addEditLastName: '', addEditStudentEmail: '' });
    }

    /**
     * Processes the adding of a student.
     */
    handleSaveAddStudent() {

        let student = { studentSchoolId: this.state.addEditStudentId, firstName: this.state.addEditFirstName, lastName: this.state.addEditLastName, studentEmail: this.state.addEditStudentEmail };

        StudentsHttpClient.addStudent(student)
            .then(response => {
                if (!response.success) {
                    this.setState({ isAlertDialogOpen: true, alertDialogTitle: 'Error', alertDialogMsg: response.error });
                } else {
                    // Set isAdding=false to close the add student row
                    this.setState({ isAdding: false });

                    // Retrieve students to refresh the table with the added student
                    this.retrieveStudents(this.state.sortColumn, this.state.sortOrder, this.state.page, this.state.rowsPerPage, this.state.tableFilters);
                }
            })
    }

    /**
     * Processes the cancel of an add student by hiding the add row.
     */
    handleCloseAddStudent() {
        // Closing add student row so need to set isAdding=false and clear all validation errors
        this.state.validationErrors.clear();
        this.setState({ isAdding: false, validationErrors: this.state.validationErrors });
    }

    /**
     * Returns true if the column has add/edit mode validation errors.
     *
     * @param {string} column the column to check for validation errors
     */
    hasValidationError(column) {
        return this.state.validationErrors.has(column);
    }

    /**
     * Returns any validation errors for the column while it is in add/edit mode.
     *
     * @param {string} column the column to check for validation errors
     */
    getValidationError(column) {
        if (this.hasValidationError(column)) {
            return this.state.validationErrors.get(column);
        }

        return null;
    }

    /**
     * Returns true if the add/edit mode save icon should be disabled due to validation errors or empty required fields.
     */
    disableSave() {
        if ((this.state.validationErrors.size > 0) || (this.state.addEditStudentId.length === 0) || (this.state.addEditFirstName.length === 0) || (this.state.addEditLastName.length === 0) || (this.state.addEditStudentEmail.length === 0)) {
            return true;
        }

        return false;
    }

    /**
     * Called during add/edit mode when a control's value changes to perform validation.
     *
     * @param {*} event 
     * @param {string} column 
     */
    handleChange(event, column) {
        var isRequiredField = false;
        if (column === 'Student Id') {
            this.setState({ addEditStudentId: event.target.value });
            isRequiredField = true;
        } else if (column === 'First Name') {
            this.setState({ addEditFirstName: event.target.value });
            isRequiredField = true;
        } else if (column === 'Last Name') {
            this.setState({ addEditLastName: event.target.value });
            isRequiredField = true;
        } else if (column === 'Student Email') {
            this.setState({ addEditStudentEmail: event.target.value });
            isRequiredField = true;
        }

        if (isRequiredField) {
            if (event.target.value.length === 0) {
                // It doesn't have a value so if it doesn't have a required validation error then add it
                if (!this.hasValidationError(column)) {
                    this.state.validationErrors.set(column, 'Required');
                    this.setState({ validationErrors: this.state.validationErrors });
                }
            } else {
                // It has a value so if it has a required validation error then remove it
                if (this.hasValidationError(column) && this.getValidationError(column) === 'Required') {
                    this.state.validationErrors.delete(column);
                    this.setState({ validationErrors: this.state.validationErrors });
                }
            }
        }
    }

    /**
     * Called during add/edit mode when a control loses focus to perform validation.
     *
     * @param {*} event 
     * @param {string} column 
     */
    handleBlur(event, column) {
        // If the student's school id lost focus, make a REST call to verify the school id isn't already assigned to another student.
        if ((column === 'Student Id') && (event.target.value.length > 0)) {
            this.setState({ isLoading: true });
            StudentsHttpClient.validateStudentSchoolId(this.state.isEditingStudentId, event.target.value)
                .then(response => {
                    this.state.validationErrors.delete(column);
                    if (!response.success) {
                        this.state.validationErrors.set(column, response.error);
                    }
                    this.setState({ isLoading: false, validationErrors: this.state.validationErrors });
                })
        }
    }

    /**
     * Called when the filter icon is clicked for a column. Opens the filter dialog for that column.
     *
     * @param {string} column the column to filter
     */
    handleFilterClick(column) {

        // Set the filter dialog's operator and value to the values for this column before opening it
        this.filterDialogElement.current.setOperatorAndValue(this.getFilterOperator(column), this.getFilterValue(column));

        // Open the filter dialog
        this.setState({ isTableFilterTextDialogOpen: true, filterColumn: column });
    }

    /**
     * Generates a table row in display mode for the student. If the student is expanded, it will also display the details table for the student.
     *
     * @param {Student} student the student to display
     */
    renderDisplayStudentRow(student) {
        return (
            <React.Fragment key={student.studentId}>
                <TableRow key={student.studentId}>
                    <Tooltip title="Select/unselect student"><TableCell padding="checkbox" className='column-select'><Checkbox checked={this.state.selectedStudents.has(student)} onChange={() => this.handleSelectClick(student)} /></TableCell></Tooltip>
                    <TableCell className='column-detail'>
                        { /* Details collapsed. */
                            !this.isStudentExpanded(student.studentId) &&
                            <IconButton onClick={() => this.expandStudent(student.studentId)} aria-label="expand student"><ArrowRightIcon /></IconButton>
                        }
                        { /* Details expanded. */
                            this.isStudentExpanded(student.studentId) &&
                            <IconButton onClick={() => this.collapseStudent(student.studentId)} aria-label="collapse student"><ArrowDropDownIcon /></IconButton>
                        }
                    </TableCell>
                    <TableCell className='student-school-id'>{student.studentSchoolId}</TableCell>
                    <TableCell>{student.firstName}</TableCell>
                    <TableCell>{student.lastName}</TableCell>
                    <TableCell>{student.studentEmail}</TableCell>
                    <TableCell>
                        <Tooltip title="Edit student"><IconButton onClick={() => this.handleEditStudent(student)} aria-label="edit student"><EditIcon /></IconButton></Tooltip>
                        <Tooltip title="Delete student"><IconButton onClick={() => this.handleDeleteStudent(student)} aria-label="delete student"><DeleteIcon /></IconButton></Tooltip>
                    </TableCell>
                </TableRow>

                { /* Detail row. */
                    this.isStudentExpanded(student.studentId) &&
                    <TableRow key={'Detail' + student.studentId} style={{ backgroundColor: 'whitesmoke' }} >
                        <TableCell colSpan='7'><StudentDetailTable studentId={student.studentId} /></TableCell>
                    </TableRow>
                }
            </React.Fragment>
        )
    }

    /**
     * Generates a table row in edit mode for the student. 
     *
     * @param {Student} student the student to edit
     */
    renderEditStudentRow(student) {
        return (
            <TableRow key={student.studentId}>
                <TableCell className='column-select'></TableCell>
                <TableCell className='column-detail'></TableCell>
                <TableCell className='student-school-id'><TextField value={this.state.addEditStudentId} error={this.hasValidationError('Student Id')} helperText={this.getValidationError('Student Id')} onChange={(event) => this.handleChange(event, 'Student Id')} onBlur={(event) => this.handleBlur(event, 'Student Id')} placeholder="Student Id" margin="normal" variant="outlined" /></TableCell>
                <TableCell><TextField value={this.state.addEditFirstName} error={this.hasValidationError('First Name')} helperText={this.getValidationError('First Name')} onChange={(event) => this.handleChange(event, 'First Name')} placeholder="First Name" margin="normal" variant="outlined" /></TableCell>
                <TableCell><TextField value={this.state.addEditLastName} error={this.hasValidationError('Last Name')} helperText={this.getValidationError('Last Name')} onChange={(event) => this.handleChange(event, 'Last Name')} placeholder="Last Name" margin="normal" variant="outlined" /></TableCell>
                <TableCell><TextField value={this.state.addEditStudentEmail} error={this.hasValidationError('Student Email')} helperText={this.getValidationError('Student Email')} onChange={(event) => this.handleChange(event, 'Student Email')} placeholder="Student Email" margin="normal" variant="outlined" /></TableCell>
                <TableCell>
                    <Tooltip title="Save"><span><IconButton onClick={() => this.handleSaveEditStudent()} disabled={this.disableSave()} aria-label="save"><DoneIcon /></IconButton></span></Tooltip>
                    <Tooltip title="Cancel"><IconButton onClick={() => this.handleCloseEditStudent()} aria-label="cancel"><CloseIcon /></IconButton></Tooltip>
                </TableCell>
            </TableRow>
        )
    }

    /**
     * Generates the components for the students table.
     */
    render() {
        return (
            <div>
                <div className="table-container">

                    {this.state.isLoading &&
                        <div className="table-loading-shade">
                            <CircularProgress size={72} />
                        </div>
                    }

                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Tooltip title="Select/unselect all students">
                                        <Checkbox
                                            indeterminate={this.state.selectedStudents.size > 0 && this.state.selectedStudents.size < this.state.totalStudents}
                                            checked={this.state.selectedStudents.size === this.state.totalStudents}
                                            onChange={this.handleSelectAllClick}
                                            inputProps={{ 'aria-label': 'select all students' }}
                                        />
                                    </Tooltip>
                                </TableCell>
                                <TableCell></TableCell>
                                <TableCell sortDirection={this.state.sortColumn === 'studentSchoolId' ? this.state.sortOrder : false}>
                                    <TableSortLabel active={this.state.sortColumn === 'studentSchoolId'} direction={this.state.sortOrder} onClick={() => this.handleChangeSort('studentSchoolId')}>Student Id</TableSortLabel>
                                    <Tooltip title="Filter by Student Id"><IconButton onClick={() => this.handleFilterClick('studentSchoolId')} aria-label="filter"><FilterListIcon className={this.getColumnFilterClass('studentSchoolId')} /></IconButton></Tooltip>
                                </TableCell>
                                <TableCell sortDirection={this.state.sortColumn === 'firstName' ? this.state.sortOrder : false}>
                                    <TableSortLabel active={this.state.sortColumn === 'firstName'} direction={this.state.sortOrder} onClick={() => this.handleChangeSort('firstName')}>First Name</TableSortLabel>
                                    <Tooltip title="Filter by First Name"><IconButton onClick={() => this.handleFilterClick('firstName')} aria-label="filter"><FilterListIcon className={this.getColumnFilterClass('firstName')} /></IconButton></Tooltip>
                                </TableCell>
                                <TableCell sortDirection={this.state.sortColumn === 'lastName' ? this.state.sortOrder : false}>
                                    <TableSortLabel active={this.state.sortColumn === 'lastName'} direction={this.state.sortOrder} onClick={() => this.handleChangeSort('lastName')}>Last Name</TableSortLabel>
                                    <Tooltip title="Filter by Last Name"><IconButton onClick={() => this.handleFilterClick('lastName')} aria-label="filter"><FilterListIcon className={this.getColumnFilterClass('lastName')} /></IconButton></Tooltip>
                                </TableCell>
                                <TableCell sortDirection={this.state.sortColumn === 'studentEmail' ? this.state.sortOrder : false}>
                                    <TableSortLabel active={this.state.sortColumn === 'studentEmail'} direction={this.state.sortOrder} onClick={() => this.handleChangeSort('studentEmail')}>Student Email</TableSortLabel>
                                    <Tooltip title="Filter by Student Email"><IconButton onClick={() => this.handleFilterClick('studentEmail')} aria-label="filter"><FilterListIcon className={this.getColumnFilterClass('studentEmail')} /></IconButton></Tooltip>
                                </TableCell>
                                <TableCell>
                                    <Tooltip title="Add student"><IconButton onClick={() => this.handleAddStudent()} aria-label="add student"><AddBoxIcon /></IconButton></Tooltip>
                                    <Tooltip title="Delete selected students"><IconButton onClick={() => this.handleDeleteSelectedStudents()} aria-label="delete selected students"><DeleteIcon /></IconButton></Tooltip>
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { /* The add student row. */
                                this.state.isAdding &&
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell><TextField error={this.hasValidationError('Student Id')} helperText={this.getValidationError('Student Id')} onChange={(event) => this.handleChange(event, 'Student Id')} onBlur={(event) => this.handleBlur(event, 'Student Id')} placeholder="Student Id" margin="normal" variant="outlined" /></TableCell>
                                    <TableCell><TextField error={this.hasValidationError('First Name')} helperText={this.getValidationError('First Name')} onChange={(event) => this.handleChange(event, 'First Name')} placeholder="First Name" margin="normal" variant="outlined" /></TableCell>
                                    <TableCell><TextField error={this.hasValidationError('Last Name')} helperText={this.getValidationError('Last Name')} onChange={(event) => this.handleChange(event, 'Last Name')} placeholder="Last Name" margin="normal" variant="outlined" /></TableCell>
                                    <TableCell><TextField error={this.hasValidationError('Student Email')} helperText={this.getValidationError('Student Email')} onChange={(event) => this.handleChange(event, 'Student Email')} placeholder="Student Email" margin="normal" variant="outlined" /></TableCell>
                                    <TableCell>
                                        <Tooltip title="Save"><span><IconButton onClick={() => this.handleSaveAddStudent()} disabled={this.disableSave()} aria-label="save"><DoneIcon /></IconButton></span></Tooltip>
                                        <Tooltip title="Cancel"><IconButton onClick={() => this.handleCloseAddStudent()} aria-label="cancel"><CloseIcon /></IconButton></Tooltip>
                                    </TableCell>
                                </TableRow>
                            }

                            { /* The student rows. */
                                this.state.students.map(student => this.state.isEditingStudentId === student.studentId ? this.renderEditStudentRow(student) : this.renderDisplayStudentRow(student))
                            }
                        </TableBody>

                    </Table>
                </div>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                    count={this.state.totalStudents}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />

                <AlertDialog open={this.state.isAlertDialogOpen} handleClose={this.handleAlertDialogClose} title={this.state.alertDialogTitle} message={this.state.alertDialogMsg} />
                <ConfirmDialog open={this.state.isConfirmDialogOpen} handleClose={this.handleConfirmDialogClose} handleConfirm={this.state.handleConfirm} title='Delete' message={this.state.confirmDialgMsg} />
                <TableFilterTextDialog ref={this.filterDialogElement} open={this.state.isTableFilterTextDialogOpen} handleClose={this.handleTableFilterTextDialogClose} handleFilter={this.handleFilter} handleFilterClear={this.handleFilterClear} />
            </div>
        )
    }
}