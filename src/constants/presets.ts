/**
 * Preset examples for the Turing Machine
 */

import { PresetExample } from '@/types';

export const PRESET_EXAMPLES: PresetExample[] = [
  {
    id: 'add-1',
    label: '101 + 11 (5 + 3)',
    description: 'Simple addition: 5 + 3 = 8',
    number1: '101',
    number2: '11',
    operation: 'addition',
    decimal1: 5,
    decimal2: 3,
  },
  {
    id: 'add-2',
    label: '1010 + 101 (10 + 5)',
    description: 'Addition with different lengths: 10 + 5 = 15',
    number1: '1010',
    number2: '101',
    operation: 'addition',
    decimal1: 10,
    decimal2: 5,
  },
  {
    id: 'add-3',
    label: '1111 + 1 (15 + 1)',
    description: 'Addition with carry: 15 + 1 = 16',
    number1: '1111',
    number2: '1',
    operation: 'addition',
    decimal1: 15,
    decimal2: 1,
  },
  {
    id: 'sub-1',
    label: '1010 - 101 (10 - 5)',
    description: 'Simple subtraction: 10 - 5 = 5',
    number1: '1010',
    number2: '101',
    operation: 'subtraction',
    decimal1: 10,
    decimal2: 5,
  },
  {
    id: 'sub-2',
    label: '10000 - 1 (16 - 1)',
    description: 'Subtraction with borrowing: 16 - 1 = 15',
    number1: '10000',
    number2: '1',
    operation: 'subtraction',
    decimal1: 16,
    decimal2: 1,
  },
  {
    id: 'add-4',
    label: '11 + 11 (3 + 3)',
    description: 'Equal numbers addition: 3 + 3 = 6',
    number1: '11',
    number2: '11',
    operation: 'addition',
    decimal1: 3,
    decimal2: 3,
  },
];
