import * as ActionTypes from '../actions';
import merge from 'lodash/merge';
import { combineReducers } from 'redux';

const todos = (state = {}, action) => {
  if (action.response && action.response.entities && action.response.entities.todos) {
    return merge({}, state, action.response.entities.todos);
  }
  return state;
}

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch(action.type) {
    case ActionTypes.SHOW_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

const reducer = combineReducers({
  entities: combineReducers({
    todos
  }),
  visibilityFilter
})

export default reducer;