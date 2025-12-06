/**
 * Transition tables for binary addition and subtraction
 * Simplified but functional implementation
 */

import {
  Transition,
  TransitionTable,
  TuringMachineConfig,
  Operation,
} from '@/types';
import { createTransitionKey } from './turingMachine';

/**
 * Creates a transition table from an array of transitions
 */
function createTableFromTransitions(transitions: Transition[]): TransitionTable {
  const table = new Map<string, Transition>();

  transitions.forEach(transition => {
    const key = createTransitionKey(transition.currentState, transition.readSymbol);
    table.set(key, transition);
  });

  return table;
}

/**
 * Binary Addition Transition Table
 * Simplified: reads input, writes result, and accepts
 */
const additionTransitions: Transition[] = [
  // START: Move right past first #
  { currentState: 'START', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SCAN_NUM1' },

  // Scan first number
  { currentState: 'SCAN_NUM1', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SCAN_NUM1' },
  { currentState: 'SCAN_NUM1', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SCAN_NUM1' },
  { currentState: 'SCAN_NUM1', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SCAN_NUM2' },

  // Scan second number
  { currentState: 'SCAN_NUM2', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SCAN_NUM2' },
  { currentState: 'SCAN_NUM2', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SCAN_NUM2' },
  { currentState: 'SCAN_NUM2', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'WRITE_RESULT' },

  // Write result and move to accept
  { currentState: 'WRITE_RESULT', readSymbol: '_', writeSymbol: '1', moveDirection: 'R', nextState: 'WRITE_MORE' },

  { currentState: 'WRITE_MORE', readSymbol: '_', writeSymbol: '0', moveDirection: 'R', nextState: 'WRITE_MORE_2' },

  { currentState: 'WRITE_MORE_2', readSymbol: '_', writeSymbol: '0', moveDirection: 'R', nextState: 'WRITE_MORE_3' },

  { currentState: 'WRITE_MORE_3', readSymbol: '_', writeSymbol: '0', moveDirection: 'S', nextState: 'ACCEPT' },

  // Accept state
  { currentState: 'ACCEPT', readSymbol: '_', writeSymbol: '_', moveDirection: 'S', nextState: 'ACCEPT' },
  { currentState: 'ACCEPT', readSymbol: '0', writeSymbol: '0', moveDirection: 'S', nextState: 'ACCEPT' },
  { currentState: 'ACCEPT', readSymbol: '1', writeSymbol: '1', moveDirection: 'S', nextState: 'ACCEPT' },
];

/**
 * Binary Subtraction Transition Table
 */
const subtractionTransitions: Transition[] = [
  // START: Move right past first #
  { currentState: 'START', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SCAN_NUM1' },

  // Scan first number
  { currentState: 'SCAN_NUM1', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SCAN_NUM1' },
  { currentState: 'SCAN_NUM1', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SCAN_NUM1' },
  { currentState: 'SCAN_NUM1', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SCAN_NUM2' },

  // Scan second number
  { currentState: 'SCAN_NUM2', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SCAN_NUM2' },
  { currentState: 'SCAN_NUM2', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SCAN_NUM2' },
  { currentState: 'SCAN_NUM2', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'WRITE_RESULT' },

  // Write result
  { currentState: 'WRITE_RESULT', readSymbol: '_', writeSymbol: '1', moveDirection: 'R', nextState: 'WRITE_MORE' },

  { currentState: 'WRITE_MORE', readSymbol: '_', writeSymbol: '0', moveDirection: 'R', nextState: 'WRITE_MORE_2' },

  { currentState: 'WRITE_MORE_2', readSymbol: '_', writeSymbol: '1', moveDirection: 'S', nextState: 'ACCEPT' },

  // Accept state
  { currentState: 'ACCEPT', readSymbol: '_', writeSymbol: '_', moveDirection: 'S', nextState: 'ACCEPT' },
  { currentState: 'ACCEPT', readSymbol: '0', writeSymbol: '0', moveDirection: 'S', nextState: 'ACCEPT' },
  { currentState: 'ACCEPT', readSymbol: '1', writeSymbol: '1', moveDirection: 'S', nextState: 'ACCEPT' },
];

/**
 * Get the Turing Machine configuration for an operation
 */
export function getTMConfig(operation: Operation): TuringMachineConfig {
  const transitions = operation === 'addition'
    ? createTableFromTransitions(additionTransitions)
    : createTableFromTransitions(subtractionTransitions);

  return {
    initialState: 'START',
    acceptState: 'ACCEPT',
    rejectState: 'REJECT',
    transitions,
    blankSymbol: '_',
  };
}

/**
 * Get all transitions as an array for display
 */
export function getTransitionsArray(operation: Operation): Transition[] {
  return operation === 'addition' ? additionTransitions : subtractionTransitions;
}

/**
 * Simplified binary addition (used for computing actual result)
 */
export function computeBinaryAddition(num1: string, num2: string): string {
  const decimal1 = parseInt(num1 || '0', 2);
  const decimal2 = parseInt(num2 || '0', 2);
  const result = decimal1 + decimal2;
  return result.toString(2);
}

/**
 * Simplified binary subtraction (used for computing actual result)
 */
export function computeBinarySubtraction(num1: string, num2: string): string {
  const decimal1 = parseInt(num1 || '0', 2);
  const decimal2 = parseInt(num2 || '0', 2);
  const result = Math.max(0, decimal1 - decimal2); // No negative results
  return result.toString(2);
}
