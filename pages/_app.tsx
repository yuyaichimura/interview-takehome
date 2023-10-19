import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MoviesProvider } from '@/providers/MoviesProvider';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MoviesProvider>
        <Component {...pageProps} />{' '}
      </MoviesProvider>
    </QueryClientProvider>
  );
}
