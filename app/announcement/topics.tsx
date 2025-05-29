'use client'
import Link from 'next/link'
import { WobbleCard } from '@/components/wobble-card'
import { motion } from 'motion/react'
import { IconBook2, IconCalendarStats, IconInfoSquareRounded, IconSectionSign, IconTerminal } from '@tabler/icons-react'
import TimelineSummary from './timeline-summary'
import { FORCE_BRIDGE_URL, GODWOKEN_BRIDGE_URL, MAGICKBASE_URL } from '@/lib/const'
import { LinkPreview } from '@/components/ui/link-preview'

const Topics = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <motion.div
        className="col-span-1 lg:col-span-3"
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          delay: 1.1,
          ease: 'easeInOut'
        }}
      >
        <WobbleCard containerClassName="bg-zinc-900 min-h-[300px] xl:min-h-[300px]" className="text-zinc-300">
          <div className="max-w-xl">
            <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-zinc-50">
              Key Announcement
            </h2>
            <p className="mt-4 text-left text-base/6 text-zinc-300">
              We hereby announce the official sunset of Force Bridge and Godwoken, beginning&nbsp;
              <time dateTime="2025-06-01">June 1, 2025 (UTC+0)</time>. This phased shutdown process is designed to
              provide users with ample time to exit smoothly and ensure transparency throughout the transition. All
              updates will be shared on the&nbsp;
              <Link href="/" className="underline underline-offset-2">
                Sunset Hub
              </Link>
              .
            </p>
          </div>
        </WobbleCard>
      </motion.div>
      <motion.div
        className="col-span-1 lg:col-span-2"
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          delay: 1.4,
          ease: 'easeInOut'
        }}
      >
        <WobbleCard containerClassName="h-full bg-rose-900/90 min-h-[300px]" className="text-zinc-300">
          <div>
            <h2 className="flex items-center gap-1 text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-zinc-50">
              <IconSectionSign size="32" />
              Why the Sunset?
            </h2>
            <p className="mt-4 text-left text-base/6 text-zinc-200">
              The decision to sunset these services was driven by:
            </p>
            <ul className="ml-4 mt-4 list-disc">
              <li>
                A strategic shift toward UTXO-native protocols, including RGB++, advanced scripting, and value-centric
                design
              </li>
              <li>
                The opportunity to simplify the ecosystem and focus developer resources on new-generation infrastructure
              </li>
              <li>The acknowledgment of low user activity and high long-term maintenance costs of these services</li>
            </ul>
          </div>
        </WobbleCard>
      </motion.div>
      <motion.div
        className="col-span-1 h-full col-span-1 min-h-[300px]"
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          delay: 1.7,
          ease: 'easeInOut'
        }}
      >
        <WobbleCard containerClassName="h-full bg-purple-900/90" className="text-zinc-300">
          <h2 className="max-w-80 text-nowrap flex items-center gap-1  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-zinc-50">
            <IconCalendarStats size="32" />
            Timeline Summary
          </h2>
          <TimelineSummary />
        </WobbleCard>
      </motion.div>
      <motion.div
        className="col-span-1 min-h-[300px]"
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          delay: 1.9,
          ease: 'easeInOut'
        }}
      >
        <WobbleCard containerClassName="h-full bg-indigo-900/90" className="text-zinc-300">
          <h2 className="max-w-80 flex items-center gap-1  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-zinc-50">
            <IconInfoSquareRounded size="32" />
            Unclaimed?
          </h2>
          <ul className="ml-4 mt-4 list-disc">
            <li>
              For Force Bridge, any remaining funds after the exit time-frame will be retained in Force Bridge. Users
              can contact the&nbsp;
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.gg/GBYYgBA9s7"
                className="underline underline-offset-2"
              >
                Magickbase
              </Link>
              &nbsp;team for fund retrieval. Please note that custodial fee may be applied based on the duration since
              the sunset deadline. decisions.
            </li>
            <li>For Godwoken, unclaimed funds will no longer retrievable through standard front-end interface.</li>
            <li>
              Reports of remaining assets will be published on the
              <Link href="/" className="underline underline-offset-2 ml-[0.5ch] underline-offset-2">
                Sunset Hub
              </Link>
              .
            </li>
          </ul>
        </WobbleCard>
      </motion.div>
      <motion.div
        className="col-span-1 lg:col-span-2"
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          delay: 2.1,
          ease: 'easeInOut'
        }}
      >
        <WobbleCard containerClassName="h-full bg-rose-900/80 min-h-[300px]" className="text-zinc-300">
          <div className="lg:ml-auto max-w-xl">
            <h2 className="text-left flex items-center gap-1 text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-zinc-50">
              <IconBook2 size="32" />
              User Instructions
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              We urge all users:
              <ul className="ml-4 mt-4 list-disc">
                <li>
                  Withdraw assets from Godwoken using the&nbsp;
                  <LinkPreview
                    className="underline underline-offset-2 font-bold text-nowrap text-inherit"
                    imageSrc="/previews/godwoken-bridge-preview.png"
                    isStatic
                    url={GODWOKEN_BRIDGE_URL}
                  >
                    Godwoken Bridge
                  </LinkPreview>
                  &nbsp;before October 31, 2025
                </li>
                <li>
                  Withdraw assets from Force Bridge using the&nbsp;
                  <LinkPreview
                    className="underline underline-offset-2 font-bold text-nowrap text-inherit"
                    imageSrc="/previews/force-bridge-preview.png"
                    isStatic
                    url={FORCE_BRIDGE_URL}
                  >
                    Force Bridge
                  </LinkPreview>
                  &nbsp;UI before November 30, 2025
                </li>
                <li>
                  Stay tuned for bi-weekly reports on the&nbsp;
                  <Link href="/" className="underline underline-offset-2 font-bold text-nowrap">
                    Sunset Hub
                  </Link>
                  &nbsp;tracking exit progress and service updates
                </li>
              </ul>
            </p>
          </div>
        </WobbleCard>
      </motion.div>
      <motion.div
        className="col-span-1 lg:col-span-3"
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.3,
          delay: 2.4,
          ease: 'easeInOut'
        }}
      >
        <WobbleCard containerClassName="bg-zinc-900/95 min-h-[300px]" className="text-zinc-300">
          <div>
            <h2 className="flex items-center gap-1 max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-zinc-50">
              <IconTerminal size="32" />
              Final Note
            </h2>
            <p className="mt-4 text-left  text-base/6 text-neutral-200">
              We deeply thank all users, developers, and partners who supported Force Bridge and Godwoken. Your
              participation helped shape the Nervos ecosystem into what it is today. As we pivot forward, we remain
              committed to building secure, flexible, and innovative blockchain infrastructure — powered by CKB’s unique
              architecture.
            </p>
            <p className="mt-4 text-right">
              -&nbsp;
              <Link href={MAGICKBASE_URL} className="underline underline-offset-2">
                Magickbase
              </Link>
            </p>
          </div>
        </WobbleCard>
      </motion.div>
    </div>
  )
}
export default Topics
