import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Home, Admin, Login } from '../views';
import EditInvitation from '../views/admin/components/edit-invitation';
import store from '../shared/state/store';
import * as userActions from '../shared/state/actions/user';

const routeArray = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/admin',
        component: Admin,
        exact: false,
        admin: true
    },
    {
        path: '/login',
        component: Login,
        exact: true
    },
    {
        path: '/invitation/:guestId',
        component: EditInvitation,
        exact: true
    }
];

const AdminRoute = props => {
    if (!store.getState().user.user)
        return <Route {...props} component={Home} />;
    return <Route {...props} />;
};

class RoutesComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loaded: Boolean(props.user)
        };
    }
    componentDidUpdate(prevProps) {
        if (this.state.loaded) return;
        if (
            this.props.user ||
            (!this.props.loadingUser && prevProps.loadingUser)
        )
            this.setState({ loaded: true });
        if (this.props.loadingUser && !prevProps.loadingUser)
            this.setState({ loading: true });
    }
    render() {
        if (!this.state.loading || !this.state.loaded) return null;
        return (
            <Switch>
                {routeArray.map(({ admin, ...route }, i) =>
                    !admin ? (
                        <Route key={route.path} {...route} />
                    ) : (
                        <AdminRoute
                            key={`admin-${route.path}-${i}`}
                            {...route}
                        />
                    )
                )}
            </Switch>
        );
    }
}

const mapStateToProps = state => ({ ...state.user });
const mapDispatchToProps = dispatch =>
    bindActionCreators(userActions, dispatch);

export const Routes = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(RoutesComponent);
