import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

class Loading extends React.Component {
  render() {
    const { component } = this.props;
    return (
      <div className="loading">
        <p>
          Carregando...
          { component }
        </p>
      </div>
    );
  }
}

Loading.propTypes = {
  component: PropTypes.string.isRequired,
};

export default Loading;
