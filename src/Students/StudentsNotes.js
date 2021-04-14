import React from "react";
import { Link } from "react-router-dom";

function StudentsNotes() {
  return (
    <div className="App-container">
      <p>The Students Notes page is under construction.</p>
      <p>Please go to one of the following pages:</p>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/students/list">Students-List</Link>
        </li>
      </ul>
    </div>
  );
}

export default StudentsNotes;
