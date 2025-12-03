'use client';

/**
 * State Indicator Component
 * Displays the current state of the Turing Machine
 */

import { StateIndicatorProps } from '@/types';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StateIndicator({
  currentState,
  isAcceptState,
  isRejectState,
}: StateIndicatorProps) {
  const getStateColor = () => {
    if (isAcceptState) return 'text-green-500 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
    if (isRejectState) return 'text-red-500 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
    return 'text-blue-500 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800';
  };

  const getIcon = () => {
    if (isAcceptState) return <CheckCircle2 className="w-5 h-5" />;
    if (isRejectState) return <XCircle className="w-5 h-5" />;
    return <Activity className="w-5 h-5" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        Current State
      </div>
      <motion.div
        key={currentState}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={cn(
          'px-4 py-3 rounded-lg border-2 flex items-center gap-3 font-mono text-lg font-semibold',
          getStateColor()
        )}
      >
        {getIcon()}
        <span>{currentState}</span>
      </motion.div>
    </motion.div>
  );
}
