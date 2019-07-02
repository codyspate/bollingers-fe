import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Done from '@material-ui/icons/Done';
import styled from 'styled-components';

const Rules = ({ className }) => {
    /**
     * No Children
     *
     */
    return (
        <Paper className={`p-3 ${className}`}>
            <Typography variant="h4" align="center" gutterBottom>
                Keep in mind
            </Typography>
            <div className="d-flex flex-row">
                <Done className="mr-1" />
                <Typography variant="body1">Adult only event</Typography>
            </div>
            <div className="d-flex flex-row">
                <Done className="mr-1" />

                <Typography variant="body1">
                    The ceremony and reception are within walking distance
                </Typography>
            </div>
            <div className="d-flex flex-row">
                <Done className="mr-1" />

                <Typography variant="body1">
                    The ceremony and reception are within walking distance
                </Typography>
            </div>
            <div className="d-flex flex-row">
                <Done className="mr-1" />

                <Typography variant="body1">
                    The ceremony and reception are within walking distance
                </Typography>
            </div>
        </Paper>
    );
};

export default Rules;
