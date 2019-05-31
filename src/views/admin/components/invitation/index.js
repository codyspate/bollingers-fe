import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import styled from 'styled-components';
import { createInvitation } from './api';

const Content = styled.form`
    display: flex;
    flex-direction: column;
    flex-basis: 400px;
    padding: 32px;
`;

const Flex = styled.div`
    display: flex;
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
`;

class Invitation extends React.Component {
    constructor() {
        super();
        this.state = {
            guestCount: 1,
            additionalGuests: 0,
            guests: []
        };
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
                    console.log(guests, guests.length, index, i);
                    if (i === index) return { ...guest, [name]: value };
                    return guest;
                })
            };
        });
    };
    onChangeGuestCount = num => {
        this.setState(({ guestCount }) => ({
            guestCount: guestCount + num
        }));
    };
    onSubmit = e => {
        e.preventDefault();
        const { guests, additionalGuests } = this.state;
        createInvitation({
            guests,
            additionalGuests
        });
    };
    render() {
        const { guestCount, additionalGuests } = this.state;
        return (
            <div>
                <Content onSubmit={this.onSubmit} method="POST">
                    <Typography variant="h4" className="mb-3">
                        New Invitation
                    </Typography>
                    <Flex justify="flex-end">
                        {guestCount > 1 ? (
                            <Fab
                                size="small"
                                onClick={() => this.onChangeGuestCount(-1)}
                                margin="normal"
                                className="mr-1"
                            >
                                <RemoveIcon />
                            </Fab>
                        ) : null}
                        <Fab
                            size="small"
                            onClick={() => this.onChangeGuestCount(1)}
                            margin="normal"
                            color="primary"
                            className="ml-1"
                        >
                            <AddIcon />
                        </Fab>
                    </Flex>
                    {Array(guestCount)
                        .fill(1)
                        .map((_, i) => (
                            <React.Fragment>
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
                            min="0"
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

export default Invitation;
