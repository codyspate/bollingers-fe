import React from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';
import GuestList from './components/guest-list';
import Invitation from './components/invitation';

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
                </ul>
                <Route
                    key="admin-guest-route"
                    path={`${match.path}/guests`}
                    component={GuestList}
                />
                <Route
                    key="admin-invitation-route"
                    path={`${match.path}/invitation`}
                    component={Invitation}
                />
            </div>
        );
    }
}

export default withRouter(Admin);
