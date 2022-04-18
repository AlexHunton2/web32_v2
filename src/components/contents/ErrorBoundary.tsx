import React from 'react';

interface ErrorBoundaryState {
  hasError : boolean
}

interface ErrorBoundaryProps {}

class ErrorBoundary extends React.Component<ErrorBoundaryProps,ErrorBoundaryState> {
  constructor(props : any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error : any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error : any, errorInfo : any) {
    // You can also log the error to an error reporting service
    console.log(error)
    console.log(errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p>Something went wrong.</p>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;