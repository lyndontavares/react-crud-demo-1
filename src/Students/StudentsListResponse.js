/**
 * The results of the REST call to retreive the students.
 */
export default class StudentsListResponse {

    /**
     * The students retrieved based on the sorting, filtering and paging values.
     */
    students;

    /**
     * The total number of students that exist.
     * NOTE: this is not the number of students retrieved.
     */
    totalStudents;

    constructor(students, totalStudents) {
        this.students = students;
        this.totalStudents = totalStudents;
    }
}
