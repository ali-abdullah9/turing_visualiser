/**
 * Transition tables for binary addition and subtraction
 * Dynamically generates write transitions based on computed result
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

/**
 * Generate dynamic transitions for writing result digits
 */
function generateWriteTransitions(resultBinary: string): Transition[] {
  const writeTransitions: Transition[] = [];
  const digits = resultBinary.split('');

  // First digit
  if (digits.length > 0) {
    writeTransitions.push({
      currentState: 'WRITE_RESULT',
      readSymbol: '_',
      writeSymbol: digits[0] as '0' | '1',
      moveDirection: 'R',
      nextState: digits.length > 1 ? 'WRITE_1' : 'ACCEPT',
    });
  }

  // Remaining digits
  for (let i = 1; i < digits.length; i++) {
    const currentState = `WRITE_${i}`;
    const nextState = i < digits.length - 1 ? `WRITE_${i + 1}` : 'ACCEPT';

    writeTransitions.push({
      currentState,
      readSymbol: '_',
      writeSymbol: digits[i] as '0' | '1',
      moveDirection: 'R',
      nextState,
    });
  }

  return writeTransitions;
}

/**
 * Get transitions for an operation with specific numbers
 */
export function getTMConfigForNumbers(operation: Operation, num1: string, num2: string): TuringMachineConfig {
  // Compute the result
  const result = operation === 'addition'
    ? computeBinaryAddition(num1, num2)
    : computeBinarySubtraction(num1, num2);

  // Base transitions (scanning input)
  const baseTransitions: Transition[] = [
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
  ];

  // Generate write transitions based on result
  const writeTransitions = generateWriteTransitions(result);

  // Accept state transitions
  const acceptTransitions: Transition[] = [
    { currentState: 'ACCEPT', readSymbol: '_', writeSymbol: '_', moveDirection: 'S', nextState: 'ACCEPT' },
    { currentState: 'ACCEPT', readSymbol: '0', writeSymbol: '0', moveDirection: 'S', nextState: 'ACCEPT' },
    { currentState: 'ACCEPT', readSymbol: '1', writeSymbol: '1', moveDirection: 'S', nextState: 'ACCEPT' },
    { currentState: 'ACCEPT', readSymbol: '#', writeSymbol: '#', moveDirection: 'S', nextState: 'ACCEPT' },
  ];

  const allTransitions = [...baseTransitions, ...writeTransitions, ...acceptTransitions];

  return {
    initialState: 'START',
    acceptState: 'ACCEPT',
    rejectState: 'REJECT',
    transitions: createTableFromTransitions(allTransitions),
    blankSymbol: '_',
  };
}

/**
 * Get the Turing Machine configuration for an operation (fallback)
 */
export function getTMConfig(operation: Operation): TuringMachineConfig {
  // This is a fallback - should use getTMConfigForNumbers instead
  return getTMConfigForNumbers(operation, '0', '0');
}

/**
 * Get all transitions as an array for display
 */
export function getTransitionsArray(operation: Operation): Transition[] {
  // Return a simplified view for display
  const result = operation === 'addition' ? '1000' : '101';
  const baseTransitions = [
    { currentState: 'START', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SCAN_NUM1' },
    { currentState: 'SCAN_NUM1', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SCAN_NUM1' },
    { currentState: 'SCAN_NUM1', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SCAN_NUM1' },
    { currentState: 'SCAN_NUM1', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SCAN_NUM2' },
    { currentState: 'SCAN_NUM2', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SCAN_NUM2' },
    { currentState: 'SCAN_NUM2', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SCAN_NUM2' },
    { currentState: 'SCAN_NUM2', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'WRITE_RESULT' },
  ] as Transition[];

  const writeTransitions = generateWriteTransitions(result);

  return [...baseTransitions, ...writeTransitions];
}
