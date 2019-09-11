import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../../../shared/state/actions/user';
import Typography from '@material-ui/core/Typography';
import Incrementor from '../../../../shared/components/incrementor';
import {
    getInvitation,
    updateAttendingStatus
} from '../../../../shared/state/api/invitation';
import Guest from './guest-card';

const Content = styled.form`
    display: flex;
    flex-direction: column;
    flex-basis: 400px;
    max-width: 800px;
    margin: auto;
`;

const EditInvitation = ({ match = {}, user }) => {
    const { params: { guestId } = {} } = match;
    const [invitation, setInvitation] = useState({});
    const fetchData = async () => {
        const inv = await getInvitation({ guestId });
        setInvitation(inv);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const updateStatus = async ({ guestId, attending }) => {
        await updateAttendingStatus({ guestId, attending });
        fetchData();
    };

    const guests = Array.isArray(invitation.guests)
        ? invitation.guests.map(g => (
              <Guest updateAttending={updateStatus} key={g._id} guest={g} />
          ))
        : null;
    return (
        <div className="container py-4">
            <Typography variant="h4">Edit Invitation</Typography>
            {user ? (
                <div className="row">
                    <div className="col-12 justify-content-end">
                        <Incrementor />
                    </div>
                </div>
            ) : null}
            {guests}
        </div>
    );
};

const mapStateToProps = state => ({ ...state.user });
const mapDispatchToProps = dispatch =>
    bindActionCreators(userActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditInvitation);
