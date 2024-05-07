import '../styles/global.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

import ErrorBoundary from '@/error/ErrorBoudary';
import MainLayout from '@/layout/MainLayout';
import withZoomResponsive from '@/zoomResponsive/withZoomResponsive';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <MainLayout>
    <ErrorBoundary>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ErrorBoundary>
  </MainLayout>
);

export default withZoomResponsive(MyApp);
