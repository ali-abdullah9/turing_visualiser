'use client';

/**
 * Input Section Component
 * Handles user inputs for binary numbers and operation selection
 */

import { InputSectionProps } from '@/types';
import { motion } from 'framer-motion';
import { Play, RotateCcw, Plus, Minus } from 'lucide-react';
import { isValidBinary } from '@/lib/turingMachine';

export function InputSection({
  number1,
  number2,
  operation,
  onNumber1Change,
  onNumber2Change,
  onOperationChange,
  onStart,
  onReset,
  disabled,
}: InputSectionProps) {
  const isValid1 = !number1 || isValidBinary(number1);
  const isValid2 = !number2 || isValidBinary(number2);
  const canStart = number1 && number2 && isValid1 && isValid2 && !disabled;

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Input Configuration
      </h3>

      {/* Binary inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            First Number (Binary)
          </label>
          <input
            type="text"
            value={number1}
            onChange={(e) => onNumber1Change(e.target.value)}
            placeholder="e.g., 101"
            disabled={disabled}
            className={`
              w-full px-4 py-3 rounded-lg border-2 font-mono text-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
              ${
                isValid1
                  ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  : 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100'
              }
            `}
          />
          {!isValid1 && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 dark:text-red-400"
            >
              Please enter a valid binary number (only 0s and 1s)
            </motion.p>
          )}
          {isValid1 && number1 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Decimal: {parseInt(number1, 2)}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Second Number (Binary)
          </label>
          <input
            type="text"
            value={number2}
            onChange={(e) => onNumber2Change(e.target.value)}
            placeholder="e.g., 11"
            disabled={disabled}
            className={`
              w-full px-4 py-3 rounded-lg border-2 font-mono text-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
              ${
                isValid2
                  ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                  : 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100'
              }
            `}
          />
          {!isValid2 && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-red-600 dark:text-red-400"
            >
              Please enter a valid binary number (only 0s and 1s)
            </motion.p>
          )}
          {isValid2 && number2 && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Decimal: {parseInt(number2, 2)}
            </p>
          )}
        </div>
      </div>

      {/* Operation selector */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Operation
        </label>
        <div className="grid grid-cols-2 gap-4">
          <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={() => onOperationChange('addition')}
            disabled={disabled}
            className={`
              px-6 py-4 rounded-lg border-2 font-semibold flex items-center justify-center gap-2
              transition-all disabled:opacity-50 disabled:cursor-not-allowed
              ${
                operation === 'addition'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-300 dark:hover:border-blue-700'
              }
            `}
          >
            <Plus className="w-5 h-5" />
            Addition
          </motion.button>

          <motion.button
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={() => onOperationChange('subtraction')}
            disabled={disabled}
            className={`
              px-6 py-4 rounded-lg border-2 font-semibold flex items-center justify-center gap-2
              transition-all disabled:opacity-50 disabled:cursor-not-allowed
              ${
                operation === 'subtraction'
                  ? 'border-purple-500 bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300'
                  : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-700'
              }
            `}
          >
            <Minus className="w-5 h-5" />
            Subtraction
          </motion.button>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: canStart ? 1.02 : 1 }}
          whileTap={{ scale: canStart ? 0.98 : 1 }}
          onClick={onStart}
          disabled={!canStart}
          className={`
            flex-1 px-6 py-4 rounded-lg font-semibold flex items-center justify-center gap-2
            transition-all
            ${
              canStart
                ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-500 cursor-not-allowed'
            }
          `}
        >
          <Play className="w-5 h-5" />
          Start Machine
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          className="px-6 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold flex items-center justify-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Reset
        </motion.button>
      </div>
    </div>
  );
}
