"use client";
import { Component, ReactElement, useEffect, useMemo } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();

  // Memoize words array to avoid unnecessary re-calculations
  const wordsArray = useMemo(() => words.split(" "), [words]);

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 1,
        delay: stagger(0.1),
      }
    );
  }, [animate]);

  // Memoize renderWords function to avoid unnecessary re-rendering
  const renderWords = useMemo(() => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="text-base leading-7 font-[400] opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  }, [wordsArray, scope]);

  return (
    <div className={cn("font-bold ", className)}>
      <div>
        <div className="dark:text-muted-foreground hover:text-white dark:hover:text-white text-sm leading-normal ">
          {renderWords}
        </div>
      </div>
    </div>
  );
};
