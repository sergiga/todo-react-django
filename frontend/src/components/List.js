import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List extends Component {
  render() {
    const { items, renderItem } = this.props;

    if(!items) { return null; }

    return(
      <div className='list'>
        <div className='list-container'>
          {items.map(item => <div key={item.id} className='list-item'>{renderItem(item)}</div>)}    
        </div>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.array,
  renderItem: PropTypes.func.isRequired,
}

export default List;