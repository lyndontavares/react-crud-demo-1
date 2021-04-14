import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

/**
 * An Alert Dialog that displays a title, a message and an Ok button.
 */
export default class AlertDialog extends React.Component {

    /**
     * Generates the content for the Alert Dialog.
     */
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={() => this.props.handleClose()}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.props.handleClose()} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}