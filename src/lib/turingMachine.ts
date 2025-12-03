/**
 * Core Turing Machine Engine
 * Handles tape management, state transitions, and execution logic
 */

import {
  Tape,
  TapeSymbol,
  TMState,
  Direction,
  Transition,
  TransitionTable,
  MachineConfig,
  TuringMachineConfig,
} from '@/types';

/**
 * Creates a transition key for lookup in the transition table
 */
export function createTransitionKey(state: TMState, symbol: TapeSymbol): string {
  return `${state}:${symbol}`;
}

/**
 * Initializes the tape with two binary numbers for the operation
 * Format: #number1#number2#___
 * The # serves as a delimiter
 */
export function initializeTape(num1: string, num2: string): Tape {
  // Ensure both numbers are valid binary
  const binary1 = num1 || '0';
  const binary2 = num2 || '0';

  // Create tape: #num1#num2#
  const cells: TapeSymbol[] = ['#'];

  // Add first number
  for (const digit of binary1) {
    cells.push(digit as TapeSymbol);
  }

  cells.push('#');

  // Add second number
  for (const digit of binary2) {
    cells.push(digit as TapeSymbol);
  }

  cells.push('#');

  // Add some blank cells for working space
  for (let i = 0; i < 20; i++) {
    cells.push('_');
  }

  return {
    cells,
    headPosition: 0, // Start at the first #
    leftBound: 0,
    rightBound: cells.length - 1,
  };
}

/**
 * Expands the tape if the head is near the boundaries
 */
export function expandTape(tape: Tape): Tape {
  const newCells = [...tape.cells];
  let newHeadPosition = tape.headPosition;
  let newLeftBound = tape.leftBound;
  let newRightBound = tape.rightBound;

  // Expand left if needed
  if (tape.headPosition <= tape.leftBound + 2) {
    const expansion = Array(10).fill('_');
    newCells.unshift(...expansion);
    newHeadPosition += 10;
    newLeftBound += 10;
    newRightBound += 10;
  }

  // Expand right if needed
  if (tape.headPosition >= tape.rightBound - 2) {
    const expansion = Array(10).fill('_');
    newCells.push(...expansion);
    newRightBound += 10;
  }

  return {
    cells: newCells,
    headPosition: newHeadPosition,
    leftBound: newLeftBound,
    rightBound: newRightBound,
  };
}

/**
 * Reads the symbol at the current head position
 */
export function readTape(tape: Tape): TapeSymbol {
  return tape.cells[tape.headPosition];
}

/**
 * Writes a symbol at the current head position
 */
export function writeTape(tape: Tape, symbol: TapeSymbol): Tape {
  const newCells = [...tape.cells];
  newCells[tape.headPosition] = symbol;

  return {
    ...tape,
    cells: newCells,
  };
}

/**
 * Moves the tape head in the specified direction
 */
export function moveHead(tape: Tape, direction: Direction): Tape {
  let newHeadPosition = tape.headPosition;

  switch (direction) {
    case 'L':
      newHeadPosition = Math.max(0, tape.headPosition - 1);
      break;
    case 'R':
      newHeadPosition = tape.headPosition + 1;
      break;
    case 'S':
      // Stay in place
      break;
  }

  return {
    ...tape,
    headPosition: newHeadPosition,
  };
}

/**
 * Looks up a transition in the transition table
 */
export function lookupTransition(
  transitionTable: TransitionTable,
  currentState: TMState,
  currentSymbol: TapeSymbol
): Transition | undefined {
  const key = createTransitionKey(currentState, currentSymbol);
  return transitionTable.get(key);
}

/**
 * Executes a single step of the Turing Machine
 */
export function executeStep(
  config: MachineConfig,
  transitionTable: TransitionTable
): MachineConfig | null {
  const currentSymbol = readTape(config.tape);
  const transition = lookupTransition(transitionTable, config.currentState, currentSymbol);

  // No transition found - halt
  if (!transition) {
    return null;
  }

  // Write symbol
  let newTape = writeTape(config.tape, transition.writeSymbol);

  // Move head
  newTape = moveHead(newTape, transition.moveDirection);

  // Expand tape if necessary
  newTape = expandTape(newTape);

  return {
    tape: newTape,
    currentState: transition.nextState,
    stepNumber: config.stepNumber + 1,
    lastTransition: transition,
  };
}

/**
 * Creates an initial machine configuration
 */
export function createInitialConfig(
  num1: string,
  num2: string,
  initialState: TMState
): MachineConfig {
  return {
    tape: initializeTape(num1, num2),
    currentState: initialState,
    stepNumber: 0,
  };
}

/**
 * Extracts the result from the tape
 * Assumes the result is between the last two # markers
 */
export function extractResult(tape: Tape): string {
  const cells = tape.cells;

  // Find all # positions
  const markerPositions: number[] = [];
  cells.forEach((cell, index) => {
    if (cell === '#') {
      markerPositions.push(index);
    }
  });

  if (markerPositions.length < 2) {
    return '0';
  }

  // Get result between last two markers
  const start = markerPositions[markerPositions.length - 2] + 1;
  const end = markerPositions[markerPositions.length - 1];

  const resultCells = cells.slice(start, end);

  // Filter out non-binary symbols
  const binaryResult = resultCells
    .filter(cell => cell === '0' || cell === '1')
    .join('');

  return binaryResult || '0';
}

/**
 * Converts binary string to decimal
 */
export function binaryToDecimal(binary: string): number {
  if (!binary || binary === '0') return 0;
  return parseInt(binary, 2);
}

/**
 * Validates binary string
 */
export function isValidBinary(str: string): boolean {
  return /^[01]+$/.test(str);
}

/**
 * Clones a machine configuration for history
 */
export function cloneConfig(config: MachineConfig): MachineConfig {
  return {
    tape: {
      cells: [...config.tape.cells],
      headPosition: config.tape.headPosition,
      leftBound: config.tape.leftBound,
      rightBound: config.tape.rightBound,
    },
    currentState: config.currentState,
    stepNumber: config.stepNumber,
    lastTransition: config.lastTransition,
  };
}
