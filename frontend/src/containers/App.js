import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  loadTodos,
  createTodo, 
  updateTodo, 
  deleteTodo, 
  setVisibilityFilter 
} from '../actions/index';

class App extends Component {
  static propTypes = {
    userTodos: PropTypes.array.isRequired,
    loadTodos: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired, 
    updateTodo: PropTypes.func.isRequired, 
    deleteTodo: PropTypes.func.isRequired, 
    setVisibilityFilter: PropTypes.func.isRequired
  }

  render() {
    return (
      <div />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { todos },
    visibilityFilter
  } = state;
  
  const userTodos = Object.values(todos);

  return {
    userTodos, 
    visibilityFilter
  }
}

export default connect(
  mapStateToProps,
  {
    loadTodos,
    createTodo, 
    updateTodo, 
    deleteTodo, 
    setVisibilityFilter 
  }
)(App);