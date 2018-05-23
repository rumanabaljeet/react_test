import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import './index.css';
import appRoutes from './Routes';
//import registerServiceWorker from './registerServiceWorker';
import history from './Utils/history';

//Redux Configuration
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './App/Reducers';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            {appRoutes}
        </Router>
    </Provider>,
    document.getElementById('root')
);
//registerServiceWorker();
