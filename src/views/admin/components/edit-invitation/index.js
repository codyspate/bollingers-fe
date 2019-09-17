import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../../shared/state/actions/user';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';

import {
    getInvitation,
    updateAttendingStatus,
    updateGuest,
    addGuest
} from '../../../../shared/state/api/invitation';
import Guest from './guest-card';

const Container = styled.form`
    background-color: #fff;
`;

const Thanks = styled.div`
    color: #228422;
    h6 {
        color: #228422;
    }
`;

const EditInvitation = ({ match = {}, user }) => {
    const { params: { guestId } = {} } = match;
    const [invitation, setInvitation] = useState({});
    const [guests, setGuests] = useState();
    const [additionalGuests, setAdditionalGuests] = useState();

    const fetchData = async () => {
        const inv = await getInvitation({ guestId });
        setInvitation(inv);
        updateGuestComponents(inv);
    };

    useEffect(() => {
        fetchData();
    }, invitation.guests);

    const updateStatus = async ({ guestId, attending }) => {
        await updateAttendingStatus({ guestId, attending });
        return fetchData();
    };

    const updateGuestInfo = async (guestId, updateObj) => {
        await updateGuest(guestId, updateObj);
        return fetchData();
    };

    const createGuest = async guestObj => {
        if (!invitation._id) return;
        await addGuest(invitation._id, guestObj, true);
        return fetchData();
    };

    const updateGuestComponents = inv => {
        console.log('updating...', inv);
        const g = Array.isArray(inv.guests)
            ? inv.guests.map(g => (
                  <Guest
                      updateGuestInfo={updateGuestInfo}
                      updateAttending={updateStatus}
                      key={g._id}
                      guest={g}
                  />
              ))
            : null;
        setGuests(g);
        const aG = inv.additionalGuests
            ? new Array(inv.additionalGuests || 0)
                  .fill(1)
                  .map((a, i) => (
                      <Guest
                          additional
                          addGuest={createGuest}
                          key={`additionalGuest_${i}`}
                      />
                  ))
            : null;
        setAdditionalGuests(aG);
    };
    console.log(
        invitation,
        invitation &&
            Array.isArray(invitation.guests) &&
            invitation.guests.filter(
                g => g.attending !== undefined && g.attending !== null
            ).length === invitation.guests.length
    );
    return (
        <Container className="container py-4">
            <Typography variant="h4">Edit Invitation</Typography>
            {invitation &&
            Array.isArray(invitation.guests) &&
            invitation.guests.filter(
                g =>
                    g.attending !== undefined &&
                    g.attending !== null &&
                    g.mealChoice
            ).length === invitation.guests.length ? (
                <Thanks className="d-flex mr-4 align-items-center">
                    <FontAwesomeIcon icon={faCheckCircle} size="3x" />
                    <Typography className="ml-2" variant="h6">
                        All done! Thanks for the RSVP!
                    </Typography>
                </Thanks>
            ) : null}
            <div className="mb-4">{guests}</div>
            {additionalGuests ? (
                <Typography variant="h5">Additional Guests</Typography>
            ) : null}
            {additionalGuests}
        </Container>
    );
};

const mapStateToProps = state => ({ ...state.user });
const mapDispatchToProps = dispatch =>
    bindActionCreators(userActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditInvitation);
