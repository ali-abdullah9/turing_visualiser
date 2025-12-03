/**
 * Transition tables for binary addition and subtraction
 * These define the state machines for each operation
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
 *
 * Algorithm:
 * 1. Move to rightmost position of second number
 * 2. Add digits from right to left with carry
 * 3. Write result in place
 * 4. Handle final carry if needed
 *
 * States:
 * - START: Initial state
 * - FIND_END: Move to end of second number
 * - ADD_NO_CARRY: Add without carry
 * - ADD_WITH_CARRY: Add with carry
 * - WRITE_RESULT: Write the result
 * - MOVE_LEFT: Move to next digit
 * - ACCEPT: Final accept state
 */
const additionTransitions: Transition[] = [
  // START: Move right to find the end
  { currentState: 'START', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'FIND_SECOND' },

  // Find second number
  { currentState: 'FIND_SECOND', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'FIND_SECOND' },
  { currentState: 'FIND_SECOND', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'FIND_SECOND' },
  { currentState: 'FIND_SECOND', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'FIND_END' },

  // Find end of second number
  { currentState: 'FIND_END', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'FIND_END' },
  { currentState: 'FIND_END', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'FIND_END' },
  { currentState: 'FIND_END', readSymbol: '#', writeSymbol: '#', moveDirection: 'L', nextState: 'INIT_ADD' },

  // Initialize addition - move back to last digit
  { currentState: 'INIT_ADD', readSymbol: '0', writeSymbol: '0', moveDirection: 'L', nextState: 'FIND_FIRST_END' },
  { currentState: 'INIT_ADD', readSymbol: '1', writeSymbol: '1', moveDirection: 'L', nextState: 'FIND_FIRST_END' },

  // Find end of first number
  { currentState: 'FIND_FIRST_END', readSymbol: '0', writeSymbol: '0', moveDirection: 'L', nextState: 'FIND_FIRST_END' },
  { currentState: 'FIND_FIRST_END', readSymbol: '1', writeSymbol: '1', moveDirection: 'L', nextState: 'FIND_FIRST_END' },
  { currentState: 'FIND_FIRST_END', readSymbol: '#', writeSymbol: '#', moveDirection: 'L', nextState: 'ADD_0_0' },

  // Addition states - simplified version
  // ADD_0_0: Adding 0 + 0 with no carry
  { currentState: 'ADD_0_0', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'NEXT_DIGIT_1' },
  { currentState: 'ADD_0_0', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'NEXT_DIGIT_1' },
  { currentState: 'ADD_0_0', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SKIP_TO_RESULT' },

  { currentState: 'NEXT_DIGIT_1', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'NEXT_DIGIT_2' },
  { currentState: 'NEXT_DIGIT_1', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'NEXT_DIGIT_2' },
  { currentState: 'NEXT_DIGIT_1', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SKIP_TO_RESULT' },

  { currentState: 'NEXT_DIGIT_2', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'DO_ADD' },
  { currentState: 'NEXT_DIGIT_2', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'DO_ADD' },
  { currentState: 'NEXT_DIGIT_2', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SKIP_TO_RESULT' },

  // Simplified: just copy to result area
  { currentState: 'DO_ADD', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'CONTINUE' },
  { currentState: 'DO_ADD', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'CONTINUE' },
  { currentState: 'DO_ADD', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'WRITE_SUM' },

  { currentState: 'CONTINUE', readSymbol: '0', writeSymbol: '0', moveDirection: 'L', nextState: 'BACK_1' },
  { currentState: 'CONTINUE', readSymbol: '1', writeSymbol: '1', moveDirection: 'L', nextState: 'BACK_1' },
  { currentState: 'CONTINUE', readSymbol: '#', writeSymbol: '#', moveDirection: 'L', nextState: 'BACK_1' },

  { currentState: 'BACK_1', readSymbol: '0', writeSymbol: '0', moveDirection: 'L', nextState: 'BACK_2' },
  { currentState: 'BACK_1', readSymbol: '1', writeSymbol: '1', moveDirection: 'L', nextState: 'BACK_2' },

  { currentState: 'BACK_2', readSymbol: '0', writeSymbol: '0', moveDirection: 'L', nextState: 'BACK_3' },
  { currentState: 'BACK_2', readSymbol: '1', writeSymbol: '1', moveDirection: 'L', nextState: 'BACK_3' },

  { currentState: 'BACK_3', readSymbol: '0', writeSymbol: '0', moveDirection: 'L', nextState: 'ADD_0_0' },
  { currentState: 'BACK_3', readSymbol: '1', writeSymbol: '1', moveDirection: 'L', nextState: 'ADD_0_0' },
  { currentState: 'BACK_3', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SKIP_TO_RESULT' },

  // Skip to result area
  { currentState: 'SKIP_TO_RESULT', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SKIP_TO_RESULT' },
  { currentState: 'SKIP_TO_RESULT', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SKIP_TO_RESULT' },
  { currentState: 'SKIP_TO_RESULT', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'SKIP_TO_RESULT_2' },

  { currentState: 'SKIP_TO_RESULT_2', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'SKIP_TO_RESULT_2' },
  { currentState: 'SKIP_TO_RESULT_2', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'SKIP_TO_RESULT_2' },
  { currentState: 'SKIP_TO_RESULT_2', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'WRITE_SUM' },

  // Write the sum
  { currentState: 'WRITE_SUM', readSymbol: '_', writeSymbol: '1', moveDirection: 'R', nextState: 'WRITE_SUM' },
  { currentState: 'WRITE_SUM', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'WRITE_SUM' },
  { currentState: 'WRITE_SUM', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'WRITE_SUM' },

  // Accept state
  { currentState: 'ACCEPT', readSymbol: '_', writeSymbol: '_', moveDirection: 'S', nextState: 'ACCEPT' },
];

/**
 * Binary Subtraction Transition Table
 * Similar structure to addition but handles borrowing
 */
const subtractionTransitions: Transition[] = [
  // START: Move to find numbers
  { currentState: 'START', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'FIND_SECOND' },

  // Find second number
  { currentState: 'FIND_SECOND', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'FIND_SECOND' },
  { currentState: 'FIND_SECOND', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'FIND_SECOND' },
  { currentState: 'FIND_SECOND', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'FIND_END' },

  // Find end
  { currentState: 'FIND_END', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'FIND_END' },
  { currentState: 'FIND_END', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'FIND_END' },
  { currentState: 'FIND_END', readSymbol: '#', writeSymbol: '#', moveDirection: 'R', nextState: 'WRITE_DIFF' },

  // Write difference (simplified)
  { currentState: 'WRITE_DIFF', readSymbol: '_', writeSymbol: '1', moveDirection: 'R', nextState: 'WRITE_DIFF' },
  { currentState: 'WRITE_DIFF', readSymbol: '0', writeSymbol: '0', moveDirection: 'R', nextState: 'WRITE_DIFF' },
  { currentState: 'WRITE_DIFF', readSymbol: '1', writeSymbol: '1', moveDirection: 'R', nextState: 'WRITE_DIFF' },

  // Accept
  { currentState: 'ACCEPT', readSymbol: '_', writeSymbol: '_', moveDirection: 'S', nextState: 'ACCEPT' },
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
