import React from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Container } from '../../shared/components';
import * as userActions from '../../shared/state/actions/user';

const Wrapper = styled(Container)`
    display: flex;
    align-item: center;
    justify-content: center;
    height: 100%;
`;
const Content = styled.form`
    display: flex;
    flex-direction: column;
    flex-basis: 400px;
    padding: 32px;
`;
const ButtonWrapper = styled.div`
    margin-top: 16px;
    display: flex;
    justify-content: flex-end;
`;

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    };
    onChange = e => {
        const { target: { name, value } = {} } = e;
        this.setState({ [name]: value });
    };

    onSubmit = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        await this.props.SignIn({ email, password });
        if (this.props.user) this.props.history.push('/');
    };

    render() {
        const { classes } = this.props;
        const { email, password } = this.state;
        return (
            <Wrapper>
                <Content onSubmit={this.onSubmit} method="post">
                    <Typography component="h1" variant="h3" gutterBottom>
                        Login
                    </Typography>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        onChange={this.onChange}
                        margin="normal"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        onChange={this.onChange}
                        margin="normal"
                    />
                    <ButtonWrapper>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            className={classes.button}
                        >
                            Login
                        </Button>
                        <Button
                            component={Link}
                            to={{
                                pathname: '/signup',
                                state: { email, password }
                            }}
                            variant="contained"
                            className={classes.button}
                        >
                            Sign Up
                        </Button>
                    </ButtonWrapper>
                </Content>
            </Wrapper>
        );
    }
}

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    },
    input: {
        marginBottom: theme.spacing.unit
    }
});

const mapStateToProps = state => ({ ...state.user });
const mapDispatchToProps = dispatch =>
    bindActionCreators(userActions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Login));
