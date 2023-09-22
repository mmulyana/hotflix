import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ReduxProvider from '@/components/redux-provider'
import AuthWrapper from '@/components/auth-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
          <body className={inter.className}>{children}</body>
        </AuthWrapper>
      </ReduxProvider>
    </html>
  )
}
