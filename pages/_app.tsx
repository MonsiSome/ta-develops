import '../styles/main.css'
import type { AppProps } from 'next/app'
import { wrapper } from '../store/store'
import React, { FC } from 'react'

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => <Component {...pageProps} />

export default wrapper.withRedux(WrappedApp)
