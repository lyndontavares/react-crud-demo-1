import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

/**
 * A table filter dialog with components to select a filter operator and filter value.
 */
export default class TableFilterTextDialog extends React.Component {
    constructor(props) {
        super(props);

        this.state = { operator: 'Is equal to', value: '' };

        // Bind 'this' to the following methods so they can access 'this'
        this.handleOperatorChange = this.handleOperatorChange.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    /**
     * Called before this dialog is opened to set the filter operator and value.
     *
     * @param {string} op the filter operator
     * @param {string} val the filter value
     */
    setOperatorAndValue(op, val) {
        this.setState({ operator: op, value: val });
    }

    /**
     * Called when the filter operator changes.
     *
     * @param {*} event 
     */
    handleOperatorChange(event) {
        this.setState({ operator: event.target.value });
    }

    /**
     * Called when the filter value changes.
     *
     * @param {*} event 
     */
    handleValueChange(event) {
        this.setState({ value: event.target.value });
    }

    /**
     * Generates the content for the Filter Dialog.
     */
    render() {
        return ( 
            <Dialog
                open={this.props.open}
                onClose={() => this.props.handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <p>Show items with value that:</p>
                    <TextField select value={this.state.operator} variant="outlined" onChange={this.handleOperatorChange} style={{ width: 210 }}>
                        <MenuItem value='Is equal to'>Is equal to</MenuItem>
                        <MenuItem value='Is not equal to'>Is not equal to</MenuItem>
                        <MenuItem value='Starts with'>Starts with</MenuItem>
                        <MenuItem value='Contains'>Contains</MenuItem>
                        <MenuItem value='Does not contain'>Does not contain</MenuItem>
                        <MenuItem value='Ends with'>Ends with</MenuItem>
                    </TextField>
                    <br />
                    <TextField margin="normal" variant="outlined" value={this.state.value} onChange={this.handleValueChange} style={{ width: 210 }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.handleFilter(this.state.operator, this.state.value)} color="primary" autoFocus>
                        Filter
                    </Button>
                    <Button onClick={() => this.props.handleFilterClear()} color="primary">
                        Clear
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}