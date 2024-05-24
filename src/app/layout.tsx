import { Analytics } from '@vercel/analytics/react';
import { PropsWithChildren } from 'react';

import Layout from '@/layout';

import StyleRegistry from './StyleRegistry';

const RootLayout = ({ children }: PropsWithChildren) => {
  // get default theme config to use with ssr

  return (
    <html lang="cn" suppressHydrationWarning>
      <body>
        <StyleRegistry>
          <Layout>{children}</Layout>
        </StyleRegistry>
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;

export { default as metadata } from './metadata';
