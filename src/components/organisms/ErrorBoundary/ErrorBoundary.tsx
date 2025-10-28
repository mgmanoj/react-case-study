/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors anywhere in the child component tree,
 * logs errors, and displays a fallback UI instead of crashing the app.
 */

import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary Class Component
 * 
 * Note: Must be a class component because React Error Boundaries
 * require getDerivedStateFromError and componentDidCatch lifecycle methods
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Update state when error is thrown
   * This is called during the render phase
   */
  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Log error details
   * This is called during the commit phase
   */
  override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log to console
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, you would send this to an error tracking service
    // Example: Sentry, LogRocket, Rollbar, etc.
    // if (process.env.NODE_ENV === 'production') {
    //   Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } });
    // }
  }

  /**
   * Reset error state and try to recover
   */
  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  /**
   * Navigate to home page
   */
  handleGoHome = (): void => {
    window.location.href = '/';
  };

  /**
   * Reload the page
   */
  handleReload = (): void => {
    window.location.reload();
  };

  override render(): ReactNode {
    const { hasError } = this.state;
    const { children, fallback } = this.props;

    if (hasError) {
      // Use custom fallback if provided
      if (fallback) {
        return fallback;
      }

      // Default error UI

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            {/* Error Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {/* Icon and Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Oops! Something went wrong
                  </h1>
                  <p className="text-gray-600 mt-1">
                    We're sorry for the inconvenience. The application encountered an unexpected error.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={this.handleGoHome}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go to Home
                </button>
                <button
                  onClick={this.handleReload}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reload Page
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  If the problem persists, please try:
                </p>
                <ul className="mt-2 text-sm text-gray-600 list-disc list-inside space-y-1">
                  <li>Clearing your browser cache</li>
                  <li>Disabling browser extensions</li>
                  <li>Using a different browser</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center text-sm text-gray-500">
              Error ID: {Date.now()}
            </div>
          </div>
        </div>
      );
    }

    // No error, render children normally
    return children;
  }
}

export default ErrorBoundary;