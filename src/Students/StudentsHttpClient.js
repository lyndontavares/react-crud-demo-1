import Response from './Response';
import StudentDetailResponse from './StudentDetailResponse';
import StudentsListResponse from './StudentsListResponse';

export default class StudentsHttpClient {

    /**
     * Hardcoded student data that's used for the example application instead of making REST calls.
     */
    static STUDENTS = [
        { studentId: 1, studentSchoolId: 'M1000001', firstName: 'Ron', lastName: 'Black', studentEmail: 'rb@sappro.com' },
        { studentId: 2, studentSchoolId: 'M1000002', firstName: 'Jari', lastName: 'Johnson', studentEmail: 'jj@sappro.com' },
        { studentId: 3, studentSchoolId: 'M1000003', firstName: 'Steve', lastName: 'Tran', studentEmail: 'st@sappro.com' },
        { studentId: 4, studentSchoolId: 'M1000004', firstName: 'Betty', lastName: 'Crocker', studentEmail: 'bc@sappro.com' },
        { studentId: 5, studentSchoolId: 'M1000005', firstName: 'Phil', lastName: 'Jackson', studentEmail: 'pj@sappro.com' },
        { studentId: 6, studentSchoolId: 'M1000006', firstName: 'Trish', lastName: 'Warren', studentEmail: 'tw@sappro.com' },
        { studentId: 7, studentSchoolId: 'M1000007', firstName: 'Becky', lastName: 'Long', studentEmail: 'bl@sappro.com' },
        { studentId: 8, studentSchoolId: 'M1000008', firstName: 'Ronda', lastName: 'Pierce', studentEmail: 'rp@sappro.com' },
        { studentId: 9, studentSchoolId: 'M1000009', firstName: 'Denise', lastName: 'Stephenson', studentEmail: 'ds@sappro.com' },
        { studentId: 10, studentSchoolId: 'M1000010', firstName: 'Frank', lastName: 'Lawson', studentEmail: 'fl@sappro.com' },
        { studentId: 11, studentSchoolId: 'M1000011', firstName: 'Eva', lastName: 'Guillot', studentEmail: 'eg@sappro.com' },
        { studentId: 12, studentSchoolId: 'M1000012', firstName: 'James', lastName: 'Smith', studentEmail: 'js@sappro.com' },
        { studentId: 13, studentSchoolId: 'M1000013', firstName: 'Sam', lastName: 'Garland', studentEmail: 'sg@sappro.com' },
        { studentId: 14, studentSchoolId: 'M1000014', firstName: 'Hillary', lastName: 'Dutton', studentEmail: 'hd@sappro.com' },
        { studentId: 15, studentSchoolId: 'M1000015', firstName: 'Simon', lastName: 'Shuster', studentEmail: 'ss@sappro.com' },
        { studentId: 16, studentSchoolId: 'M1000016', firstName: 'Ray', lastName: 'Sutton', studentEmail: 'rs@sappro.com' },
        { studentId: 17, studentSchoolId: 'M1000017', firstName: 'Luke', lastName: 'Hadnot', studentEmail: 'lh@sappro.com' },
        { studentId: 18, studentSchoolId: 'M1000018', firstName: 'Dave', lastName: 'Klein', studentEmail: 'dk@sappro.com' },
        { studentId: 19, studentSchoolId: 'M1000019', firstName: 'John', lastName: 'Anderson', studentEmail: 'ja@sappro.com' },
        { studentId: 20, studentSchoolId: 'M1000020', firstName: 'Roland', lastName: 'Hug', studentEmail: 'rh@sappro.com' }
    ];

    /**
     * Hardcoded student detail data that's used for the example application instead of making REST calls.
     */
    static STUDENT_DETAILS = [
        { termCreatedDate: '9/29/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 20', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/29/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 19', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/28/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 18', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/28/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 17', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/27/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 16', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/27/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 15', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/26/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 14', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/26/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 13', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/25/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 12', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/25/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 11', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/24/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 10', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/24/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 9', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/23/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 8', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/23/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 7', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/22/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 6', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/22/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 5', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/21/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 4', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/21/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 3', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/20/2017 11:51:18 AM', termDescription: 'Fall 2017 Upload 2', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 },
        { termCreatedDate: '9/20/2017 11:47:15 AM', termDescription: 'Fall 2017 Upload 1', applied: true, loansTotalAmount: 22587, attemptedHours: 102, earnedHours: 80, completionRate: 78.43, gpa: 2.6, financialAidStatus: 'Suspended', financialAidStatusProj: 'Suspended', enrolledHours: 0, droppedHours: 0, repeatedHours: 0, attemptedHoursProj: 102, completionRateProj: 78.43, gpaRequired: 0, addlHoursRequired: -11 }
    ];

