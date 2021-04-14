import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import './App.css'
import Home from './Home/Home';
import Calculator from './Calculator/Calculator';
import StudentsTable from './Students/StudentsTable';
import StudentsNotes from './Students/StudentsNotes';

/**
 * Generates the menus and initializes the routing for the application.
 */
function App() {

    const [studentsAnchorEl, setStudentsAnchorEl] = React.useState(null);
    const isStudentsOpen = Boolean(studentsAnchorEl);

    function handleStudentsMenu(event) {
        setStudentsAnchorEl(event.currentTarget);
    }

    function handleStudentsClose() {
        setStudentsAnchorEl(null);
    }

    // The usage of React.forwardRef will no longer be required for react-router-dom v6.
    // see https://github.com/ReactTraining/react-router/issues/6056
    const RouterLink = React.forwardRef((props, ref) => (
        <Link innerRef={ref} {...props} />
    ));

    return (
        <Router>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <div>
                            <Button color="inherit" component={RouterLink} to="/">Home</Button>
                            <Button color="inherit" component={RouterLink} to="/calc">Calculator</Button>
                            <Button color="inherit" onClick={handleStudentsMenu}>Students</Button>
                            <Menu keepMounted anchorEl={studentsAnchorEl} getContentAnchorEl={null} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} transformOrigin={{ vertical: 'top', horizontal: 'center' }} open={isStudentsOpen} onClose={handleStudentsClose}>
                                <MenuItem onClick={handleStudentsClose} component={RouterLink} to="/students/list">List</MenuItem>
                                <MenuItem onClick={handleStudentsClose} component={RouterLink} to="/students/notes">Notes</MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>

            <Route exact path="/" component={Home} />
            <Route path="/calc" component={Calculator} />
            <Route path="/students/list" component={StudentsTable} />
            <Route path="/students/notes" component={StudentsNotes} />
        </Router>
    );
}

export default App;
