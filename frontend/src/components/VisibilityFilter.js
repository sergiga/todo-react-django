import React, { Component } from 'react';
import PropTypes from 'prop-types';

class VisibilityFilter extends Component {
  static propTypes = {
    setVisibilityFilter: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);

    this.handleFilterClick = this.handleFilterClick.bind(this);
  }

  handleFilterClick(filter) {
    this.props.setVisibilityFilter(filter);
  }

  render() {
    return (
      <div>
        <span>Filter by:</span>
        <button onClick={() => this.handleFilterClick('SHOW_ALL')}>ALL</button>
        <button onClick={() => this.handleFilterClick('SHOW_ACTIVE')}>ACTIVE</button>
        <button onClick={() => this.handleFilterClick('SHOW_COMPLETED')}>COMPLETED</button>
      </div>
    );
  }
}

export default VisibilityFilter;