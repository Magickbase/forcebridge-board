import type { Metadata } from 'next/types'
import Hero from './hero'
import Topics from './topics'

export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

export const metadata: Metadata = {
  title: 'Announcement | Force Bridge Sunset Hub',
  description: `
Over the past few years, Force Bridge and Godwoken have played pivotal roles in expanding the Nervos CKB ecosystem — enabling multi-chain asset interoperability, EVM compatibility, and DApp development. These two products marked Nervos' first major steps toward a layered architecture and cross-chain infrastructure.

However, as the industry evolves and the ecosystem pivots toward UTXO-native Innovation, Web5, and Fiber Network, it’s time to sunset these early-stage components to make way for the next era of Nervos.`
}

const Announcement = () => {
  return (
    <main className="mx-auto h-full px-4 pt-8 md:pt-20 pb-20 flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl xl:px-0">
      <Hero />
      <Topics />
    </main>
  )
}
export default Announcement
