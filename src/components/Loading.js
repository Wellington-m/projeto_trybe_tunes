import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

class Loading extends React.Component {
  render() {
    const { loadMessage } = this.props;
    return (
      <div className="loading">
        <p>
          Carregando...
          { ` ${loadMessage}` }
        </p>
      </div>
    );
  }
}

Loading.propTypes = {
  loadMessage: PropTypes.string.isRequired,
};

export default Loading;
