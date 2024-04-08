// Loader.js
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Keyframes for the loader animation
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Adjust the height based on your layout */
`;

const StyledLoader = styled.div`
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${rotate} 1s linear infinite;
  z-index:2
`;

export const Loader = () => {
  return (
    <LoaderContainer>
      <StyledLoader />
    </LoaderContainer>
  );
};


