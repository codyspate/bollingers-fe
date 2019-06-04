import Types from '../types/general';

const initialState = {
    mealOptions: []
};

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case Types.UPDATE_MEAL_OPTIONS:
            return { ...state, mealOptions: action.payload };
        default:
            return state;
    }
};

export default generalReducer;
