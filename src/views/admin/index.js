import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import GuestList from './components/guest-list';
import Invitation from './components/invitation';
import General from './components/general';
import EditInvitation from './components/edit-invitation';

class Admin extends React.Component {
    render() {
        const { match } = this.props;
        return (
            <div className="container">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/admin/guests">
                            Guest List
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            className="nav-link"
                            exact
                            to="/admin/invitation"
                        >
                            Invitation
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" exact to="/admin/general">
                            General Options
                        </NavLink>
                    </li>
                </ul>
                {console.log('blamo')}
                <Route
                    key="admin-guest-route"
                    path={`${match.path}/guests`}
                    component={GuestList}
                />
                <Route
                    key="admin-edit-invitation-route"
                    path={`${match.path}/invitation/:id`}
                    component={EditInvitation}
                    exact
                />
                <Route
                    key="admin-invitation-route"
                    path={`${match.path}/invitation`}
                    component={Invitation}
                    exact
                />
                <Route
                    key="admin-general-route"
                    path={`${match.path}/general`}
                    component={General}
                />
            </div>
        );
    }
}

export default withRouter(Admin);
