import { ReactElement } from 'react';
import Link from 'next/link'

import * as Styles from './styles';

const Header = (): ReactElement => {
  return (
    <Styles.Container>
      <h1>Trabzera</h1>

      <div className="options">
        <Link href='/'>
          <a>Home</a>
        </Link>
        <Link href='/edit-questions'>
          <a>Questões</a>
        </Link>
      </div>
    </Styles.Container>
  );
};

export default Header
