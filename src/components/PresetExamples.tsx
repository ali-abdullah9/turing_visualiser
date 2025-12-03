'use client';

/**
 * Preset Examples Component
 * Dropdown selector for preset binary arithmetic examples
 */

import { PresetExamplesProps } from '@/types';
import { PRESET_EXAMPLES } from '@/constants/presets';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function PresetExamples({ onSelectPreset, disabled }: PresetExamplesProps) {
  return (
    <div className="w-full space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
        <Sparkles className="w-4 h-4" />
        Try a Preset Example
      </label>

      <select
        onChange={(e) => {
          const preset = PRESET_EXAMPLES.find((p) => p.id === e.target.value);
          if (preset) {
            onSelectPreset(preset);
          }
          e.target.value = ''; // Reset selection
        }}
        disabled={disabled}
        className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        defaultValue=""
      >
        <option value="" disabled>
          Select an example...
        </option>
        {PRESET_EXAMPLES.map((preset) => (
          <option key={preset.id} value={preset.id}>
            {preset.label}
          </option>
        ))}
      </select>

      {/* Preset cards (alternative UI - optional) */}
      <div className="hidden lg:grid grid-cols-2 gap-3 mt-4">
        {PRESET_EXAMPLES.slice(0, 4).map((preset) => (
          <motion.button
            key={preset.id}
            whileHover={{ scale: disabled ? 1 : 1.02 }}
            whileTap={{ scale: disabled ? 1 : 0.98 }}
            onClick={() => !disabled && onSelectPreset(preset)}
            disabled={disabled}
            className="p-4 rounded-lg border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="font-mono text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
              {preset.label.split('(')[0]}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {preset.description}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
