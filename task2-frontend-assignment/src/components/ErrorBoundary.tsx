import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { FiAlertCircle } from 'react-icons/fi';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component to catch and handle JavaScript errors in child components
 * Prevents the entire application from crashing when an error occurs
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can log the error to an error reporting service here
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-red-50 rounded-lg border border-red-200 text-center">
          <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-red-700 mb-2">Something went wrong</h2>
          <p className="text-gray-700 mb-4">
            An error occurred while rendering this component.
          </p>
          <details className="text-sm text-left bg-white p-3 rounded border">
            <summary className="cursor-pointer mb-2 font-medium">Error details</summary>
            <p className="font-mono text-xs whitespace-pre-wrap text-red-600">
              {this.state.error?.toString() || 'Unknown error'}
            </p>
          </details>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
