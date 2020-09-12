import '../styles/main.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import React, { FC } from 'react'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// export default function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />

export default wrapper.withRedux(WrappedApp)

// import App, { Container } from 'next/app'
// import React from 'react'
// import withReduxStore from '../lib/with-redux-store'
// import { Provider } from 'react-redux'

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, reduxStore } = this.props
//     return (
//       <Container>
//         <Provider store={reduxStore}>
//           <Component {...pageProps} />
//         </Provider>
//       </Container>
//     )
//   }
// }

// export default withReduxStore(MyApp)
