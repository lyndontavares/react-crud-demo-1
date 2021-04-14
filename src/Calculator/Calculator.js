import React from "react";
import { Link } from "react-router-dom";

/**
 * Generates the content for the Calculator page.
 */
function Calculator() {
  return (
    <div className="App-container">
      <p>The Calculator page is under construction.</p>
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

export default Calculator;
