import { Toaster } from 'react-hot-toast';
import Navigation from '../../components/Navigation';
import './globals.css';

export const metadata = {
  title: 'Question Papers Admin',
  description: 'Admin panel for managing question papers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="min-h-screen bg-gray-100">
          {children}
        </main>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}