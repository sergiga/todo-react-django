import { normalize, schema } from 'normalizr';
import axios from 'axios';
import merge from 'lodash/merge';

// API calls
export const Methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

const axiosInstance = axios.create({
  validateStatus: status => { return status >= 200 && status <= 500 }
});
const API_ROOT = 'http://localhost:3000/';

const callApi = (method, endpoint, data, schema) => {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;

  switch(method) {
    case Methods.GET:
      return getApi(fullUrl, schema);
    case Methods.POST:
      return postApi(fullUrl, data)
    case Methods.PUT:
      throw new Error('Not implemented yet');
    case Methods.DELETE:
      throw new Error('Not implemented yet');
    default:
      throw new Error('Bad HTTP method');
  }
}

const getApi = (fullUrl, schema) => {
  return axiosInstance.get(fullUrl, {
    headers: { 'Authorization': `Token ${sessionStorage.getItem('todos_access_token')}` },
  }).then(({ data }) => {
    return merge({}, normalize(data, schema));
  }); 
}

const postApi = (fullUrl, data) => {
  return axiosInstance.post(fullUrl, data, {
    headers: { 'Authorization': `Token ${sessionStorage.getItem('todos_access_token')}` },
  }).then((response) => {
  }); 
}

// Schemas
const todo = new schema.Entity('todos', {}, {
  idAttribute: 'id'
});

export const Schemas = {
  TODO: todo,
  TODO_ARRAY: [ todo ]
};

// Redux middleware
export const API_MIDDLEWARE = 'API_MIDDLEWARE';

export default store => next => action => {
  const apiCall = action[API_MIDDLEWARE];

  if(!apiCall) {
    return next(action);
  }

  const { method, endpoint, data, types, schema } = apiCall;

  if(typeof method !== 'string') {
    throw new Error('Expecting the http method to be a string');
  }
  if(typeof endpoint !== 'string') {
    throw new Error('Expecting the endpoint to be a string');
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

  return callApi(method, endpoint, data, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};