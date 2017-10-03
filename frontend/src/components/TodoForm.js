import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoForm extends Component {
  static propTypes = {
    submitTodo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      title: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { title } = this.state;
    this.props.submitTodo({ title });
    this.setState({
      title: ''
    })
  }

  handleChange(event) {
    const target = event.target;
    const value =  target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { title } = this.state;

    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          name='title'
          type='text'
          value={title}
          placeholder='What has to be done?'
          onChange={this.handleChange} />
      </form>
    ); 
  }
}

export default TodoForm;