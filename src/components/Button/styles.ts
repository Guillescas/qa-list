import styled from 'styled-components';
import { lighten } from 'polished'

interface IContainerProps {
  background?: string
}

export const Container = styled.button<IContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 2rem;

  border: none;

  background: ${({ theme, background }) =>
    background ? background : theme.colors.primary
  };

  border-radius: 0.5rem;
  padding: 1rem;

  transition: all 0.2s;

  &:hover {
    background: ${({ theme, background }) =>
      background ? lighten(0.1, background) : lighten(0.1, theme.colors.primary)
    };
  }
`;