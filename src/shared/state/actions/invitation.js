import Types from '../types/invitation';
import { getInvitations } from '../api/invitation';

export const updateInvitationList = () => async dispatch => {
    try {
        const invitations = await getInvitations();
        dispatch({ type: Types.UPDATE_INVITATION_LIST, payload: invitations });
    } catch (e) {
        console.log(e);
    }
};
