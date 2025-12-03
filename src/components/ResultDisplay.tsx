'use client';

/**
 * Result Display Component
 * Shows computation results and statistics
 */

import { ResultDisplayProps } from '@/types';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Hash } from 'lucide-react';
import { formatTime } from '@/lib/utils';

export function ResultDisplay({ result }: ResultDisplayProps) {
  if (result.status === 'idle') {
    return (
      <div className="w-full p-6 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
        Configure inputs and start the machine to see results
      </div>
    );
  }

  const isSuccess = result.status === 'success';
  const isError = result.status === 'error';
  const isRunning = result.status === 'running' || result.status === 'paused';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full space-y-4"
    >
      {/* Status */}
      <div className="flex items-center gap-3">
        {isSuccess && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </motion.div>
        )}
        {isError && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <XCircle className="w-6 h-6 text-red-500" />
          </motion.div>
        )}
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {isSuccess && 'Computation Complete'}
          {isError && 'Computation Error'}
          {isRunning && 'Computing...'}
        </span>
      </div>

      {/* Error Message */}
      {isError && result.error && (
        <div className="p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
          {result.error}
        </div>
      )}

      {/* Result */}
      {isSuccess && result.result !== undefined && (
        <div className="space-y-3">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Binary Result
            </div>
            <div className="font-mono text-3xl font-bold text-blue-600 dark:text-blue-400 break-all">
              {result.result}
            </div>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border border-purple-200 dark:border-purple-800 rounded-lg">
            <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
              Decimal Result
            </div>
            <div className="font-mono text-3xl font-bold text-purple-600 dark:text-purple-400">
              {result.decimalResult}
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
            <Hash className="w-4 h-4" />
            <span className="text-sm font-medium">Total Steps</span>
          </div>
          <div className="font-mono text-2xl font-bold text-gray-900 dark:text-gray-100">
            {result.totalSteps}
          </div>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Execution Time</span>
          </div>
          <div className="font-mono text-2xl font-bold text-gray-900 dark:text-gray-100">
            {formatTime(result.executionTime)}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
