import React, { Component } from 'react';
import PropTypes from 'prop-types';

class LoginForm extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password});
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
    const { username, password } = this.state;
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
          name='username'
          type='text'
          value={username}
          placeholder='username'
          onChange={this.handleChange} />
        <input 
          name='password'
          type='text'
          value={password}
          placeholder='password'
          onChange={this.handleChange} />
        <input type='submit' value='LOGIN'/>
      </form>
    ); 
  }
}

export default LoginForm;