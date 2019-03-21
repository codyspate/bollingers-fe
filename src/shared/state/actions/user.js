import Types from '../types/user';
import { setCookie } from '../utils';
import * as API from '../api/user';

export const SignIn = ({ email, password }) => async dispatch => {
    try {
        dispatch({ type: Types.SET_LOADING_USER, payload: true });
        const { token, user } = await API.SignIn({ email, password });
        dispatch({ type: Types.SET_USER, payload: user });
        dispatch({ type: Types.SET_AUTH_TOKEN, payload: token });
        setCookie('token', token, 60);
    } catch (e) {
        console.log('SignIn Error', e);
    } finally {
        dispatch({ type: Types.SET_LOADING_USER, payload: false });
    }
};
