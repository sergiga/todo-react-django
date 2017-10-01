import { API_MIDDLEWARE, Schemas, Methods } from '../middleware/api';

export const TODOS_REQUEST = 'TODO_REQUEST'; 
export const TODOS_SUCCESS = 'TODO_SUCCESS'; 
export const TODOS_FAILURE = 'TODO_FAILURE';

const fetchTodos = () => ({
  [API_MIDDLEWARE]: {
    method: Methods.GET,
    types: [ TODOS_REQUEST, TODOS_SUCCESS, TODOS_FAILURE ],
    endpoint: 'todos/',
    schema: Schemas.TODO_ARRAY
  }
});

export const loadTodos = () => (dispatch) => {
  return dispatch(fetchTodos())
}

export const SHOW_VISIBILITY_FILTER = 'SHOW_VISIBILITY_FILTER';

export const setVisibilityFilter = (filter) => (dispatch, getState) => {
  if(getState().visibilityFilter === filter) { return null; }

  return dispatch({ type: SHOW_VISIBILITY_FILTER });
}