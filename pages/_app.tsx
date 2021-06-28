import App, { AppContext } from 'next/app'
import Head from 'next/head'
import { wrapper } from '../redux/store'

import '../styles/globals.scss'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {}

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title> Clubhouse: Drop-in audio chat</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default wrapper.withRedux(MyApp)
