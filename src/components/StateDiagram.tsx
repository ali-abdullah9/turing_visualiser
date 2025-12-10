'use client';

/**
 * State Diagram Visualization Component
 * Shows the actual state machine diagram with transitions
 */

import { motion } from 'framer-motion';
import { Operation } from '@/types';

interface StateDiagramProps {
  currentState: string;
  operation: Operation;
}

export function StateDiagram({ currentState, operation }: StateDiagramProps) {
  // Define the actual states used in the TM
  const states = [
    { id: 'START', label: 'START', x: 50, y: 120, color: 'bg-blue-500' },
    { id: 'SCAN_NUM1', label: 'SCAN 1st', x: 200, y: 120, color: 'bg-purple-500' },
    { id: 'SCAN_NUM2', label: 'SCAN 2nd', x: 350, y: 120, color: 'bg-indigo-500' },
    { id: 'WRITE_RESULT', label: 'WRITE', x: 500, y: 120, color: 'bg-cyan-500' },
    { id: 'ACCEPT', label: 'ACCEPT', x: 650, y: 120, color: 'bg-green-500' },
  ];

  // Check if current state matches or starts with state id
  const isStateActive = (stateId: string) => {
    if (currentState === stateId) return true;
    // Handle WRITE_1, WRITE_2, etc.
    if (stateId === 'WRITE_RESULT' && currentState.startsWith('WRITE_')) return true;
    return false;
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        State Diagram
      </h3>

      <div className="relative bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-8 overflow-x-auto">
        <div className="min-w-max" style={{ minHeight: '200px' }}>
          {/* SVG for arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon
                  points="0 0, 10 3, 0 6"
                  fill="#6b7280"
                  className="dark:fill-gray-400"
                />
              </marker>
            </defs>

            {/* Arrows between states */}
            {states.map((state, index) => {
              if (index < states.length - 1) {
                const nextState = states[index + 1];
                return (
                  <g key={`arrow-${index}`}>
                    <line
                      x1={state.x + 80}
                      y1={state.y + 25}
                      x2={nextState.x - 10}
                      y2={nextState.y + 25}
                      stroke="#6b7280"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                      className="dark:stroke-gray-400"
                    />
                  </g>
                );
              }
              return null;
            })}

            {/* Self-loops for scanning states */}
            <path
              d={`M ${states[1].x + 40} ${states[1].y - 10} Q ${states[1].x + 40} ${states[1].y - 40} ${states[1].x + 70} ${states[1].y}`}
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="dark:stroke-gray-400"
            />
            <path
              d={`M ${states[2].x + 40} ${states[2].y - 10} Q ${states[2].x + 40} ${states[2].y - 40} ${states[2].x + 70} ${states[2].y}`}
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="dark:stroke-gray-400"
            />
          </svg>

          {/* State nodes */}
          {states.map((state) => {
            const isActive = isStateActive(state.id);

            return (
              <motion.div
                key={state.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute"
                style={{
                  left: `${state.x}px`,
                  top: `${state.y}px`,
                  zIndex: 10,
                }}
              >
                <motion.div
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    boxShadow: isActive ? '0 0 20px rgba(59, 130, 246, 0.6)' : '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-20 h-12 rounded-lg flex items-center justify-center
                    font-semibold text-white text-xs
                    border-2 border-white dark:border-gray-800
                    ${isActive ? state.color : 'bg-gray-400 dark:bg-gray-600'}
                    transition-all duration-300
                  `}
                >
                  {state.label}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* State description */}
      <div className="text-sm text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
        <span className="font-medium">Current State: </span>
        <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{currentState}</span>
      </div>
    </div>
  );
}
