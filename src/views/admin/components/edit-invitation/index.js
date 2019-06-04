import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Incrementor from '../../../../shared/components/incrementor';

const Content = styled.form`
    display: flex;
    flex-direction: column;
    flex-basis: 400px;
    max-width: 800px;
    margin: auto;
`;

const EditInvitation = ({ match }) => (
    <Content className="py-4">
        <Typography variant="h4">Edit Invitation</Typography>
        <div className="row">
            <div className="col-12 justify-content-end">
                <Incrementor />
            </div>
        </div>
    </Content>
);

export default EditInvitation;
