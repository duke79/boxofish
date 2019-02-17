// Saga example with ajax: https://gist.github.com/mentrie/646ec2f0e6cab02cb2b17083d277418e

import { createStore, applyMiddleware } from 'redux'
import myApp from './reducers'
// import thunkMiddleware from 'redux-thunk'
// import createLogger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});


//TODO(PURGE_IN_PRODUCTION)
/* Create Store -  Debug*/
export const store = createStore(myApp, /* preloadedState, */ composeEnhancers(
    applyMiddleware(sagaMiddleware),
    // other store enhancers if any
));

/* Create Store -  Production*/
// export const store = createStore(myApp,
//     applyMiddleware(sagaMiddleware)
// );

sagaMiddleware.run(rootSaga)