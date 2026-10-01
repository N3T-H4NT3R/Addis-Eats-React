import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error("Error:", error);
    console.error("Error info:", info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>
            Something went wrong on {this.props.pageName}.
          </h2>

          <button
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;