'use client'

import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useOutsideClick } from '@/lib/hooks/use-outside-click'
import Link from 'next/link'
import { FORCE_BRIDGE_URL, GODWOKEN_BRIDGE_URL } from '@/lib/const'

const TimelineSummary = () => {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(false)
      }
    }

    if (active && typeof active === 'object') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && typeof active === 'object' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === 'object' ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05
                }
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className=" w-[90%] flex flex-col bg-white rounded-xl overflow-hidden"
            >
              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-nowrap text-zinc-700 dark:text-zinc-200"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-zinc-600 dark:text-zinc-400"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-zinc-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-zinc-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === 'function' ? active.content() : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="w-full gap-4">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col md:flex-row justify-between items-center hover:bg-zinc-100/20 rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col md:flex-row ">
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-nowrap text-zinc-50 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-zinc-200/80 text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold text-zinc-50 hover:text-zinc-900 bg-gray-100/20 cursor-pointer hover:bg-gray-300 mt-4 md:mt-0"
            >
              {card.ctaText}
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  )
}

export default TimelineSummary

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05
        }
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  )
}

const cards = [
  {
    title: 'Sunset Announcement',
    description: 'June 1, 2025',
    ctaText: 'Detail',
    content: () => {
      return (
        <ul className="list-disc ml-4">
          <li>Force Bridge and Godwoken will both enter their exit windows on this day.</li>
          <li>The deposit channels for both bridges will be closed immediately to prevent further fund inflow.</li>
        </ul>
      )
    }
  },

  {
    title: 'Godwoken Exit Window',
    description: (
      <span>
        June 1 – <del>October 31, 2025</del> January 1, 2026
      </span>
    ),
    ctaText: 'Detail',
    content: () => {
      return (
        <ul className="list-disc ml-4">
          <li>
            Users can withdraw assets from Godwoken to CKB via the
            <Link
              href={GODWOKEN_BRIDGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-[0.5ch] underline-offset-2"
            >
              Godwoken Bridge
            </Link>
            .
          </li>
          <li>
            After the exit window, Godwoken will enter a frozen state, during which remaining data will be retained and
            unclaimed balances will be reported.
          </li>
        </ul>
      )
    }
  },
  {
    title: 'Force Bridge Exit Window',
    description: (
      <span>
        June 1 – <del>November 30, 2025</del> January 16, 2026
      </span>
    ),
    ctaText: 'Detail',
    content: () => {
      return (
        <ul className="list-disc ml-4">
          <li>
            Users can withdraw assets from CKB to their origin chains via the
            <Link
              href={FORCE_BRIDGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline ml-[0.5ch] underline-offset-2"
            >
              Force Bridge
            </Link>
            .
          </li>
          <li className="hidden">
            On December 1, 2025, the Force Bridge will shut down, and a final snapshot of remaining funds will be
            published.
          </li>
        </ul>
      )
    }
  }
]
