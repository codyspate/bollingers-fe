import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Home, Admin, Login } from '../views';
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
        exact: true,
        admin: true
    },
    {
        path: '/login',
        component: Login,
        exact: true
    }
];

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            console.log(store.getState());
            if (store.getState().user.user) return <Component {...props} />;
            return <Home />;
        }}
    />
);

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
                {routeArray.map(({ admin, ...route }) =>
                    !admin ? (
                        <Route key={route.path} {...route} />
                    ) : (
                        <AdminRoute key={`admin-${route.path}`} {...route} />
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
    mapDispatchToProps
)(RoutesComponent);
