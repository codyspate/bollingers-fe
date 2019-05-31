import Types from '../types/invitation';

const initialState = {
    invitationList: []
};

const invitationReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.UPDATE_INVITATION_LIST:
            return { ...state, invitationList: action.payload };
        default:
            return state;
    }
};

export default invitationReducer;
