import React from "react";
import "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Controlled as CodeMirror } from "react-codemirror2";

class Editor extends React.Component {
  render() {
    const { code, onChange, renderGraph } = this.props;

    return (
      <CodeMirror
        value={code}
        onBeforeChange={(editor, data, value) => onChange(value)}
        options={{
          mode: "javascript",
          lineNumbers: true,
          extraKeys: {
            "Ctrl-Enter": renderGraph
          }
        }}
      />
    );
  }
}

export default Editor;
