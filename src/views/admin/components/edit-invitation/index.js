import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../../shared/state/actions/user';
import Typography from '@material-ui/core/Typography';
import Incrementor from '../../../../shared/components/incrementor';

const Content = styled.form`
    display: flex;
    flex-direction: column;
    flex-basis: 400px;
    max-width: 800px;
    margin: auto;
`;

const EditInvitation = ({ match, user }) => (
    <Content className="py-4">
        <Typography variant="h4">Edit Invitation</Typography>
        {user ? (
            <div className="row">
                <div className="col-12 justify-content-end">
                    <Incrementor />
                </div>
            </div>
        ) : null}
    </Content>
);

const mapStateToProps = state => ({ ...state.user });
const mapDispatchToProps = dispatch =>
    bindActionCreators(userActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditInvitation);
