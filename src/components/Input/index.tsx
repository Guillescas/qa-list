import { InputHTMLAttributes, ReactElement } from 'react';

import * as Styles from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  register: any
}

const Input = ({
  name,
  label,
  register,
  ...rest
}: IInputProps): ReactElement => {
  return (
    <Styles.Container>
      <label htmlFor={name}>{label}</label>
      <input type='text' {...rest} name={name} {...register(name)} />
    </Styles.Container>
  );
};

export default Input
