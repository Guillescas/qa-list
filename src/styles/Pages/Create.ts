import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  min-width: 100vw;
  max-width: 100vw;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;

  margin: 0 auto;

  form {
    padding: 3rem 0 1rem;

    .input-wrapper {
      display: flex;
      align-items: flex-end;
      flex: 1 24px;

      margin-top: 2rem;

      button {
        max-width: 150px;
        height: 47px;

        margin-left: 1rem;
      }
    }
  }
`;

export const Questions = styled.div`
  width: 100%;

  margin-top: 3rem;

  p {
    margin: 2rem 0;
    text-align: center;
  }
`;

export const Question = styled.div`
  background: ${({ theme }) => theme.colors.white};

  padding: 1rem;

  border-radius: 0.5rem;

  margin: 1rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;

    .action {
      display: flex;
      align-items: center;
      justify-content: center;

      margin: 0 0.5rem;
      cursor: pointer;

      padding: 0.5rem;

      transition: 0.2s;

      &:hover {
        background-color: ${({ theme }) => theme.colors.background};

        &.delete {
          color: ${({ theme }) => theme.colors.error};
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

  }
`;

