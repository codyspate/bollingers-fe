import { combineReducers } from 'redux';
import user from './user';
import invitations from './invitation';

export default combineReducers({
    user,
    invitations
});
