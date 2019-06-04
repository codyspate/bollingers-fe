import { combineReducers } from 'redux';
import user from './user';
import invitations from './invitation';
import general from './general';

export default combineReducers({
    user,
    invitations,
    general
});
