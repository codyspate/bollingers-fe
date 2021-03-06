import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as invitationActions from '../../../../shared/state/actions/invitation';
import styled from 'styled-components';
import { debounce } from '../../../../shared/state/utils';
import { search } from './api';

const Suggestion = styled.a`
    display: block;
    padding: 1rem 0.5rem;
    margin: 0.5rem;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: #353535;
    &:hover {
        transform: scale(1.01);
        color: #353535;
        border: none;
        box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.3);
        text-decoration: none;
    }
`;

class Rsvp extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            suggestions: []
        };
    }
    onChange = e => {
        const { firstName, lastName } = this.state;
        const newVal = { [e.target.name]: e.target.value };
        this.setState(newVal, async () => {
            debounce(search, 600)({
                firstName,
                lastName,
                ...newVal
            }).then(data => {
                this.setState({
                    suggestions: Array.isArray(data) ? data : []
                });
            });
        });
        // const names = debounce(search({ firstName, lastName, ...newVal }), 600);
    };

    render() {
        const { firstName, lastName, suggestions } = this.state;
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
                            name="lastName"
                            value={lastName}
                            label="Last Name"
                            onChange={this.onChange}
                            margin="normal"
                            className="ml-1 flex-grow-1 w-100"
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        {suggestions.map(item => {
                            return (
                                <div key={item._id} className="row">
                                    <div className="col-12">
                                        <Suggestion
                                            href={`/invitation/${item._id}`}
                                        >
                                            <span>{`${item.firstName ||
                                                ''} ${item.lastName ||
                                                ''}`}</span>
                                        </Suggestion>
                                    </div>
                                </div>
                            );
                        })}
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
