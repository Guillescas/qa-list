import styled from 'styled-components';

interface IContainerProps {
  error?: boolean
}

export const Container = styled.div<IContainerProps>`
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

  .error {
    margin-top: 0.5rem;
    height: 18px;

    color: ${({ theme }) => theme.colors.error};
  }
`;