import React from "react";
import * as monaco from "monaco-editor";

window.MonacoEnvironment = {
  getWorkerUrl: function(moduleId, label) {
    if (label === "typescript" || label === "javascript") {
      return "ts.worker.bundle.js";
    }
    return "editor.worker.bundle.js";
  }
};

class Editor extends React.Component {
  editorRef = React.createRef();

  componentDidUpdate(prevProps) {
    if (this.props.code !== this.editorCode) {
      console.log("update");
      this.editor.updateOptions({
        value: this.props.code
      });
    }
  }

  componentDidMount() {
    this.editor = monaco.editor.create(this.editorRef.current, {
      language: "javascript",
      value: this.props.code,
      scrollBeyondLastLine: false,
      fontSize: 18,
      minimap: {
        enabled: false
      }
    });

    this.editor.focus();

    this.editorCode = this.editor.getValue();

    this.editor.onDidChangeModelContent(() => {
      this.editorCode = this.editor.getValue();
      this.props.onChange(this.editorCode);
    });

    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.editor.layout();
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);

    this.editor.dispose();
  }

  render() {
    return <div style={{ height: "100%" }} ref={this.editorRef} />;
  }
}

export default Editor;
