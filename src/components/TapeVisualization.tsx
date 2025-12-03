'use client';

/**
 * Tape Visualization Component
 * Displays the infinite tape with smooth scrolling
 */

import { TapeVisualizationProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

export function TapeVisualization({
  tape,
  currentState,
  highlightedCell,
}: TapeVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headPosition = highlightedCell !== undefined ? highlightedCell : tape.headPosition;

  // Auto-scroll to keep head in view
  useEffect(() => {
    if (containerRef.current) {
      const cellWidth = 64; // w-16 = 4rem = 64px
      const containerWidth = containerRef.current.clientWidth;
      const scrollPosition = headPosition * cellWidth - containerWidth / 2 + cellWidth / 2;

      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  }, [headPosition]);

  // Calculate visible range (show 15 cells centered on head)
  const visibleRange = 15;
  const startIndex = Math.max(0, headPosition - Math.floor(visibleRange / 2));
  const endIndex = Math.min(tape.cells.length, startIndex + visibleRange);

  const visibleCells = tape.cells.slice(startIndex, endIndex);

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Tape
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Head at position: {headPosition}
        </div>
      </div>

      {/* Head indicator */}
      <div className="flex flex-col items-center">
        <motion.div
          key={`head-${headPosition}`}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col items-center"
          style={{
            marginLeft: `${(headPosition - startIndex) * 64}px`,
          }}
        >
          <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
            Head
          </div>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </motion.div>
        </motion.div>
      </div>

      {/* Tape cells */}
      <div
        ref={containerRef}
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800"
      >
        <div className="flex gap-2 p-4 min-w-max">
          <AnimatePresence mode="popLayout">
            {visibleCells.map((cell, index) => {
              const actualIndex = startIndex + index;
              const isHead = actualIndex === headPosition;
              const isHighlighted = actualIndex === highlightedCell;

              return (
                <motion.div
                  key={`cell-${actualIndex}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: isHead || isHighlighted ? 1.05 : 1,
                    opacity: 1,
                  }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className={`
                    relative w-16 h-16 rounded-lg border-2 flex items-center justify-center
                    font-mono text-2xl font-bold transition-colors
                    ${
                      isHead || isHighlighted
                        ? 'border-blue-500 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-lg'
                        : cell === '_'
                        ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                        : 'border-gray-400 dark:border-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    }
                  `}
                >
                  <motion.span
                    key={`${actualIndex}-${cell}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cell === '_' ? '∅' : cell}
                  </motion.span>

                  {/* Cell index */}
                  <div className="absolute -bottom-6 text-xs text-gray-500 dark:text-gray-400">
                    {actualIndex}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-blue-100 dark:bg-blue-900 border-2 border-blue-500" />
          <span>Current position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-500" />
          <span>Data cell</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center text-xs">
            ∅
          </div>
          <span>Blank cell</span>
        </div>
      </div>
    </div>
  );
}
