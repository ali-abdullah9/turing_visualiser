'use client';

/**
 * State Diagram Visualization Component
 * Shows the state machine diagram with transitions
 */

import { motion } from 'framer-motion';
import { Operation } from '@/types';

interface StateDiagramProps {
  currentState: string;
  operation: Operation;
}

export function StateDiagram({ currentState, operation }: StateDiagramProps) {
  // Define states and their positions for the diagram
  const states = [
    { id: 'START', label: 'Start', color: 'bg-blue-500', x: 100, y: 150 },
    { id: 'FIND_SECOND', label: 'Find 2nd', color: 'bg-purple-500', x: 250, y: 150 },
    { id: 'FIND_END', label: 'Find End', color: 'bg-indigo-500', x: 400, y: 150 },
    { id: 'INIT_ADD', label: 'Init Add', color: 'bg-cyan-500', x: 550, y: 150 },
    { id: 'ADD_0_0', label: 'Add', color: 'bg-teal-500', x: 700, y: 150 },
    { id: 'ACCEPT', label: 'Done', color: 'bg-green-500', x: 850, y: 150 },
  ];

  // Find current state position
  const getCurrentStateColor = () => {
    const state = states.find(s => currentState.includes(s.id) || s.id.includes(currentState));
    return state?.color || 'bg-yellow-500';
  };

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        State Diagram
      </h3>

      <div className="relative bg-white dark:bg-gray-900 rounded-lg border-2 border-gray-200 dark:border-gray-700 p-8 overflow-x-auto">
        <div className="min-w-max" style={{ minHeight: '250px' }}>
          {/* SVG for arrows */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
            {/* Example arrow from START to next state */}
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
                      x1={state.x + 60}
                      y1={state.y + 30}
                      x2={nextState.x}
                      y2={nextState.y + 30}
                      stroke="#6b7280"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                      className="dark:stroke-gray-400"
                    />
                    <text
                      x={(state.x + nextState.x + 60) / 2}
                      y={state.y + 15}
                      className="text-xs fill-gray-600 dark:fill-gray-400"
                      textAnchor="middle"
                    >
                      →
                    </text>
                  </g>
                );
              }
              return null;
            })}

            {/* Self-loop for some states */}
            <path
              d={`M ${states[1].x + 30} ${states[1].y - 10} Q ${states[1].x + 30} ${states[1].y - 50} ${states[1].x + 60} ${states[1].y}`}
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
              markerEnd="url(#arrowhead)"
              className="dark:stroke-gray-400"
            />
          </svg>

          {/* State nodes */}
          {states.map((state) => {
            const isActive = currentState === state.id ||
                           currentState.includes(state.id) ||
                           state.id.includes(currentState);

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
                    boxShadow: isActive ? '0 0 20px rgba(59, 130, 246, 0.5)' : '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                  className={`
                    w-24 h-14 rounded-lg flex items-center justify-center
                    font-semibold text-white text-sm
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
        <span className="font-medium">Current: </span>
        <span className="font-mono">{currentState}</span>
      </div>
    </div>
  );
}
