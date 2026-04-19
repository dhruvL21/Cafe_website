"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const BubbleText = ({ text, className }: { text: string, className?: string }) => {
  const words = text.split(" ");

  return (
    <h1 className={cn("bubble-text-container", className)}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-4">
          {word.split("").map((child, idx) => (
            <motion.span
              key={idx}
              className="bubble-text"
              variants={{
                hover: {
                  scale: 1.6,
                  color: "#f5f5f5",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10,
                  },
                },
              }}
              whileHover="hover"
            >
              {child}
            </motion.span>
          ))}
        </span>
      ))}
    </h1>
  );
};

export default BubbleText;
