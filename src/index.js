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
import './shared/fonts/northwell/stylesheet.css';
import Middleware from './base/middleware';
import * as serviceWorker from './serviceWorker';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div className="appWrapper">
                    <Middleware />
                    <ToastContainer />
                    <Router>
                        <div>
                            <Navbar />
                            <Routes />
                        </div>
                    </Router>
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
