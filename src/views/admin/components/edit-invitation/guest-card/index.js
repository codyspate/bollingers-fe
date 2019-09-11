import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { lightenDarkenColor, isDark } from '../../../../../shared/utils/color';

const Box = styled.div`
    padding: 1rem;
    margin: 0.25rem;
    border: 1px solid #ececec;
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
const Guest = ({ guest, updateAttending }) => {
    if (!guest) return null;
    return (
        <Box className="row">
            <div className="col-12 col-md-4">
                <h4>
                    {guest.firstName} {guest.lastName}
                </h4>
            </div>
            <div className="col-12 col-md-4">
                <div className="d-flex align-items-center">
                    <span className="mr-2">Attending?</span>
                    <div>
                        <ChoiceBox
                            left
                            color="#bb593d"
                            active={guest.attending === false}
                            onClick={() =>
                                updateAttending({
                                    guestId: guest._id,
                                    attending: false
                                })
                            }
                        >
                            No
                        </ChoiceBox>
                        <ChoiceBox
                            right
                            color="#228422"
                            active={guest.attending === true}
                            onClick={() =>
                                updateAttending({
                                    guestId: guest._id,
                                    attending: true
                                })
                            }
                        >
                            Yes
                        </ChoiceBox>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-4">{/* vegan or non-vegan */}</div>
        </Box>
    );
};

export default Guest;
