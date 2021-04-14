import React from 'react';
import axios from 'axios'
import AsyncSelect from 'react-select/async';
import './Home.css'

const WIKI_URL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=';

/**
 * Returns the wikipedia pages that start with the specified term.
 *
 * @param {*} term the term to use to look for wikipedia page
 */
function getWikiResults(term) {
    return axios.get(WIKI_URL + term)
        .then(response => {
            // Use the result as both the value and the label for the dropdown
            return response.data[1].map(result => ({ value: result, label: result }))
        });
}

/**
 * Generates the content for the Home page.
 */
function Home() {

    return (
        /*
            loadOptions    = Function that returns a promise, which is the set of options to be used in the dropdown once the promise resolves.
            placeholder    = Placeholder for the select value
            isClearable    = Is the select value clearable
        */
        <div className="App-container">
            <label className="label">Search for a wiki page:</label>
            <AsyncSelect className="select" loadOptions={getWikiResults} placeholder="Wikipedia search" isClearable="true" />
            <p>This is an example of an autocomplete control with server-side processing. A loading indicator is displayed while it retrieves the results from the server.</p>
        </div>
    );

}

export default Home;
