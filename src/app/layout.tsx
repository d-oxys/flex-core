import { Inter, Poppins } from 'next/font/google';
import { Providers } from './providers';
import type { Metadata } from 'next';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({ weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Flex Force',
  description: 'Kalkulator Otot',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
