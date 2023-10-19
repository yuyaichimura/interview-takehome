import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import {MoviesProvider} from '@/providers/MoviesProvider'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MoviesProvider>
      <Component {...pageProps} />{' '}
    </MoviesProvider>
  );
}
