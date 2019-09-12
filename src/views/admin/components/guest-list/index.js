import React from 'react';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as invitationActions from '../../../../shared/state/actions/invitation';
import { getAttendingStatus } from './utils';

const Edit = styled(EditIcon)`
    cursor: pointer;
`;

const GuestList = ({
    updateInvitationList,
    updateGuestAttending,
    invitationList,
    history
}) => {
    React.useEffect(() => {
        updateInvitationList();
    }, []);
    const onCheck = guestId => e => {
        updateGuestAttending({ guestId, attending: e.target.checked });
    };
    if (!Array.isArray(invitationList) || !invitationList.length) return null;
    return (
        <div className="py-4">
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Attending</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Meal Option</TableCell>
                            <TableCell>Song Recommendation</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invitationList.map(({ _id, guests }, i) => {
                            return guests.map(guest => (
                                <TableRow
                                    key={guest._id}
                                    style={
                                        i % 2
                                            ? { backgroundColor: '#ececec' }
                                            : null
                                    }
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={!!guest.attending}
                                            onClick={onCheck(guest._id)}
                                        />
                                        {getAttendingStatus(guest.attending)}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {guest.firstName}
                                    </TableCell>
                                    <TableCell>{guest.lastName}</TableCell>
                                    <TableCell>{guest.mealChoice}</TableCell>
                                    <TableCell>
                                        {guest.songRecommendation}
                                    </TableCell>
                                    <TableCell>
                                        <Edit
                                            onClick={() =>
                                                history.push(
                                                    `/admin/invitation/${_id}`
                                                )
                                            }
                                        />
                                    </TableCell>
                                </TableRow>
                            ));
                        })}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
};

const mapStateToProps = state => ({ ...state.invitations });
const mapDispatchToProps = dispatch =>
    bindActionCreators(invitationActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(GuestList);
