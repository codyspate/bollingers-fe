import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../shared/state/actions/user';

class Middleware extends React.Component {
    componentDidMount() {
        this.props.SignIn();
    }
    render() {
        return null;
    }
}

const mapStateToProps = state => ({ ...state.user });
const mapDispatchToProps = dispatch =>
    bindActionCreators(userActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Middleware);
