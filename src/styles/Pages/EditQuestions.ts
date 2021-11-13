import { lighten } from 'polished';
import styled from 'styled-components';

interface IQuestionProps {
  isUserEditingQuestion: boolean
  isQuestionBeignEdited: boolean
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-height: 100vh;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 100%;

  margin: 0 auto;

  padding: 0 1rem 3rem;

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

export const Question = styled.div<IQuestionProps>`
  background: ${({
    theme,
    isUserEditingQuestion,
    isQuestionBeignEdited
  }) =>
    (isUserEditingQuestion && isQuestionBeignEdited)
    ? theme.colors.white
    : isUserEditingQuestion
    ? theme.colors.disabled
    : theme.colors.white
  };

  height: 100%;
  min-height: 47px;
  max-height: 180px;
  padding: 0 1rem;

  border-radius: 0.5rem;

  margin: 1rem 0;

  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    margin: 0;
    overflow-x: auto;
    padding: 4px 0;

    ::-webkit-scrollbar {
      height: 6px;
    }

    ::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors.background};

      border-radius: 0.5rem;
    }
    
    ::-webkit-scrollbar-thumb {
      border-radius: 0.5rem;
      background: #888;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    justify-content: center;

    .action {
      display: flex;
      align-items: center;
      justify-content: center;

      margin: 0 0.25rem;
      cursor: pointer;

      padding: 0.5rem;

      transition: 0.2s;

      border-radius: 0.5rem;

      &:hover {
        background-color: ${({ theme }) => theme.colors.background};

        &.delete {
          color: ${({ theme }) => theme.colors.error};
        }

        &.success {
          color: ${({ theme }) => theme.colors.success};
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
`;
