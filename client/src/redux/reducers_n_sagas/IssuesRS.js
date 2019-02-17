import { LOAD_ISSUES_LIST } from '../actions/actions'
import { database } from '../../data/myFirebase'
import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

// function testFirebase() {
//     var rootRef = database.ref();
//     var mirrorRef = rootRef.child("TorAssist/TBP/mirror1");
//     var newMirrorRef = mirrorRef.push();
//     // mirrorRef.set("yippi");
//     // newMirrorRef.set({
//     //       name:"cars"
//     // });

//     mirrorRef.on("value", function (snapshot) {
//         console.log(snapshot.val());
//     });

//     // mirror1.once('value').then((snapshot) => {
//     //       var tbp = snapshot.val().TBP;
//     //       console.log(tbp);
//     // });

//     // var mirror1 = database.ref("TorAssist").ref("TBP").ref("mirror1");
//     // console.log(mirror1)
// }

function getIssuesList(action) {
    var rootRef = database.ref();
    var issuesList = rootRef.child("Yojaka/duke79/Issues");

    return new Promise(function (resolve, reject) {
        issuesList.on("value", (snapshot) => {
            // console.log(snapshot);
            // return snapshot.val()
            var IssuesList = [];
            var snapVal = snapshot.val();
            for (var key in snapVal) {
                var value = snapVal[key];
                IssuesList.push(value);
            }

            resolve(IssuesList);
        });
    });

    // return [
    //     {
    //         "title": "Issue from Redux",
    //         "number": "12",
    //         "date": "May 12",
    //         "author": "duke79"
    //     }
    // ]
}

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loadIssues(action) {
    try {
        const list = yield call(getIssuesList, action);
        // console.log(list);
        yield put({ type: LOAD_ISSUES_LIST + "_SUCCEEDED", list: list });
    } catch (e) {
        yield put({ type: LOAD_ISSUES_LIST + "_FAILED", message: e.message });
    }
}

/*
  Starts loadIssues on each dispatched `LOAD_ISSUES` action.
  Allows concurrent fetches of IssuesList.
*/
// function* mySaga() {
//     yield takeEvery("LOAD_ISSUES", loadIssues);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of IssuesList. If "LOAD_ISSUES" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export const IssuesSaga = [
    takeLatest(LOAD_ISSUES_LIST, loadIssues),
    // takeLatest("ANOTHER_ACTION", anotherAction),
]

export function IssuesReducer(state, action) {
    switch (action.type) {
        case LOAD_ISSUES_LIST + '_SUCCEEDED':
            return action.list;
        case LOAD_ISSUES_LIST + '_FAILED':
            return [];
        default:
            return [];
    }
}