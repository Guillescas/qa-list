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
      <Link href='/edit-questions'>Create</Link>
    </Styles.Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx)

  console.log(cookies)

  return {
    props: {}
  }
}

export default Home
