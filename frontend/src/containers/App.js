import React from 'react';
import PropTypes from 'prop-types';

const App = (props) => (
  <div className='main-container'>
    { props.children }
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App;