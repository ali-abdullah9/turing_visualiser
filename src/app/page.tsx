import { TuringMachine } from "@/components/TuringMachine";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Theme toggle in top-right corner */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Main content */}
      <main className="min-h-screen py-12">
        <TuringMachine />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-800">
        <p>
          Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion
        </p>
        <p className="mt-2">
          An educational tool for visualizing Turing Machine computations
        </p>
      </footer>
    </div>
  );
}
