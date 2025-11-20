import React, { ErrorInfo, ReactNode } from "react";
import { Icons } from "./Icons";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  constructor(props: Props) {
    super(props);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 border border-status-error bg-status-error/5 text-center">
          <Icons.Alert className="text-status-error w-16 h-16 mb-4" />
          <h2 className="text-2xl font-bold text-status-error uppercase tracking-widest mb-2">System Failure</h2>
          <p className="text-secondary mb-6 max-w-md font-mono text-sm">
            A critical error has occurred within the dashboard rendering pipeline. 
            {this.state.error?.message}
          </p>
          <button
            className="px-6 py-2 bg-status-error text-white font-bold uppercase hover:opacity-90"
            onClick={() => window.location.reload()}
          >
            Reboot System
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}