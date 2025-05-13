import Hero from './hero'
import Topics from './topics'

export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate every hour

const Announcement = () => {
  return (
    <main className="mx-auto h-full px-4 pt-8 md:pt-20 pb-20 flex flex-col gap-[32px] row-start-2 items-center sm:items-start w-full max-w-6xl xl:px-0">
      <Hero />
      <Topics />
    </main>
  )
}
export default Announcement
