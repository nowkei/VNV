import type { ReactNode } from 'react';
import React from 'react';

class ErrorBoundary extends React.Component<
  { children?: ReactNode },
  { hasError?: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  // unused-imports/no-unused-vars
  componentDidCatch() {
    // You can use your own error logging service here
    this.setState({ hasError: true });
  }

  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h2>Oops, there is an error!</h2>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again?
          </button>
        </div>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
