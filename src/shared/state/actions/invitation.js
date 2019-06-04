import Types from '../types/invitation';
import {
    getInvitations,
    updateAttendingStatus,
    createInvitation
} from '../api/invitation';

export const updateInvitationList = () => async dispatch => {
    try {
        const invitations = await getInvitations();
        dispatch({ type: Types.UPDATE_INVITATION_LIST, payload: invitations });
    } catch (e) {
        console.log(e);
    }
};

export const updateGuestAttending = ({
    guestId,
    attending
}) => async dispatch => {
    try {
        await updateAttendingStatus({ guestId, attending });
        await updateInvitationList()(dispatch);
    } catch (e) {
        console.log(e);
    }
};

export const newInvitation = ({
    guests,
    additionalGuests
}) => async dispatch => {
    try {
        await createInvitation({ guests, additionalGuests });
        await updateInvitationList()(dispatch);
    } catch (e) {
        console.log(e);
    }
};
