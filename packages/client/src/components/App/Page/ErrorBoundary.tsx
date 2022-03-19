import React from "react";

interface State {
    error: string | null;
}

export default class ErrorBoundary extends React.Component<{}, State> {
    constructor() {
        super(undefined);
        this.state = { error: null };
      }
    
      static getDerivedStateFromError(error: Error): State {
        // Update state so the next render will show the fallback UI.
        return { error: error.message };
      }
    
      componentDidCatch(error, errorInfo): void {
        console.error(error, errorInfo);
      }
    
      render(): React.ReactNode {
        if (this.state.error) {
          // You can render any custom fallback UI
          return <>
            <h1>Something went wrong.</h1>
            <h2>Error: {this.state.error}</h2>
          </>
        }
    
        return this.props.children; 
      }
}