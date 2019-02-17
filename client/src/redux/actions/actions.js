//AppIntialization
export const APP_INIT = 'APP_INIT' /* Intended to be dispatched only once from a parent component (routes?) to initialize redux state. */

//User
export const USER_SIGNUP = 'USER_SIGNUP'
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'
export const LOAD_USER_INFO = 'LOAD_USER_INFO'
export const EDIT_USER_INFO = 'EDIT_USER_INFO'

//Repository
export const LOAD_REPOSITORIES_LIST = 'LOAD_REPOSITORIES_LIST'
export const CREATE_REPOSITORY = 'CREATE_REPOSITORY'
export const DELETE_REPOSITORY = 'DELETE_REPOSITORY'
export const LOAD_REPOSITORY_INFO = 'LOAD_REPOSITORY_INFO'
export const EDIT_REPOSITORY_INFO = 'EDIT_REPOSITORY_INFO'
export const CHANGE_TO_BRANCH = 'CHANGE_TO_BRANCH'
export const CHANGE_TO_TAG = 'CHANGE_TO_TAG'
export const LOAD_DIRECTORY = 'LOAD_DIRECTORY'
export const LOAD_FILE = 'LOAD_FILE'
export const LOAD_COMMIT = 'LOAD_COMMIT'
export const LOAD_COMMITS_LIST = 'LOAD_COMMITS_LIST'
export const LOAD_CONTRIBUTORS_LIST = 'LOAD_CONTRIBUTORS_LIST'
export const FILTER_FILES = 'FILTER_FILES'

//Sprint?
//Backlog?
//Releases?

//Issue
export const LOAD_ISSUES_LIST = 'LOAD_ISSUES_LIST'
export const CREATE_ISSUE = 'CREATE_ISSUE'
export const LOAD_ISSUE = 'LOAD_ISSUE'
export const MODIFY_ISSUE = 'MODIFY_ISSUE'
export const DELETE_ISSUE = 'DELETE_ISSUE'
export const SUBSCRIBE_TO_ISSUE = 'SUBSCRIBE_TO_ISSUE'
export const SUBSCRIBE_TO_ISSUE_UNDO = 'SUBSCRIBE_TO_ISSUE_UNDO'

//Comment
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const REACT_TO_COMMENT = 'REACT_TO_COMMENT'
export const REACT_TO_COMMENT_UNDO = 'REACT_TO_COMMENT_UNDO'

//Search
export const MAKE_SEARCH = 'MAKE_SEARCH' //TODO: Should we keep a general action or specific search actions?



/*Actions*/

export function appInit(api_server) {
    return {
        type: APP_INIT,
        api_server: api_server
    };
}

export function userSignup(email, password) {
    return {
        type: USER_SIGNUP,
        email: email,
        password: password
    };
}

/* If firebase is used to login, then this action is dispatched only to update the state after login success 
   and email/password is not provided.*/
export function userLogin(email = "", password = "") {
    return {
        type: USER_LOGIN,
        email: email,
        password: password
    };
}

export function loadIssuesList(data) {
    return {
        type: LOAD_ISSUES_LIST,
        data: data
    };
}

export function createIssue(title, comment) {
    return {
        type: CREATE_ISSUE,
        title: title,
        comment: comment
    };
}



