import { USER_LOGIN, USER_SIGNUP } from '../actions/actions'
import { APP_INIT } from '../../redux/actions/actions'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import firebase from 'firebase';

/**
 * set session persistence of the signed in user
 * https://firebase.google.com/docs/auth/web/auth-state-persistence
 * @param (persistence_state) LOCAL, SESSION, NONE
 */
function setPersistence(state) {

    if (state === "LOCAL") {
        state = firebase.auth.Auth.Persistence.LOCAL;
    } else if (state === "SESSION") {
        state = firebase.auth.Auth.Persistence.SESSION;
    } else if (state === "NONE") {
        state = firebase.auth.Auth.Persistence.NONE;
    } else {
        state = firebase.auth.Auth.Persistence.SESSION;
    }

    firebase.auth().setPersistence(state)
        .then(function () {
            // Existing and future Auth states are now persisted in the current
            // session only. Closing the window would clear any existing state even
            // if a user forgets to sign out.
            // ...
            // New sign-in will be persisted with session persistence.
            //return firebase.auth().signInWithEmailAndPassword(email, password);
            return null;
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

/** This method is called only update the redux state. User has already logged in, thanks to firebase-auth-ui */
function loginWithFirebase(action) {
    return new Promise(function (resolve, reject) {

        /* Maybe we don't need the IdToken here, this code only for reference */
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            // Send token to your backend via HTTPS
            // ...
            console.log(idToken);//TODO(PURGE_IN_PRODUCTION)
        }).catch(function (error) {
            // Handle error
        });

        setPersistence("LOCAL"); /* To keep the user logged in of page-reload or window re-open */
        resolve(firebase.auth().currentUser); /* Return the user to be set in the redux state */
    });
}

/** Although firebase-auth-ui takes care of sign-up even with email/password,
           but maybe one day a custom UI could use this code as reference */
function signupWithFirebase(action) {
    return new Promise(function (resolve, reject) {
        firebase.auth().createUserWithEmailAndPassword(action.email, action.password)
            .then(function (user) {
                var user = firebase.auth().currentUser;
                setPersistence("LOCAL");
                resolve(user);
            }
            )
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                throw error
            });

        // resolve("user_signup_success_res");
    });
}

function* onLogin(action) {
    try {
        const res = yield call(loginWithFirebase, action);
        yield put({ type: USER_LOGIN + "_SUCCEEDED", res: res });
    } catch (e) {
        yield put({ type: USER_LOGIN + "_FAILED", error: e });
    }
}

function* onSignup(action) {
    try {
        const res = yield call(signupWithFirebase, action);
        yield put({ type: USER_SIGNUP + "_SUCCEEDED", res: res });
    } catch (e) {
        yield put({ type: USER_SIGNUP + "_FAILED", error: e });
    }
}

export const UserSaga = [
    takeLatest(APP_INIT, onLogin), /* Auto login on app startup (page reload etc.) */
    takeLatest(USER_LOGIN, onLogin),
    takeLatest(USER_SIGNUP, onSignup)
]

export function UserReducer(state, action) {
    /* Set the default state if state is undefined */
    if (!state) {
        state = { "status": "UNSET" };
    }

    /* Return the redux state */
    switch (action.type) {

        case USER_LOGIN + '_SUCCEEDED':
            return { "status": "LOGIN_SUCCEEDED", "user": action.res };
        case USER_LOGIN + '_FAILED':
            return { "status": "LOGIN_FAILED" };

        case USER_SIGNUP + '_SUCCEEDED':
            return { "status": "SIGNUP_SUCCEEDED", "user": action.res };
        case USER_SIGNUP + '_FAILED':
            return { "status": "SIGNUP_FAILED" };

        default:
            return state; /* Return state as it is if already set, otherwise return a default state */
    }
}