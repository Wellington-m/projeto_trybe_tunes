import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    background: #fafafa;
    height: 100%;
    left: 1px;
    position: absolute;
    top: 1px;
    width: 100%;
    z-index: 1;
`;

const P = styled.p`
    color: #023031;
    font-family: Epilogue , Helvetica , Arial , Verdana , Tahoma , sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 300;
    letter-spacing: 0.02em;
    line-height: 65px;
    position: absolute;
`;

class Loading extends React.Component {
  render() {
    return (
      <Div className="loading">
        <P>
          Carregando...
        </P>
      </Div>
    );
  }
}

export default Loading;
