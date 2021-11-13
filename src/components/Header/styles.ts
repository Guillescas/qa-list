import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  max-width: 1000px;
  margin: 0 auto;

  padding: 1rem;

  .options {
    a {
      padding: 0.75rem 1rem;
      margin: 0 0.25rem;

      border-radius: 0.25rem;

      transition: 0.2s;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        background: ${({ theme }) => darken(0.1, theme.colors.background)};
      }
    }
  }
`;
