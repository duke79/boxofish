import { CREATE_ISSUE } from '../actions/actions'
import { database } from '../../data/myFirebase'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

function createIssueInFirebase(action) {
    return new Promise(function (resolve, reject) {
        var rootRef = database.ref();
        var issuesList = rootRef.child("Yojaka/duke79/Issues/");
        var issue = {
            title: action.title,
            comment: action.comment
        }
        var newIssue = issuesList.push(issue);
        resolve(newIssue.key);
    });
}

function* onCreateIssue(action) {
    try {
        const newIssueID = yield call(createIssueInFirebase, action);
        yield put({ type: CREATE_ISSUE + "_SUCCEEDED", id: newIssueID });
    } catch (e) {
        yield put({ type: CREATE_ISSUE + "_FAILED" });
    }
}

export const NewIssueSaga = [
    takeLatest(CREATE_ISSUE, onCreateIssue)
]

export function NewIssueReducer(state, action) {
    switch (action.type) {
        case CREATE_ISSUE + '_SUCCEEDED':
            return action.id;
        case CREATE_ISSUE + '_FAILED':
            return [];
        default:
            return {};
    }
}