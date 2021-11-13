import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  width: 100%;

  label {
    margin-bottom: 0.25rem;
  }

  input {
    height: 100%;
    min-height: 47px;

    background: none;
    border: none;

    outline: none;

    font-size: 1rem;

    border-radius: 0.5rem;
  }
`;