    /**
     * Returns students based on the sorting, paging and filtering parameters.
     *
     * @param {string} sortColumn the column used to sort the results
     * @param {string} sortDirection the sort direction ('asc' or 'desc')
     * @param {number} pageIndex the page number to return
     * @param {number} pageSize the page size
     * @param {Map<string, TableFilter>} tableFilters the filters to apply
     */
    static getStudents(sortColumn, sortDirection, pageIndex, pageSize, tableFilters) {

        // In a production application, the following logic would be replaced with a REST call!!!

        let studentsCopy;
        if ((sortDirection === 'desc') || (sortDirection === 'asc')) {
            // Return the students sorted by the specified column and direction
            studentsCopy = this.STUDENTS.slice();
            studentsCopy = studentsCopy.sort(this.compareValues(sortColumn, sortDirection));
        } else {
            // Return the students in no particular order
            studentsCopy = this.STUDENTS.slice();
        }

        // Filter the students
        studentsCopy = studentsCopy.filter(student => this.filterStudents(student, tableFilters));
        const total = studentsCopy.length;

        const start = pageIndex * pageSize;
        const end = start + pageSize;
        studentsCopy = studentsCopy.slice(start, end);

        const studentsList = new StudentsListResponse(studentsCopy, total);
        return new Promise((resolve, reject) => { setTimeout(function () { resolve(studentsList); }, 500) });
    }

    /**
     * Returns detail records for the passed in studentId based on the sorting, paging and filtering parameters.
     *
     * @param {number} studentId id of student to be retrieved
     * @param {string} sortColumn the column used to sort the results
     * @param {string} sortDirection the sort direction ('asc' or 'desc')
     * @param {number} pageIndex the page number to return
     * @param {number} pageSize the page size
     */
    static getStudentDetail(studentId, sortColumn, sortDirection, pageIndex, pageSize) {

        // In a production application, the following logic would be replaced with a REST call!!!

        let studentDetailDeepCopy = JSON.parse(JSON.stringify(this.STUDENT_DETAILS));
        if ((sortDirection === 'desc') || (sortDirection === 'asc')) {
            // Return the students sorted by the specified column and direction
            studentDetailDeepCopy = studentDetailDeepCopy.sort(this.compareValues(sortColumn, sortDirection));
        }

        const start = pageIndex * pageSize;
        const end = start + pageSize;
        studentDetailDeepCopy = studentDetailDeepCopy.slice(start, end);

        // We'll set the loansTotalAmount to the studentId * 1000 so we can verify the details are specific to the student
        studentDetailDeepCopy[0].loansTotalAmount = studentId * 1000;

        const studentDetailList = new StudentDetailResponse(studentDetailDeepCopy, this.STUDENT_DETAILS.length);
        return new Promise((resolve, reject) => { setTimeout(function () { resolve(studentDetailList); }, 500) });
    }

    /**
     * Updates the passed in student and returns the result of the update.
     *
     * @param {Student} student the student to update
     */
    static updateStudent(student) {

        // In a production application, the following logic would be replaced with a REST call!!!

        let rsp;

        // Get the index of the student that is being updated
        const studentIndex = this.STUDENTS.findIndex(s => s.studentId === student.studentId);

        if (studentIndex === 0) {
            // Simulate an error for testing purposes
            rsp = new Response(false, 'Failed to update student, please try again!');
        } else {
            rsp = new Response(true);

            // Update the student
            this.STUDENTS[studentIndex] = student;
        }

        return new Promise((resolve, reject) => { setTimeout(function () { resolve(rsp); }, 500) });
    }

    /**
     * Adds the passed in student and returns the result of the add.
     *
     * @param {Student} student the student to add
     */
    static addStudent(student) {

        // In a production application, the following logic would be replaced with a REST call!!!

        let rsp;

        if (student.studentSchoolId === 'BAD') {
            // Simulate an error for testing purposes
            rsp = new Response(false, 'Failed to add student, please try again!');
        } else {
            rsp = new Response(true);

            student.studentId = this.getNextStudentId();

            // Add the student
            this.STUDENTS.push(student);
        }

        return new Promise((resolve, reject) => { setTimeout(function () { resolve(rsp); }, 500) });
    }

