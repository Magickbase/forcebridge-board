'use client'
import { motion } from 'motion/react'

const Hero = () => {
  return (
    <div className="text-center mx-auto">
      <h1 className="relative z-10 mx-auto max-w-4xl text-center text-md font-bold text-zinc-700 mb-4 md:mb-8  md:text-4xl dark:text-zinc-300">
        {'Sunset of Force Bridge and Godwoken'.split(' ').map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{
              duration: 0.3,
              delay: index * 0.1,
              ease: 'easeInOut'
            }}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h1>
      <motion.p
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.1,
          delay: 0.8
        }}
        className="relative font-semibold z-10 pt-4 text-left text-base text-zinc-600 dark:text-zinc-400"
      >
        Over the past few years, Force Bridge and Godwoken have played pivotal roles in expanding the Nervos CKB
        ecosystem — enabling multi-chain asset interoperability, EVM compatibility, and DApp development. These two
        products marked Nervos&apos; first major steps toward a layered architecture and cross-chain infrastructure.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, filter: 'blur(4px)', y: 10 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{
          duration: 0.1,
          delay: 0.9
        }}
        className="relative z-10 pb-4 text-left text-base font-semibold text-zinc-600 dark:text-zinc-400"
      >
        However, as the industry evolves and the ecosystem pivots toward UTXO-native capabilities, off-chain services,
        and value-centric automation, it’s time to sunset these early-stage components to make way for the next era of
        Nervos.
      </motion.p>
    </div>
  )
}

export default Hero
