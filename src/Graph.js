import React from "react";
import render from "./render";
import immerProduce from "immer";
import "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import { Controlled as CodeMirror } from "react-codemirror2";
import exampleCode from "./exampleCode";
import "./Graph.css";

class Graph extends React.Component {
  state = {
    svg: "",
    error: null,
    code: exampleCode.replace(/(^\s+|\s+$)/g, "")
  };

  componentDidMount() {
    this.renderGraph();
  }

  renderGraph = () => {
    try {
      let toShow = [];
      function show(...args) {
        for (const obj of args) {
          toShow.push(obj);
        }
      }

      // we need to capture this function here otherwise eval can't see it
      // (probably has something to do with webpack)
      function produce(...args) {
        return immerProduce(...args);
      }

      eval(this.state.code);

      const svg = render(...toShow);
      this.setState({ root, svg, error: null });
    } catch (e) {
      this.setState({ error: String(e) });
    }
  };

  render() {
    const { svg, code, error } = this.state;

    return (
      <div className="Graph">
        <div className="svg" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="code">
          <button onClick={this.renderGraph}>Render</button>
          <CodeMirror
            value={code}
            onBeforeChange={(editor, data, value) =>
              this.setState({ code: value })
            }
            options={{ mode: "javascript", lineNumbers: true }}
          />
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }
}

export default Graph;
