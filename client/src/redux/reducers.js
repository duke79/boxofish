import { combineReducers } from 'redux'
import { IssuesReducer } from './reducers_n_sagas/IssuesRS'
import { NewIssueReducer } from './reducers_n_sagas/NewIssueRS'
import { UserReducer } from './reducers_n_sagas/UserRS'


const myApp = combineReducers({
      Issues: IssuesReducer,
      NewIssue: NewIssueReducer,
      User: UserReducer,
})
export default myApp