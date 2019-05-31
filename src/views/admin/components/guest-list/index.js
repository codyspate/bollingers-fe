import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import * as invitationActions from '../../../../shared/state/actions/invitation';

class GuestList extends React.Component {
    componentDidMount() {
        const { updateInvitationList } = this.props;
        updateInvitationList();
    }
    onCheck = e => {
        console.log(e.target.checked);
    };
    render() {
        const { invitationList } = this.props;
        if (!Array.isArray(invitationList) || !invitationList.length)
            return null;
        return (
            <Paper>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Meal Option</TableCell>
                            <TableCell>Song Recommendation</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invitationList.map(({ guests }, i) => {
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
                                            checked={false}
                                            onClick={this.onCheck}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {guest.firstName}
                                    </TableCell>
                                    <TableCell>{guest.lastName}</TableCell>
                                    <TableCell>{guest.mealOption}</TableCell>
                                    <TableCell>
                                        {guest.songRecommendation}
                                    </TableCell>
                                </TableRow>
                            ));
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

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
