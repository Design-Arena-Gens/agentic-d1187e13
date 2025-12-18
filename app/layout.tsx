import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'Play Tic Tac Toe',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
