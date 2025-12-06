# Interactive Turing Machine Emulator

An educational, web-based Turing Machine emulator that performs binary arithmetic operations (addition and subtraction) with stunning visualizations. Built to make computation theory concepts visually intuitive and engaging for students.

![Turing Machine Emulator](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)

## Features

### 🎯 Core Functionality

- **Binary Arithmetic Operations**: Supports both addition and subtraction
- **Step-by-Step Execution**: Visualize each state transition
- **Interactive Controls**: Play, pause, step forward/backward through execution
- **Speed Control**: Adjust execution speed from 0.5x to 3x
- **Execution History**: Navigate through previous states

### 🎨 User Interface

- **Infinite Tape Visualization**: Smooth scrolling tape with highlighted cells
- **State Indicator**: Real-time display of current machine state
- **Transition Table Viewer**: Collapsible table showing all state transitions
- **Result Display**: Shows both binary and decimal results
- **Preset Examples**: 6 pre-configured examples to get started quickly

### 🌓 Design & Accessibility

- **Dark/Light Mode**: Fully functional theme switching
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Smooth Animations**: Framer Motion powered transitions
- **Accessible**: Keyboard navigation and ARIA labels
- **Clean UI**: Minimal design with plenty of whitespace

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd turing_visualiser
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Usage Guide

### Basic Workflow

1. **Enter Binary Numbers**: Input two binary numbers in the input fields
2. **Select Operation**: Choose between Addition or Subtraction
3. **Try a Preset**: Or select a preset example from the dropdown
4. **Start Machine**: Click "Start Machine" to initialize
5. **Control Execution**:
   - **Play**: Run the machine automatically
   - **Pause**: Pause execution
   - **Step Forward**: Execute one step at a time
   - **Step Backward**: Navigate to previous states
   - **Speed Control**: Adjust execution speed with the slider
6. **View Results**: See the computation result in both binary and decimal

### Preset Examples

The emulator includes several preset examples:

- **101 + 11** (5 + 3 = 8): Simple addition
- **1010 + 101** (10 + 5 = 15): Addition with different lengths
- **1111 + 1** (15 + 1 = 16): Addition with carry
- **1010 - 101** (10 - 5 = 5): Simple subtraction
- **10000 - 1** (16 - 1 = 15): Subtraction with borrowing
- **11 + 11** (3 + 3 = 6): Equal numbers addition

### Keyboard Shortcuts

- **Tab**: Navigate between controls
- **Enter**: Activate buttons
- **Arrow Keys**: Navigate through transition table

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── TuringMachine.tsx   # Main container component
│   ├── TapeVisualization.tsx
│   ├── ControlPanel.tsx
│   ├── InputSection.tsx
│   ├── StateIndicator.tsx
│   ├── TransitionTable.tsx
│   ├── ResultDisplay.tsx
│   ├── PresetExamples.tsx
│   ├── ThemeToggle.tsx
│   └── ThemeProvider.tsx
├── lib/
│   ├── turingMachine.ts    # Core TM logic
│   ├── transitions.ts      # Transition tables
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript types
└── constants/
    └── presets.ts          # Preset examples
```

## Technical Details

### Turing Machine Implementation

The emulator implements a simplified Turing Machine with:

- **Tape**: Dynamic array that expands as needed
- **States**: String-based state identification
- **Transitions**: Map-based lookup for O(1) performance
- **Symbols**: Support for 0, 1, \_, #, X, C (blank, marker, processed, carry)
- **Movements**: Left (L), Right (R), Stay (S)

### Transition Tables

The transition tables are defined for:

1. **Binary Addition**:

   - Processes numbers from right to left
   - Handles carry propagation
   - Writes result to tape

2. **Binary Subtraction**:
   - Processes numbers from right to left
   - Handles borrowing
   - No negative results (returns 0 for negative)

### State Management

The application uses React hooks for state management:

- `useState` for local component state
- `useCallback` for memoized callbacks
- `useEffect` for side effects and auto-execution
- `useRef` for timers and mutable values

### Performance Optimizations

- **Framer Motion**: GPU-accelerated animations
- **Memoization**: Callbacks memoized to prevent unnecessary re-renders
- **Efficient Rendering**: Only visible tape cells are fully rendered
- **Transition Lookup**: O(1) map-based transition lookup

## Deployment

### Vercel (Recommended)

The easiest way to deploy is using Vercel:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

The application is a standard Next.js app and can be deployed to:

- Netlify
- AWS Amplify
- Cloudflare Pages
- Any platform supporting Next.js

## Educational Value

This tool is designed for:

- **Computer Science Students**: Learn Turing Machine concepts visually
- **Theory of Computation Courses**: Demonstrate state machines
- **Self-Learners**: Interactive exploration of computation theory
- **Educators**: Teaching aid for explaining Turing Machines

### Learning Outcomes

Users will understand:

- How Turing Machines process input
- State transitions and tape manipulation
- Binary arithmetic at a fundamental level
- The relationship between states and computations

## Future Enhancements

Potential features for future versions:

- [ ] Binary multiplication
- [ ] Binary division
- [ ] User-defined transition tables
- [ ] Export/import machine configurations
- [ ] Animation recording/playback
- [ ] Step-by-step tutorial mode
- [ ] More complex operations
- [ ] Tape state snapshots

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons from [Lucide](https://lucide.dev/)

## Contact

For questions, issues, or suggestions, please open an issue on GitHub.

---
