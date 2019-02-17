// To mix sagas: https://github.com/redux-saga/redux-saga/issues/160
// To keep sagas only for async: https://github.com/redux-saga/redux-saga/issues/332

import { all } from 'redux-saga/effects'
import { IssuesSaga } from './reducers_n_sagas/IssuesRS'
import { NewIssueSaga } from './reducers_n_sagas/NewIssueRS'
import { UserSaga } from './reducers_n_sagas/UserRS'

// // worker Saga: will be fired on USER_FETCH_REQUESTED actions
// function* loadIssues(action) {
//     try {
//         const list = yield call(getIssuesList, action);
//         // console.log(list);
//         yield put({ type: "LOAD_ISSUES_SUCCEEDED", list: list });
//     } catch (e) {
//         yield put({ type: "LOAD_ISSUES_FAILED", message: e.message });
//     }
// }

// /*
//   Starts loadIssues on each dispatched `LOAD_ISSUES` action.
//   Allows concurrent fetches of IssuesList.
// */
// // function* mySaga() {
// //     yield takeEvery("LOAD_ISSUES", loadIssues);
// // }

// /*
//   Alternatively you may use takeLatest.

//   Does not allow concurrent fetches of IssuesList. If "LOAD_ISSUES" gets
//   dispatched while a fetch is already pending, that pending fetch is cancelled
//   and only the latest one will be run.
// */
// const mySaga = [
//     takeLatest("LOAD_ISSUES", loadIssues),
//     // takeLatest("ANOTHER_ACTION", anotherAction),
// ]

export default function* rootSaga() {
    yield all([
        ...IssuesSaga,
        //   ...barSagas
        ...NewIssueSaga,
        ...UserSaga,
    ])
}