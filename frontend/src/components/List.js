import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    renderItem: PropTypes.func.isRequired
  }

  render() { return null }
}

export default List;