import React from "react";

class GlobalShortcut extends React.Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (getKeyCodeString(e) === this.props.keyCode) {
      this.props.onKey(e);
    }
  };

  render() {
    return null;
  }
}

export default GlobalShortcut;

function getKeyCodeString(e) {
  const parts = [];
  if (e.altKey) {
    parts.push("Alt");
  }
  if (e.ctrlKey) {
    parts.push("Ctrl");
  }

  parts.push(e.key);

  return parts.join("-");
}
