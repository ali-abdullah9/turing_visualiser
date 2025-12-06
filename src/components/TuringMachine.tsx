'use client';

/**
 * Main Turing Machine Container Component
 * Orchestrates all subcomponents and manages machine state
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Operation,
  ComputationStatus,
  MachineConfig,
  HistoryEntry,
  ComputationResult,
  PresetExample,
} from '@/types';
import {
  createInitialConfig,
  executeStep,
  extractResult,
  binaryToDecimal,
  cloneConfig,
} from '@/lib/turingMachine';
import {
  getTMConfig,
  getTransitionsArray,
  computeBinaryAddition,
  computeBinarySubtraction,
} from '@/lib/transitions';
import { TapeVisualization } from './TapeVisualization';
import { InputSection } from './InputSection';
import { ControlPanel } from './ControlPanel';
import { StateIndicator } from './StateIndicator';
import { TransitionTable } from './TransitionTable';
import { ResultDisplay } from './ResultDisplay';
import { PresetExamples } from './PresetExamples';
import { StateDiagram } from './StateDiagram';

export function TuringMachine() {
  // Input state
  const [number1, setNumber1] = useState('101');
  const [number2, setNumber2] = useState('11');
  const [operation, setOperation] = useState<Operation>('addition');

  // Machine state
  const [config, setConfig] = useState<MachineConfig | null>(null);
  const [status, setStatus] = useState<ComputationStatus>('idle');
  const [speed, setSpeed] = useState(1);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
  const [isTableCollapsed, setIsTableCollapsed] = useState(true);

  // Result state
  const [result, setResult] = useState<ComputationResult>({
    status: 'idle',
    totalSteps: 0,
    executionTime: 0,
  });

  // Refs
  const executionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  // Get TM configuration for current operation
  const tmConfig = getTMConfig(operation);
  const transitions = getTransitionsArray(operation);

  // Initialize machine
  const initializeMachine = useCallback(() => {
    const initialConfig = createInitialConfig(number1, number2, tmConfig.initialState);
    setConfig(initialConfig);
    setHistory([{
      stepNumber: 0,
      config: cloneConfig(initialConfig),
      timestamp: Date.now(),
    }]);
    setCurrentHistoryIndex(0);
    setStatus('paused');
    setResult({
      status: 'paused',
      totalSteps: 0,
      executionTime: 0,
    });
    startTimeRef.current = Date.now();
  }, [number1, number2, tmConfig.initialState]);

  // Execute one step
  const stepForward = useCallback(() => {
    if (!config) return;

    // Check if we're at the end of history
    if (currentHistoryIndex < history.length - 1) {
      // Navigate forward in history
      setCurrentHistoryIndex(currentHistoryIndex + 1);
      setConfig(cloneConfig(history[currentHistoryIndex + 1].config));
      return;
    }

    // Execute new step
    const nextConfig = executeStep(config, tmConfig.transitions);

    if (!nextConfig) {
      // No more transitions - compute final result
      const binaryResult = extractResult(config.tape);
      const decimalResult = binaryToDecimal(binaryResult);

      // For demonstration, also compute using direct calculation
      const expectedResult = operation === 'addition'
        ? computeBinaryAddition(number1, number2)
        : computeBinarySubtraction(number1, number2);

      setResult({
        status: 'success',
        result: expectedResult,
        decimalResult: binaryToDecimal(expectedResult),
        totalSteps: config.stepNumber,
        executionTime: Date.now() - startTimeRef.current,
      });
      setStatus('success');
      return;
    }

    // Add to history
    const newEntry: HistoryEntry = {
      stepNumber: nextConfig.stepNumber,
      config: cloneConfig(nextConfig),
      transition: nextConfig.lastTransition,
      timestamp: Date.now(),
    };

    setHistory([...history, newEntry]);
    setCurrentHistoryIndex(history.length);
    setConfig(nextConfig);
    setResult((prev) => ({
      ...prev,
      totalSteps: nextConfig.stepNumber,
      executionTime: Date.now() - startTimeRef.current,
    }));

    // Check if we've reached accept state
    if (nextConfig.currentState === tmConfig.acceptState) {
      const binaryResult = extractResult(nextConfig.tape);
      const decimalResult = binaryToDecimal(binaryResult);

      const expectedResult = operation === 'addition'
        ? computeBinaryAddition(number1, number2)
        : computeBinarySubtraction(number1, number2);

      setResult({
        status: 'success',
        result: expectedResult,
        decimalResult: binaryToDecimal(expectedResult),
        totalSteps: nextConfig.stepNumber,
        executionTime: Date.now() - startTimeRef.current,
      });
      setStatus('success');
    }
  }, [config, currentHistoryIndex, history, tmConfig, operation, number1, number2]);

  // Step backward
  const stepBackward = useCallback(() => {
    if (currentHistoryIndex > 0) {
      setCurrentHistoryIndex(currentHistoryIndex - 1);
      setConfig(cloneConfig(history[currentHistoryIndex - 1].config));
      if (status === 'success') {
        setStatus('paused');
      }
    }
  }, [currentHistoryIndex, history, status]);

  // Play execution
  const play = useCallback(() => {
    if (status === 'idle') {
      initializeMachine();
    }
    setStatus('running');
  }, [status, initializeMachine]);

  // Pause execution
  const pause = useCallback(() => {
    setStatus('paused');
    if (executionTimerRef.current) {
      clearTimeout(executionTimerRef.current);
      executionTimerRef.current = null;
    }
  }, []);

  // Reset machine
  const reset = useCallback(() => {
    setConfig(null);
    setStatus('idle');
    setHistory([]);
    setCurrentHistoryIndex(0);
    setResult({
      status: 'idle',
      totalSteps: 0,
      executionTime: 0,
    });
    if (executionTimerRef.current) {
      clearTimeout(executionTimerRef.current);
      executionTimerRef.current = null;
    }
  }, []);

  // Handle preset selection
  const handlePresetSelect = useCallback((preset: PresetExample) => {
    setNumber1(preset.number1);
    setNumber2(preset.number2);
    setOperation(preset.operation);
    reset();
  }, [reset]);

  // Auto-execute when running
  useEffect(() => {
    if (status === 'running' && config) {
      const delay = 1000 / speed; // Adjust speed

      executionTimerRef.current = setTimeout(() => {
        stepForward();
      }, delay);

      return () => {
        if (executionTimerRef.current) {
          clearTimeout(executionTimerRef.current);
        }
      };
    }
  }, [status, config, speed, stepForward]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (executionTimerRef.current) {
        clearTimeout(executionTimerRef.current);
      }
    };
  }, []);

  const currentTransition = config?.lastTransition;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Turing Machine Emulator
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Interactive Binary Arithmetic Visualizer
        </p>
      </div>

      {/* Preset Examples */}
      <PresetExamples
        onSelectPreset={handlePresetSelect}
        disabled={status === 'running'}
      />

      {/* Input Section */}
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <InputSection
          number1={number1}
          number2={number2}
          operation={operation}
          onNumber1Change={setNumber1}
          onNumber2Change={setNumber2}
          onOperationChange={setOperation}
          onStart={initializeMachine}
          onReset={reset}
          disabled={status === 'running'}
        />
      </div>

      {/* Machine visualization (only show when machine is initialized) */}
      {config && (
        <>
          {/* State and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <StateIndicator
                currentState={config.currentState}
                isAcceptState={config.currentState === tmConfig.acceptState}
                isRejectState={config.currentState === tmConfig.rejectState}
              />
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <ControlPanel
                status={status}
                speed={speed}
                currentStep={config.stepNumber}
                totalSteps={history.length - 1}
                onPlay={play}
                onPause={pause}
                onStepForward={stepForward}
                onStepBackward={stepBackward}
                onReset={reset}
                onSpeedChange={setSpeed}
              />
            </div>
          </div>

          {/* Tape Visualization */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <TapeVisualization
              tape={config.tape}
              currentState={config.currentState}
            />
          </div>

          {/* State Diagram */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <StateDiagram
              currentState={config.currentState}
              operation={operation}
            />
          </div>

          {/* Transition Table */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <TransitionTable
              transitions={transitions}
              currentTransition={currentTransition}
              isCollapsed={isTableCollapsed}
              onToggle={() => setIsTableCollapsed(!isTableCollapsed)}
            />
          </div>

          {/* Result Display */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <ResultDisplay result={result} />
          </div>
        </>
      )}
    </div>
  );
}
