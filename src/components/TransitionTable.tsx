'use client';

/**
 * Transition Table Component
 * Displays the transition table with active transition highlighted
 */

import { TransitionTableProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';

export function TransitionTable({
  transitions,
  currentTransition,
  isCollapsed,
  onToggle,
}: TransitionTableProps) {
  return (
    <div className="w-full">
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="flex items-center gap-2">
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            Transition Table
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({transitions.length} transitions)
          </span>
        </div>
      </motion.button>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-gray-800 border-b-2 border-gray-300 dark:border-gray-600">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Current State
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Read
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Write
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Move
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300">
                      Next State
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transitions.map((transition, index) => {
                    const isActive =
                      currentTransition &&
                      transition.currentState === currentTransition.currentState &&
                      transition.readSymbol === currentTransition.readSymbol;

                    return (
                      <motion.tr
                        key={index}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`
                          border-b border-gray-200 dark:border-gray-700 font-mono transition-colors
                          ${
                            isActive
                              ? 'bg-blue-100 dark:bg-blue-950 border-blue-300 dark:border-blue-700'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                          }
                        `}
                      >
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                          {transition.currentState}
                        </td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                          {transition.readSymbol === '_' ? '∅' : transition.readSymbol}
                        </td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                          {transition.writeSymbol === '_' ? '∅' : transition.writeSymbol}
                        </td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                          {transition.moveDirection === 'L' && '← Left'}
                          {transition.moveDirection === 'R' && '→ Right'}
                          {transition.moveDirection === 'S' && '• Stay'}
                        </td>
                        <td className="px-4 py-3 text-gray-900 dark:text-gray-100">
                          {transition.nextState}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
