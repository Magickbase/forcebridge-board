import type { Metadata } from 'next'
import Link from 'next/link'
import { Geist, Geist_Mono } from 'next/font/google'
import Navbar from '@/components/navbar'
import Nav from '@/components/nav'
import './globals.css'
import { TooltipProvider, TooltipTrigger, Tooltip, TooltipContent } from '@radix-ui/react-tooltip'
import { IconBrandDiscordFilled } from '@tabler/icons-react'
import { MAGICKBASE_URL } from '@/lib/const'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'End of an Era: Force Bridge Subset Hub',
  description:
    'Force Bridge Subset Hub is the official site for updates on the deprecation of Nervos’ Force Bridge. Access critical announcements, timelines, and weekly withdrawal statistics to ensure a smooth transition.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        {children}
        <Nav />
      </body>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center pb-20">
        <p className="text-sm flex items-center text-zinc-500">
          Built with ❤️ by &nbsp;
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  className="underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={MAGICKBASE_URL}
                >
                  Magickbase
                </Link>
                &nbsp; and find more
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm text-gray-500 bg-muted px-4 py-1 rounded-xl">
                  Magickbase, a team of developers and designers who are passionate about building innovative solutions
                  for the blockchain ecosystem.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          &nbsp;support in our &nbsp;
          <Link target="_blank" rel="noopener noreferrer" href="https://discord.gg/GBYYgBA9s7">
            <IconBrandDiscordFilled size="18" />
          </Link>
        </p>
      </footer>
    </html>
  )
}