    /**
     * Deletes the passed in student and returns the result of the delete.
     *
     * @param {number} studentId the studentId of the student to delete
     */
    static deleteStudent(studentId) {

        // In a production application, the following logic would be replaced with a REST call!!!

        let rsp;

        // Get the index of the student that is being deleted
        const studentIndex = this.STUDENTS.findIndex(s => s.studentId === studentId);

        if (studentIndex === 0) {
            // Simulate an error for testing purposes
            rsp = new Response(false, 'Failed to delete student, please try again!');
        } else {
            rsp = new Response(true);

            // Delete the student
            this.STUDENTS.splice(studentIndex, 1);
        }

        return new Promise((resolve, reject) => { setTimeout(function () { resolve(rsp); }, 500) });
    }

    /**
     * Deletes the passed in students and returns the result of the delete.
     *
     * @param {number[]} studentIds the studentIds of the students to delete
     */
    static deleteStudents(studentIds) {

        // In a production application, the following logic would be replaced with a REST call!!!

        const rsp = new Response(true);

        studentIds.forEach(studentId => {
            // Get the index of the student that is being delete
            const studentIndex = this.STUDENTS.findIndex(s => s.studentId === studentId);

            // Delete the student
            this.STUDENTS.splice(studentIndex, 1);
        });

        return new Promise((resolve, reject) => { setTimeout(function () { resolve(rsp); }, 500) });
    }

    /**
     * Returns a response with success=true if the passed in student school id is not assigned to another student.
     *
     * @param {number} studentId the student id that the student school id will be assigned to
     * @param {string} studentSchoolId the student school id to validate
     */
    static validateStudentSchoolId(studentId, studentSchoolId) {
        
        // In a production application, the following logic would be replaced with a REST call!!!

        let rsp;

        // Get the index of the student that is being validated
        const studentIndex = this.STUDENTS.findIndex(s => s.studentId === studentId);

        // Get the index of any student that has the same student school id
        const studentMatchIndex = this.STUDENTS.findIndex(s => s.studentSchoolId === studentSchoolId);
        if ((studentMatchIndex !== -1) && (studentMatchIndex !== studentIndex)) {
            rsp = new Response(false, 'Student Id is already assigned');
        } else {
            rsp = new Response(true);
        }

        return new Promise((resolve, reject) => { setTimeout(function () { resolve(rsp); }, 500) });
    }

    /**
     * Returns a function that can be passed to the sort() function to sort values based on the passed in sortColumn and sortDirection.
     *
     * @param {string} sortColumn 
     * @param {string} sortDirection 
     */
    static compareValues(sortColumn, sortDirection) {
        return function (a, b) {
            if (!a.hasOwnProperty(sortColumn) || !b.hasOwnProperty(sortColumn)) {
                return 0;
            }
            const comparison = a[sortColumn].localeCompare(b[sortColumn]);

            return (
                (sortDirection === 'desc') ? (comparison * -1) : comparison
            );
        };
    }

    /**
     * Returns true if the student matches the filters.
     *
     * @param {Student} student the student to be compared to the filters
     * @param {Map<string, TableFilter>} tableFilters  the filters to apply to the students
     */
    static filterStudents(student, tableFilters) {
        // For some reason StackBlitz didn't like the following for loop so I changed it to use Array.from:
        //
        //      for (const [field, filter] of tableFilters)
        //
        const filters = Array.from(tableFilters.values());
        for (const filter of filters) {
            let testValue;
            switch (filter.field) {
                case 'studentSchoolId':
                    testValue = student.studentSchoolId;
                    break;
                case 'firstName':
                    testValue = student.firstName;
                    break;
                case 'lastName':
                    testValue = student.lastName;
                    break;
                case 'studentEmail':
                    testValue = student.studentEmail;
                    break;
                default:
                    return true;
            }

            switch (filter.operator) {
                case 'Is equal to':
                    if (testValue !== filter.value) {
                        return false;
                    }
                    break;
                case 'Is not equal to':
                    if (testValue === filter.value) {
                        return false;
                    }
                    break;
                case 'Starts with':
                    if (!testValue.startsWith(filter.value)) {
                        return false;
                    }
                    break;
                case 'Contains':
                    if (!testValue.includes(filter.value)) {
                        return false;
                    }
                    break;
                case 'Does not contain':
                    if (testValue.includes(filter.value)) {
                        return false;
                    }
                    break;
                case 'Ends with':
                    if (!testValue.endsWith(filter.value)) {
                        return false;
                    }
                    break;
                default:
                    return true;
            }
        }

        return true;
    }

    /**
     * Returns the next available student id.
     */
    static getNextStudentId() {
        let maxStudentId = 0;
        for (let i = 0; i < this.STUDENTS.length; i++) {
            if (maxStudentId < this.STUDENTS[i].studentId) {
                maxStudentId = this.STUDENTS[i].studentId;
            }
        }

        return maxStudentId + 1;
    }
}