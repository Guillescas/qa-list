import { ButtonHTMLAttributes, ReactElement } from 'react';

import * as Styles from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  background?: string
}

const Button = ({
  title,
  background,
  ...rest
}: IButtonProps): ReactElement => {
  return (
    <Styles.Container background={background} {...rest}>
      {title}
    </Styles.Container>
  );
};

export default Button
