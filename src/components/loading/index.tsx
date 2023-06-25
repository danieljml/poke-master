import React from 'react';
import styled from 'styled-components';

const LoadingMsj = styled.h1`
  margin-top: 10px;
  text-transform: capitalize;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
`;

const Loading: React.FC = () => {
  return <LoadingMsj>Loading...</LoadingMsj>;
};

export default Loading;
