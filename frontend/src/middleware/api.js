import { normalize, schema } from 'normalizr';
import axios from 'axios';
import omit from 'lodash/omit';
import merge from 'lodash/merge';

// API call
const API_ROOT = 'http://localhost/8000/';
const callApi = (endpoint, query, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) 
    ? API_ROOT + endpoint 
    : endpoint;

  return axios.get(fullUrl, { params: query }, {
    validateStatus: status => { return status >= 200 && status <= 500 }
  }).then(({ data }) => {
    return merge({}, normalize(data, schema));
  }); 
}

// Schemas
const todo = new schema.Entity('todos', {}, {
  idAttribute: 'id'
});

export const Schemas = {
  TODO: todo,
  TODO_ARRAY: [ todo ]
}

// Redux middleware
export const API_MIDDLEWARE = 'API_MIDDLEWARE';

export default store => next => action => {
  const apiCall = action[API_MIDDLEWARE];

  if(!apiCall) {
    return next(action);
  }

  const { endpoint, query, types, schema } = apiCall;

  if(typeof endpoint !== 'string') {
    throw new Error('Expecting the endpoint to be a string');
  }
  if(typeof query !== 'object') {
    throw new Error('Expecting the endpoint to be an object');
  }
  if(!Array.isArray(types)) {
    throw new Error('Expecting an array of types.');
  }
  if(types.length !== 3) {
    throw new Error('Expecting three action types.')
  }
  if(!types.every(type => typeof type === 'string')) {
    throw new Error('Expecting three action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = merge({}, action, data);
    delete finalAction[API_MIDDLEWARE];
    return finalAction;
  }

  const [ requestType, successType, failureType] = types;

  next(actionWith({ type: requestType }));

  return callApi(endpoint, query, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
}