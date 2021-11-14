import { InputHTMLAttributes, ReactElement } from 'react';

import * as Styles from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  register: any
  error?: string
}

const Input = ({
  name,
  label,
  register,
  error,
  ...rest
}: IInputProps): ReactElement => {
  return (
    <Styles.Container error={!!error}>
      <label htmlFor={name}>{label}</label>
      <input type='text' {...rest} name={name} {...register(name)} />
      <div className="error">
       {error && <p>Campo vazio</p>}
      </div>
    </Styles.Container>
  );
};

export default Input
