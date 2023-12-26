import { Inter, Poppins } from 'next/font/google';
import { Providers } from './providers';
import { Provider } from 'react-redux';
import { store } from '@/lib/store';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
