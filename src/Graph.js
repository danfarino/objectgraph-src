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
import LZString from "lz-string";

const urlParams = new URLSearchParams(window.location.search);
let initialCode;
if (urlParams.get("code")) {
  initialCode = LZString.decompressFromEncodedURIComponent(
    urlParams.get("code")
  );
} else {
  initialCode = exampleCode.replace(/(^\s+|\s+$)/g, "");
}

class Graph extends React.Component {
  state = {
    svg: "",
    error: null,
    code: initialCode
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

  getLink = () => {
    const compressedCode = LZString.compressToEncodedURIComponent(
      this.state.code
    );

    window.history.replaceState(
      null,
      null,
      window.location.origin +
        window.location.pathname +
        "?code=" +
        compressedCode
    );
  };

  render() {
    const { svg, code, error } = this.state;

    return (
      <div className="Graph">
        <div className="svg" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="code">
          <div className="buttons">
            <button onClick={this.renderGraph}>Render</button>
            <button onClick={this.getLink}>Get Link</button>
          </div>
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
