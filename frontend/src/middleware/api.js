import { normalize, schema } from 'normalizr';

// Schemas
const todo = new schema.Entity('todos', {}, {
  idAttribute: 'id'
});

export const Schemas = {
  TODO: todo,
  TODO_ARRAY: [ todo ]
}