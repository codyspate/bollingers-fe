import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Gift from '../../../../shared/components/giftsvg';
import styled from 'styled-components';

const Box = styled.div`
    width: 20%;
    margin: auto;
`;

const Button = styled(MButton)`
    color: ${({ color }) => (color ? `${color} !important` : '')};
    transition: color 250ms cubic-bezier(0.4, 0, 0.2, 1),
        background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,
        border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms !important;
    &:hover {
        background-color: ${({ color }) => color} !important;
        color: #fff !important;
    }
`;

const A = styled.a`
    &:hover {
        text-decoration: none;
    }
`;

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});

const Registry = ({ className, classes }) => {
    return (
        <Paper className={`p-3 ${className}`}>
            <Box>
                <Gift />
            </Box>
            <Typography variant="h4" align="center" gutterBottom>
                Check out our gift registries!
            </Typography>
            <div className="row">
                <div className="col-4 d-flex align-items-center">
                    <div className="d-flex flex-row">
                        <A
                            href="https://www.amazon.com/wedding/share/meetthebollingers"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className={classes.button} color="#febd69">
                                Amazon
                            </Button>
                        </A>
                    </div>
                </div>
                <div className="col-4 d-flex align-items-center">
                    <div className="d-flex flex-row">
                        <A
                            href="https://www.zola.com/registry/meetthebollingers"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button className={classes.button} color="#01b4c0">
                                Zola
                            </Button>
                        </A>
                    </div>
                </div>
                <div className="col-4 d-flex align-items-center">
                    <div className="d-flex flex-row">
                        <A
                            href="https://www.target.com/gift-registry/giftgiver?registryId=4805af88a2bd4de18aa5066fba2a56c7&lnk=registry_custom_url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button
                                type="link"
                                className={classes.button}
                                color="#cc0000"
                            >
                                Target
                            </Button>
                        </A>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default withStyles(styles)(Registry);
