import Types from '../types/general';
import * as API from '../api/general';

export const updateMealOptions = ({ mealOptions }) => async dispatch => {
    try {
        const response = await API.updateMealOptions({ mealOptions });
        dispatch({ type: Types.UPDATE_MEAL_OPTIONS, payload: response });
    } catch (e) {
        console.log(e);
    }
};

export const getMealOptions = () => async dispatch => {
    try {
        const response = await API.getMealOptions();
        dispatch({ type: Types.UPDATE_MEAL_OPTIONS, payload: response });
    } catch (e) {
        console.log(e);
    }
};
