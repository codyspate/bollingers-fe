import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as invitationActions from '../../../../shared/state/actions/invitation';
import { debounce } from '../../../../shared/state/utils';
import { search } from './api';

class Rsvp extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: ''
        };
    }
    onChange = e => {
        const { firstName, lastName } = this.state;
        console.log();
        const newVal = { [e.target.name]: e.target.value };
        this.setState(newVal);
        debounce(search({ firstName, lastName, ...newVal }), 600);
    };

    render() {
        const { firstName, lastName } = this.state;
        const { className } = this.props;
        return (
            <Paper className={`p-3 ${className}`}>
                <Typography variant="display1" align="center">
                    RSVP
                </Typography>
                <Typography variant="caption" align="center">
                    Type in your name to get started!
                </Typography>
                <div className="row">
                    <div className="col-12">
                        <TextField
                            name="firstName"
                            value={firstName}
                            label="First Name"
                            onChange={this.onChange}
                            margin="normal"
                            className="mr-1 flex-grow-1 w-100"
                        />
                    </div>
                    <div className="col-12">
                        <TextField
                            name="lastname"
                            value={lastName}
                            label="Last Name"
                            onChange={this.onChange}
                            margin="normal"
                            className="ml-1 flex-grow-1 w-100"
                        />
                    </div>
                </div>
            </Paper>
        );
    }
}

const mapStateToProps = state => ({ ...state.invitations });
const mapDispatchToProps = dispatch =>
    bindActionCreators(invitationActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(Rsvp);
