import type { AppProps } from 'next/app';
import { MeshApp } from '@uniformdev/mesh-sdk-react';
import '../styles/global.css';

const App = ({ Component, pageProps }: AppProps) => (
  <MeshApp>
    <Component {...pageProps} />
  </MeshApp>
);

export default App;
