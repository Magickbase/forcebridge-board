"use client";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const TokenHero = ({ tokens, platform }: { tokens: Array<string>, platform: string }) => {
  return (
    <motion.h1
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      className={cn(
        "relative mb-6  text-left text-4xl leading-normal font-bold tracking-tight text-zinc-700 md:text-7xl dark:text-zinc-100",
      )}
      layout
    >
      <div className="inline-block">
        <ContainerTextFlip words={tokens} /> on {platform}
      </div>
    </motion.h1>
  )
}

export default TokenHero
