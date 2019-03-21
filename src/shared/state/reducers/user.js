import Types from '../types/user';

const initialState = {
    user: null,
    token: null,
    loadingUser: false
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.SET_USER:
            return { ...state, user: action.payload };
        case Types.SET_AUTH_TOKEN:
            return { ...state, token: action.payload };
        case Types.SET_LOADING_USER:
            return { ...state, loadingUser: action.payload };
        default:
            return state;
    }
};

export default userReducer;
