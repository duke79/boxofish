import React from 'react';

import firebase from 'firebase';
import firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css'

import { connect } from 'react-redux';
import { userLogin } from '../../redux/actions/actions'
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.signInSuccessWithAuthResult = this.signInSuccessWithAuthResult.bind(this);
    }

    signInSuccessWithAuthResult(authResult, redirectUrl) {
        const { dispatch } = this.props;
        dispatch(userLogin());
        return false; //no redirect-url
    }

    initFbUi() {
        //https://firebase.google.com/docs/auth/web/firebaseui?authuser=0
        // firebaseui.start('#firebaseui-auth-container', {
        //     signInOptions: [
        //         firebase.auth.EmailAuthProvider.PROVIDER_ID,
        //         firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        //         firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        //         firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //         firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //         firebase.auth.GithubAuthProvider.PROVIDER_ID
        //     ],
        //     // Other config options...
        // });

        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: this.signInSuccessWithAuthResult,
                uiShown: function () {
                    // The widget is rendered.
                    // Hide the loader.
                    document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            // signInSuccessUrl: '<url-to-redirect-to-on-success>',
            signInOptions: [
                // Leave the lines as is for the providers you want to offer your users.
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.FacebookAuthProvider.PROVIDER_ID,
                firebase.auth.TwitterAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.PhoneAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };

        //var ui = new firebaseui.auth.AuthUI(firebase.auth());
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        ui.start('#firebaseui-auth-container', uiConfig);
    }

    componentDidMount() {
        this.initFbUi();
    }
    render() {
        const { status } = this.props;
        if (status === "LOGIN_SUCCEEDED") {
            return <Redirect to="/" />
        } else {
            return <div>
                <div id="firebaseui-auth-container"></div>
                <div id="loader">Loading...</div>
            </div>
        }
    }
}

Login.defaultProps = {
}

function select(state) {
    return {
        status: state.User.status,
        user: state.User.user,
    }
}

export default connect(select)(Login)