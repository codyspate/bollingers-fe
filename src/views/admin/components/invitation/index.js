import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as invitationActions from '../../../../shared/state/actions/invitation';
import Incrementor from '../../../../shared/components/incrementor';

const Content = styled.form`
    display: flex;
    flex-direction: column;
    flex-basis: 400px;
    max-width: 800px;
    margin: auto;
`;

const Flex = styled.div`
    display: flex;
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
`;

class Invitation extends React.Component {
    constructor() {
        super();
        this.initialState = {
            guestCount: 1,
            additionalGuests: 0,
            guests: []
        };
        this.state = { ...this.initialState };
        this.onChangeGuestCount = this.onChangeGuestCount.bind(this);
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };
    onChangeGuest = (e, index) => {
        const { target: { name, value } = {} } = e;
        this.setState(({ guests }) => {
            if (!Array.isArray(guests) || !guests.length)
                return { guests: [{ [name]: value }] };
            else if (index >= guests.length)
                return {
                    guests: [...guests, { [name]: value }]
                };
            return {
                guests: guests.map((guest, i) => {
                    if (i === index) return { ...guest, [name]: value };
                    return guest;
                })
            };
        });
    };
    onChangeGuestCount(num) {
        this.setState(({ guestCount }) => ({
            guestCount: guestCount + num
        }));
    }
    onSubmit = async e => {
        e.preventDefault();
        const { newInvitation } = this.props;
        const { guests, additionalGuests } = this.state;
        await newInvitation({
            guests,
            additionalGuests
        });
        toast('Invitation Created Successfully!');
    };
    render() {
        const { guestCount, additionalGuests } = this.state;
        return (
            <div className="py-4">
                <Content
                    onSubmit={this.onSubmit}
                    method="POST"
                    autoComplete="off"
                >
                    <Typography variant="h4" className="mb-3">
                        New Invitation
                    </Typography>
                    <Incrementor
                        onAdd={() => this.onChangeGuestCount(1)}
                        onRemove={() => this.onChangeGuestCount(-1)}
                        hideRemove={guestCount <= 1}
                    />
                    {Array(guestCount)
                        .fill(1)
                        .map((_, i) => (
                            <React.Fragment key={`guest-add-${i}`}>
                                <Typography>
                                    Guest {guestCount > 1 ? i + 1 : ''}
                                </Typography>
                                <Flex className="mb-4">
                                    <TextField
                                        label="First Name"
                                        name={`firstName`}
                                        type="text"
                                        autoComplete="off"
                                        onChange={e => this.onChangeGuest(e, i)}
                                        className="mr-1 flex-grow-1"
                                        value={this.state[`guest-first-${i}`]}
                                    />
                                    <TextField
                                        label="Last Name"
                                        name={`lastName`}
                                        type="text"
                                        autoComplete="off"
                                        onChange={e => this.onChangeGuest(e, i)}
                                        className="ml-1 flex-grow-1"
                                        value={this.state[`guest-last-${i}`]}
                                    />
                                </Flex>
                            </React.Fragment>
                        ))}
                    <Flex>
                        <TextField
                            label="Additional Guests"
                            name="additionalGuests"
                            type="number"
                            inputProps={{ min: '0', step: '1' }}
                            autoComplete="off"
                            onChange={this.onChange}
                            margin="normal"
                            value={additionalGuests}
                        />
                    </Flex>
                    <Flex justify="flex-end">
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Save
                        </Button>
                    </Flex>
                </Content>
            </div>
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
)(Invitation);
