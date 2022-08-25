import React from 'react';
import Figure from "react-bootstrap/Figure";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  // componentDidCatch(error, errorInfo) {
  // You can also log the error to an error reporting service
  // logErrorToMyService(error, errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <Figure.Image
        width={512}
        src={process.env.PUBLIC_URL + "/img/default-image.png"}
      />;
    }

    return this.props.children;
  }
}
