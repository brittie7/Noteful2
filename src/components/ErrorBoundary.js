import React from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static defaultProps = {
    children: [],
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>Could not display requested data</h2>;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  chilren: PropTypes.array,
};
