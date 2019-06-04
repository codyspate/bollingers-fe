import React from 'react';
import styled from 'styled-components';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Flex = styled.div`
    display: flex;
    justify-content: ${props => (props.justify ? props.justify : 'flex-start')};
`;

const Incrementor = ({ onAdd, onRemove, hideRemove }) => {
    return (
        <Flex justify="flex-end">
            {hideRemove ? null : (
                <Fab
                    size="small"
                    onClick={onRemove}
                    margin="normal"
                    className="mr-1"
                >
                    <RemoveIcon />
                </Fab>
            )}
            <Fab
                size="small"
                onClick={onAdd}
                margin="normal"
                color="primary"
                className="ml-1"
            >
                <AddIcon />
            </Fab>
        </Flex>
    );
};

export default Incrementor;
