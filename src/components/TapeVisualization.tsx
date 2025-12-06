'use client';

/**
 * Tape Visualization Component
 * Displays the tape with a clean, simple design
 */

import { TapeVisualizationProps } from '@/types';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function TapeVisualization({
  tape,
  currentState,
  highlightedCell,
}: TapeVisualizationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headPosition = tape.headPosition;

  // Auto-scroll to keep head in view
  useEffect(() => {
    if (containerRef.current) {
      const cellElement = containerRef.current.querySelector(
        `[data-cell-index="${headPosition}"]`
      ) as HTMLElement;

      if (cellElement) {
        cellElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [headPosition]);

  // Show cells around the head position
  const visibleRange = 20;
  const startIndex = Math.max(0, headPosition - Math.floor(visibleRange / 2));
  const endIndex = Math.min(tape.cells.length, startIndex + visibleRange);
  const visibleCells = tape.cells.slice(startIndex, endIndex);

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Tape
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Head at position: {headPosition}
        </div>
      </div>

      {/* Tape cells container */}
      <div
        ref={containerRef}
        className="overflow-x-auto pb-4"
        style={{
          scrollbarWidth: 'thin',
        }}
      >
        <div className="flex items-center justify-center gap-0 min-w-max px-4">
          {visibleCells.map((cell, index) => {
            const actualIndex = startIndex + index;
            const isHead = actualIndex === headPosition;
            const displayValue = cell === '_' ? '' : cell;

            return (
              <motion.div
                key={`cell-${actualIndex}`}
                data-cell-index={actualIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`
                  w-16 h-16 md:w-20 md:h-20
                  flex items-center justify-center
                  border-2 border-gray-800 dark:border-gray-300
                  bg-white dark:bg-gray-900
                  font-mono text-2xl md:text-3xl font-bold
                  text-gray-900 dark:text-gray-100
                  transition-all duration-200
                  ${isHead ? 'border-yellow-500 border-4 shadow-lg z-10 scale-105' : ''}
                  ${index > 0 ? '-ml-[2px]' : ''}
                `}
                style={{
                  borderColor: isHead ? '#eab308' : undefined,
                }}
              >
                {displayValue}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-4 border-yellow-500 bg-white dark:bg-gray-900" />
          <span>Current position</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 border-2 border-gray-800 dark:border-gray-300 bg-white dark:bg-gray-900" />
          <span>Tape cell</span>
        </div>
      </div>
    </div>
  );
}
