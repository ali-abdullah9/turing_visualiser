/**
 * Type definitions for the Turing Machine emulator
 */

// Direction the head can move
export type Direction = 'L' | 'R' | 'S'; // Left, Right, Stay

// Symbol that can be on the tape
export type TapeSymbol = '0' | '1' | '_' | '#' | 'X' | 'C'; // _ is blank, # is marker, X for processed, C for carry

// State of the Turing Machine
export type TMState = string;

// Operation type
export type Operation = 'addition' | 'subtraction';

// Status of the computation
export type ComputationStatus = 'idle' | 'running' | 'paused' | 'success' | 'error';

// Single transition in the transition table
export interface Transition {
  currentState: TMState;
  readSymbol: TapeSymbol;
  writeSymbol: TapeSymbol;
  moveDirection: Direction;
  nextState: TMState;
}

// Transition table: maps (state, symbol) -> Transition
export type TransitionTable = Map<string, Transition>;

// Tape configuration
export interface Tape {
  cells: TapeSymbol[];
  headPosition: number;
  leftBound: number; // For infinite tape simulation
  rightBound: number;
}

// Machine configuration at a point in time
export interface MachineConfig {
  tape: Tape;
  currentState: TMState;
  stepNumber: number;
  lastTransition?: Transition;
}

// History entry for step-by-step execution
export interface HistoryEntry {
  stepNumber: number;
  config: MachineConfig;
  transition?: Transition;
  timestamp: number;
}

// Complete Turing Machine configuration
export interface TuringMachineConfig {
  initialState: TMState;
  acceptState: TMState;
  rejectState: TMState;
  transitions: TransitionTable;
  blankSymbol: TapeSymbol;
}

// Input for the TM
export interface TMInput {
  number1: string; // Binary string
  number2: string; // Binary string
  operation: Operation;
}

// Result of computation
export interface ComputationResult {
  status: ComputationStatus;
  result?: string; // Binary result
  decimalResult?: number;
  totalSteps: number;
  executionTime: number; // in milliseconds
  error?: string;
}

// Preset example
export interface PresetExample {
  id: string;
  label: string;
  description: string;
  number1: string;
  number2: string;
  operation: Operation;
  decimal1: number;
  decimal2: number;
}

// Props for components
export interface TapeVisualizationProps {
  tape: Tape;
  currentState: TMState;
  highlightedCell?: number;
}

export interface ControlPanelProps {
  status: ComputationStatus;
  speed: number;
  currentStep: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSpeedChange: (speed: number) => void;
}

export interface StateIndicatorProps {
  currentState: TMState;
  isAcceptState: boolean;
  isRejectState: boolean;
}

export interface TransitionTableProps {
  transitions: Transition[];
  currentTransition?: Transition;
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface ResultDisplayProps {
  result: ComputationResult;
}

export interface InputSectionProps {
  number1: string;
  number2: string;
  operation: Operation;
  onNumber1Change: (value: string) => void;
  onNumber2Change: (value: string) => void;
  onOperationChange: (op: Operation) => void;
  onStart: () => void;
  onReset: () => void;
  disabled: boolean;
}

export interface PresetExamplesProps {
  onSelectPreset: (preset: PresetExample) => void;
  disabled: boolean;
}
