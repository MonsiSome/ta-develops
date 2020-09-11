import '../styles/main.css'
import type { AppProps /*, AppContext */ } from 'next/app'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
