import { API_MIDDLEWARE, Schemas, Methods } from '../middleware/api';
import merge from 'lodash/merge';
import omit from 'lodash/omit';

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
  return dispatch(fetchTodos());
}

export const CREATE_TODO_REQUEST = 'CREATE_TODO_REQUEST'; 
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS'; 
export const CREATE_TODO_FAILURE = 'CREATE_TODO_FAILURE';

export const createTodo = (todo) => (dispatch) => {
  return dispatch({
    [API_MIDDLEWARE]: {
      method: Methods.POST,
      types: [ CREATE_TODO_REQUEST, CREATE_TODO_SUCCESS, CREATE_TODO_FAILURE ],
      endpoint: 'todos/',
      data: todo,
      schema: Schemas.TODO
    }
  });
}

export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST'; 
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'; 
export const UPDATE_TODO_FAILURE = 'UPDATE_TODO_FAILURE';

export const updateTodo = (todoID, updatedData) => (dispatch, getState) => {
  const todo = getState().entities.todos[todoID];

  if(!todo) {
    return null;
  } 

  const updatedTodo = merge({}, todo, updatedData);

  return dispatch({
    [API_MIDDLEWARE]: {
      method: Methods.PUT,
      types: [ UPDATE_TODO_REQUEST, UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE ],
      endpoint: `todos/${todoID}/`,
      data: updatedTodo,
      schema: Schemas.TODO
    }
  });
}

export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'; 
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'; 
export const DELETE_TODO_FAILURE = 'DELETE_TODO_FAILURE';

export const deleteTodo = (todoID) => (dispatch) => {
  return dispatch({
    id: todoID,
    [API_MIDDLEWARE]: {
      method: Methods.DELETE,
      types: [ DELETE_TODO_REQUEST, DELETE_TODO_SUCCESS, DELETE_TODO_FAILURE ],
      endpoint: `todos/${todoID}/`
    }
  });
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const login = userCredentials => dispatch => {
  return dispatch({
    user: omit(userCredentials, ['password']),
    [API_MIDDLEWARE]: {
      method: Methods.POST,
      types: [ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE ],
      endpoint: `auth`,
      data: userCredentials,
    }
  })
}

export const SHOW_VISIBILITY_FILTER = 'SHOW_VISIBILITY_FILTER';

export const setVisibilityFilter = (filter) => (dispatch, getState) => {
  if(getState().visibilityFilter === filter) { return null; }

  return dispatch({ type: SHOW_VISIBILITY_FILTER });
}