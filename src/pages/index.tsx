import { useEffect } from 'react'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import nookies from 'nookies'

import * as Styles from '../styles/Pages/Home'

const Home: NextPage = () => {
  useEffect(() => {
    nookies.set(undefined, 'test', 'opa', {
      maxAge: 30 * 24 * 60 * 60
    })
  }, [])

  return (
    <Styles.Container>
    </Styles.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {}
  }
}

export default Home
