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
    code: initialCode,
    rendering: false,
    helpVisible: false
  };

  componentDidMount() {
    this.renderGraph();
  }

  renderGraph = async () => {
    if (this.state.rendering) {
      return;
    }

    try {
      this.setState({ rendering: true });

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

      const svg = await render(...toShow);
      this.setState({ svg, error: null, rendering: false });
    } catch (e) {
      this.setState({ error: String(e), rendering: false });
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

  toggleHelp = () => {
    this.setState(prev => ({ helpVisible: !prev.helpVisible }));
  };

  render() {
    const { svg, code, error, rendering, helpVisible } = this.state;

    return (
      <div className="Graph">
        <div className="svg" dangerouslySetInnerHTML={{ __html: svg }} />
        <div className="code">
          <div className="buttons">
            <button onClick={this.renderGraph} disabled={rendering}>
              Render
            </button>
            <button onClick={this.getLink}>Get Link</button>
            <button onClick={this.toggleHelp}>
              {helpVisible ? "Hide Help" : "Show Help"}
            </button>
          </div>
          <div className="help">
            {helpVisible && (
              <div>
                <div className="title">JavaScript Object Reference Graph</div>
                <div className="by">by Dan Farino, 2018</div>
                <ul>
                  <li>
                    Call the "show" function with any objects/values that you'd
                    like to graph.
                  </li>
                  <li>
                    Hit Ctrl-Enter to render while the cursor is focused in the
                    code editor.
                  </li>
                  <li>
                    If you'd like to use{" "}
                    <a
                      href="https://github.com/mweststrate/immer"
                      target="_blank"
                    >
                      immer
                    </a>, it's in scope as "produce".
                  </li>
                </ul>
              </div>
            )}
          </div>
          <CodeMirror
            value={code}
            onBeforeChange={(editor, data, value) =>
              this.setState({ code: value })
            }
            options={{
              mode: "javascript",
              lineNumbers: true,
              extraKeys: {
                "Ctrl-Enter": this.renderGraph
              }
            }}
          />
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }
}

export default Graph;
