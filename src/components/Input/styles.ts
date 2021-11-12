import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  label {
    margin-bottom: 0.25rem;
  }

  input {
    background: ${({ theme }) => theme.colors.white};
    border: none;

    padding: 1rem;

    border-radius: 0.5rem;
  }
`;