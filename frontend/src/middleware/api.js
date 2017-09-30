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