import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Todo extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    owner: PropTypes.string.isRequired,
    updateTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }

  render() {
    const { id, title, completed, updateTodo, deleteTodo } = this.props;

    return (
      <div>
        <input
          name='completed'
          type='checkbox'
          checked={completed}
          onChange={(e) => updateTodo(id, {completed: e.target.checked})} />
        <span>{title}</span>
        <button onClick={() => deleteTodo(id)}>DELETE</button>
      </div>
    );
  }
}

export default Todo;