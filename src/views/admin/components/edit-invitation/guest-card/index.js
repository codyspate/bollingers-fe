import React from 'react';
import styled from 'styled-components';
import { lightenDarkenColor, isDark } from '../../../../../shared/utils/color';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import posed from 'react-pose';

const posedP = posed.p({
    visible: {
        opacity: 1
    },
    hidden: {
        opacity: 0
    }
});

const P = styled(posedP)`
    text-transform: uppercase;
    color: #228422;
    margin-bottom: 0;
    font-weight: bold;
`;

const posedBox = posed.div({
    normal: {
        border: '1px solid #ececec',
        'border-bottom': '1px solid #ececec'
    },
    success: {
        border: '1px solid #ececec',
        'border-bottom': '4px solid #228422'
    }
});

const Box = styled(posedBox)`
    padding: 1rem;
    margin: 0.25rem;
    /* border: 1px solid #ececec; */
`;

const ChoiceBox = styled.button`
    height: 2.5rem;
    width: 4rem;
    outline: none;
    border: 2px solid;
    border-radius: ${({ left, right }) => {
        if (left) return '2px 0 0 2px';
        if (right) return '0 2px 2px 0';
        return '2px';
    }};
    color: ${props => {
        if (!props.active) return '';
        if (isDark(lightenDarkenColor(props.color, 40))) return '#fff';
        return '';
    }};
    border-color: ${props => props.color};
    background-color: ${props =>
        props.active ? lightenDarkenColor(props.color, 40) : '#fff'};
    transition: all 0.1s ease-in-out;

    &:focus {
        outline: none;
    }
    &:hover {
        transform: scale(1.1);
    }
`;

const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: '100%'
    },
    button: {
        margin: theme.spacing.unit
    }
});
const Guest = ({
    guest,
    updateAttending,
    updateGuestInfo,
    classes,
    additional,
    addGuest
}) => {
    if (!guest && !additional) return null;
    const [newGuest, setGuest] = React.useState({ additional: true });
    const [saved, setSaved] = React.useState(false);
    return (
        <Box pose={saved ? 'success' : 'normal'}>
            <div className="row">
                <div className="col-12 col-md-4">
                    {guest ? (
                        <h4>
                            {guest.firstName} {guest.lastName}
                        </h4>
                    ) : (
                        <div>
                            <TextField
                                id="first-name"
                                label="First Name"
                                className={classes.textField}
                                value={newGuest.firstName || ''}
                                onChange={e => {
                                    setGuest({
                                        ...newGuest,
                                        firstName: e.target.value
                                    });
                                }}
                                margin="normal"
                            />
                            <TextField
                                id="last-name"
                                label="Last Name"
                                className={`${classes.textField} mb-4`}
                                value={newGuest.lastName || ''}
                                onChange={e => {
                                    setGuest({
                                        ...newGuest,
                                        lastName: e.target.value
                                    });
                                }}
                                margin="normal"
                            />
                        </div>
                    )}
                </div>
                <div className="col-12 col-md-4">
                    <div className="d-flex align-items-center">
                        <span className="mr-2">Attending?</span>
                        <div>
                            <ChoiceBox
                                left
                                color="#bb593d"
                                active={
                                    (guest && guest.attending === false) ||
                                    newGuest.attending === false
                                }
                                onClick={async e => {
                                    e.preventDefault();
                                    if (guest) {
                                        await updateAttending({
                                            guestId: guest && guest._id,
                                            attending: false
                                        });
                                        setSaved(true);
                                        setTimeout(() => setSaved(false), 1500);
                                    } else
                                        return setGuest({
                                            ...newGuest,
                                            attending: false
                                        });
                                }}
                            >
                                No
                            </ChoiceBox>
                            <ChoiceBox
                                right
                                color="#228422"
                                active={
                                    (guest && guest.attending === true) ||
                                    newGuest.attending === true
                                }
                                onClick={async e => {
                                    e.preventDefault();
                                    if (guest) {
                                        await updateAttending({
                                            guestId: guest && guest._id,
                                            attending: true
                                        });
                                        setSaved(true);
                                        setTimeout(() => setSaved(false), 1500);
                                    } else
                                        return setGuest({
                                            ...newGuest,
                                            attending: true
                                        });
                                }}
                            >
                                Yes
                            </ChoiceBox>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="meal">Meal Option</InputLabel>
                        <Select
                            value={
                                (guest && guest.mealChoice) ||
                                newGuest.mealChoice ||
                                ''
                            }
                            inputProps={{ id: 'meal' }}
                            onChange={async e => {
                                e.preventDefault();
                                if (guest) {
                                    await updateGuestInfo(guest && guest._id, {
                                        mealChoice: e.target.value
                                    });
                                    setSaved(true);
                                    setTimeout(() => setSaved(false), 1500);
                                } else
                                    return setGuest({
                                        ...newGuest,
                                        mealChoice: e.target.value
                                    });
                            }}
                        >
                            <MenuItem value="nonVegan">Non-Vegan</MenuItem>
                            <MenuItem value="vegan">Vegan</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {additional ? (
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={async e => {
                            console.log('hit');
                            // e.preventDefault();
                            if (newGuest.firstName || newGuest.lastName) {
                                await addGuest(newGuest);
                                setSaved(true);
                                setTimeout(() => setSaved(false), 1500);
                            } else alert('Please add your guests name.');
                        }}
                    >
                        Save
                    </Button>
                ) : null}
            </div>
            <div className="row">
                <div className="col">
                    <P
                        className="pt-2 pt-md-0"
                        pose={saved ? 'visible' : 'hidden'}
                    >
                        Saved
                    </P>
                </div>
            </div>
        </Box>
    );
};

export default withStyles(styles)(Guest);
