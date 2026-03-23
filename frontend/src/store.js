import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { userLoginReducer, userDetailsReducer } from './reducers/authReducers';
import { audioUploadReducer, audioListReducer } from './reducers/audioReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  audioUpload: audioUploadReducer,
  audioList: audioListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk)
);

export default store;