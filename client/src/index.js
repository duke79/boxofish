//import 'babel-polyfill'
// import 'core-js/es6/map';
// import 'core-js/es6/set';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Routes from './routes/Routes'

/*Redux*/
import {Provider} from 'react-redux'
import {store} from './redux/store'
/*Apollo*/
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import App from "./routes/App";

const httpLink = createHttpLink({
    uri: 'http://localhost:5000/graph'
});

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

const startApp = () => {
    ReactDOM.render(
        <ApolloProvider client={client}>
            <Provider store={store}>
                <App/>
            </Provider>,
        </ApolloProvider>,
        document.getElementById('root')
    );

    // ReactDOM.render(<App />, document.getElementById('root'));
    registerServiceWorker();
};

if (window.cordova) {
    document.addEventListener('deviceready', startApp, false);
} else {
    startApp();
}