'use client';

/**
 * Control Panel Component
 * Playback controls for the Turing Machine
 */

import { ControlPanelProps } from '@/types';
import { motion } from 'framer-motion';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RotateCcw,
  Gauge,
} from 'lucide-react';

export function ControlPanel({
  status,
  speed,
  currentStep,
  totalSteps,
  onPlay,
  onPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSpeedChange,
}: ControlPanelProps) {
  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isIdle = status === 'idle';
  const canControl = !isIdle;

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Controls
      </h3>

      {/* Playback buttons */}
      <div className="flex flex-wrap gap-2">
        <motion.button
          whileHover={{ scale: canControl ? 1.05 : 1 }}
          whileTap={{ scale: canControl ? 0.95 : 1 }}
          onClick={onStepBackward}
          disabled={!canControl || currentStep === 0}
          className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          title="Step Backward"
        >
          <SkipBack className="w-5 h-5" />
          <span className="hidden sm:inline">Back</span>
        </motion.button>

        {isRunning ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onPause}
            className="px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-semibold flex items-center gap-2 shadow-lg transition-colors"
            title="Pause"
          >
            <Pause className="w-5 h-5" />
            Pause
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: canControl ? 1.05 : 1 }}
            whileTap={{ scale: canControl ? 0.95 : 1 }}
            onClick={onPlay}
            disabled={!canControl}
            className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold flex items-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Play"
          >
            <Play className="w-5 h-5" />
            {isPaused ? 'Resume' : 'Play'}
          </motion.button>
        )}

        <motion.button
          whileHover={{ scale: canControl ? 1.05 : 1 }}
          whileTap={{ scale: canControl ? 0.95 : 1 }}
          onClick={onStepForward}
          disabled={!canControl}
          className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          title="Step Forward"
        >
          <span className="hidden sm:inline">Forward</span>
          <SkipForward className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-4 py-3 rounded-lg bg-red-100 dark:bg-red-900 border-2 border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center gap-2"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="hidden sm:inline">Reset</span>
        </motion.button>
      </div>

      {/* Progress indicator */}
      {canControl && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>Progress</span>
            <span>
              Step {currentStep} {totalSteps > 0 && `/ ${totalSteps}`}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: totalSteps > 0 ? `${(currentStep / totalSteps) * 100}%` : '0%',
              }}
              transition={{ duration: 0.3 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            />
          </div>
        </div>
      )}

      {/* Speed control */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Gauge className="w-4 h-4" />
          <span>Speed: {speed}x</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500 dark:text-gray-400">0.5x</span>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-xs text-gray-500 dark:text-gray-400">3x</span>
        </div>
      </div>
    </div>
  );
}
