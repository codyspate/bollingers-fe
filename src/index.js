import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './shared/state/store';
import { Navbar } from './base';
import { Routes } from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import './shared/fonts/muggle/stylesheet.css';
import Middleware from './base/middleware';
import * as serviceWorker from './serviceWorker';
import SunFlower from './shared/img/sun-flower.jpg';
import styled from 'styled-components';

const Wrapper = styled.div`
    background-image: url(${SunFlower});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
`;
class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Wrapper className="appWrapper">
                    <Middleware />
                    <ToastContainer />
                    <Router>
                        <div>
                            <Navbar />
                            <Routes />
                        </div>
                    </Router>
                </Wrapper>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
