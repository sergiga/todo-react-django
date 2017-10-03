import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
  loadTodos,
  createTodo, 
  updateTodo, 
  deleteTodo,
  login,
  setVisibilityFilter 
} from '../actions/index';
import LoginForm from '../components/LoginForm';
import TodoForm from '../components/TodoForm';
import VisibilityFilter from '../components/VisibilityFilter';
import List from '../components/List';
import Todo from '../components/Todo';

class App extends Component {
  static propTypes = {
    user: PropTypes.object,
    todos: PropTypes.array.isRequired,
    visibilityFilter: PropTypes.string.isRequired,
    loadTodos: PropTypes.func.isRequired,
    createTodo: PropTypes.func.isRequired, 
    updateTodo: PropTypes.func.isRequired, 
    deleteTodo: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    setVisibilityFilter: PropTypes.func.isRequired
  }

  submitTodo(todo) {
    this.props.createTodo(todo);
  }

  renderTodo() {
    return null;
  }

  render() {
    const { 
      user,
      todos,
      visibilityFilter,
      login,
      createTodo,
      setVisibilityFilter
    } = this.props;

    if(!user) {
      return (
        <div className='main-container'>
          <LoginForm login={login}/>
        </div>
      );
    }
    else {
      return (
        <div className='main-container'>
          <TodoForm submitTodo={createTodo} />
          <List 
            items={todos}
            renderItem={this.renderTodo} />
          <VisibilityFilter setVisibilityFilter={setVisibilityFilter} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const {
    entities: { todos },
    visibilityFilter,
    user
  } = state;
  
  const userTodos = Object.values(todos);

  return {
    todos: userTodos, 
    visibilityFilter,
    user
  }
}

export default connect(
  mapStateToProps,
  {
    loadTodos,
    createTodo, 
    updateTodo, 
    deleteTodo,
    login,
    setVisibilityFilter 
  }
)(App);