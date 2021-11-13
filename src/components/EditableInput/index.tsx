import { InputHTMLAttributes, ReactElement } from 'react';

import * as Styles from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  label?: string
  register: any
}

const EditableInput = ({
  name,
  label,
  register,
  ...rest
}: IInputProps): ReactElement => {
  return (
    <Styles.Container>
      {label && <label htmlFor={name}>{label}</label>}
      <input type='text' name={name} {...register(name)} {...rest} />
    </Styles.Container>
  );
};

export default EditableInput
