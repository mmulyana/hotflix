import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/components/redux-provider'
import AuthWrapper from '@/components/auth-wrapper'
import Toastify from '@/components/toastify'
import Footer from '@/components/footer'
import Sidebar from '@/components/sidebar'
import Navbar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hotflix | Movie app built with next.js 13',
  description: 'hotflix movie application built with next.js, firebase, and tmdb API',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <ReduxProvider>
        <AuthWrapper>
          <body className={inter.className}>
            <Navbar />
            {children}
            <Footer />
            <Toastify />
          </body>
        </AuthWrapper>
      </ReduxProvider>
    </html>
  )
}
