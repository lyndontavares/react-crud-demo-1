import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import StudentsHttpClient from './StudentsHttpClient';
import './StudentDetailTable.css'

export default class StudentDetailTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = { studentId: this.props.studentId, details: [], totalDetails: 0, isLoading: true, rowsPerPage: 5, page: 0, sortColumn: 'termCreatedDate', sortOrder: 'desc' };

        // Bind 'this' to the following methods so they can access 'this'
        this.retrieveStudentDetail = this.retrieveStudentDetail.bind(this);
        this.handleChangeSort = this.handleChangeSort.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);

        this.retrieveStudentDetail(this.state.sortColumn, this.state.sortOrder, this.state.page, this.state.rowsPerPage, true);
    }

    /**
     * Enables the loading indicator and retrieves the students detail records.
     *
     * @param {string} sortColumn 
     * @param {string} sortOrder 
     * @param {number} page 
     * @param {number} rowsPerPage 
     * @param {boolean} constructorCall 
     */
    retrieveStudentDetail(sortColumn, sortOrder, page, rowsPerPage, constructorCall = false) {
        // If not being called from the constructor, set isLoading to true
        if (!constructorCall) {
            this.setState({ isLoading: true });
        }
        StudentsHttpClient.getStudentDetail(this.props.studentId, sortColumn, sortOrder, page, rowsPerPage)
            .then(response => {
                this.setState({ details: response.details, totalDetails: response.totalDetails, isLoading: false });
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
        this.retrieveStudentDetail(this.state.sortColumn, this.state.sortOrder, newPage, this.state.rowsPerPage);
    }

    /**
     * Called when rows per page is changed.
     *
     * @param {*} event 
     */
    handleChangeRowsPerPage(event) {
        const newRowsPerPage = parseInt(event.target.value, 10);
        const newPage = 0;
        this.setState({ page: newPage, rowsPerPage: newRowsPerPage });
        this.retrieveStudentDetail(this.state.sortColumn, this.state.sortOrder, newPage, newRowsPerPage);
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
        this.retrieveStudentDetail(newSortColumn, newSortOrder, this.state.page, this.state.rowsPerPage);
    }

    /**
     * Generates the components for the student detail table.
     */
    render() {
        return (
            <div>
                <div>

                    {this.state.isLoading &&
                        <div className="table-loading-shade">
                            <CircularProgress size={72} />
                        </div>
                    }

                    <Table>

                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4}></TableCell>
                                <TableCell colSpan={5}>Current</TableCell>
                                <TableCell colSpan={5}>Projected</TableCell>
                                <TableCell colSpan={2}>Required</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sortDirection={this.state.sortColumn === 'termCreatedDate' ? this.state.sortOrder : false} style={{ minWidth: '155px' }}>
                                    <TableSortLabel active={this.state.sortColumn === 'termCreatedDate'} direction={this.state.sortOrder} onClick={() => this.handleChangeSort('termCreatedDate')}>Date</TableSortLabel>
                                </TableCell>
                                <TableCell style={{ minWidth: '130px' }}>Description</TableCell>
                                <TableCell style={{ minWidth: '30px' }}>Applied</TableCell>
                                <TableCell style={{ minWidth: '100px' }}>Loans Total Amount</TableCell>
                                <TableCell>Att. Hrs</TableCell>
                                <TableCell>Earn. Hrs</TableCell>
                                <TableCell>Cmp. Rate</TableCell>
                                <TableCell>Cum. GPA</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Enr. Hrs</TableCell>
                                <TableCell>Drp. Hrs</TableCell>
                                <TableCell>Att. Hrs</TableCell>
                                <TableCell>Cmp. Rate</TableCell>
                                <TableCell>Min. Term GPA</TableCell>
                                <TableCell>Addl. Hrs</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            { /* The detail rows. */
                                this.state.details.map(detail =>
                                    <TableRow key={detail.termCreatedDate}>
                                        <TableCell>{detail.termCreatedDate}</TableCell>
                                        <TableCell>{detail.termDescription}</TableCell>
                                        <TableCell align='center'><Checkbox checked={detail.applied} disableRipple color='default' /></TableCell>
                                        <TableCell>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(detail.loansTotalAmount)}</TableCell>
                                        <TableCell>{detail.attemptedHours}</TableCell>
                                        <TableCell>{detail.earnedHours}</TableCell>
                                        <TableCell>{detail.completionRate}%</TableCell>
                                        <TableCell>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(detail.gpa)}</TableCell>
                                        <TableCell>{detail.financialAidStatus}</TableCell>
                                        <TableCell>{detail.financialAidStatusProj}</TableCell>
                                        <TableCell>{detail.enrolledHours}</TableCell>
                                        <TableCell>{detail.droppedHours}</TableCell>
                                        <TableCell>{detail.attemptedHoursProj}</TableCell>
                                        <TableCell>{detail.completionRateProj}%</TableCell>
                                        <TableCell>{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(detail.gpaRequired)}</TableCell>
                                        <TableCell>{detail.addlHoursRequired}</TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>

                    </Table>
                </div>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 15, 20, 25]}
                    count={this.state.totalDetails}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    SelectProps={{
                        inputProps: { 'aria-label': 'rows per page' },
                        native: true,
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        )
    }
}
