import React from "react";
import render from "./render";
import immerProduce from "immer";
import exampleCode from "./exampleCode";
import LZString from "lz-string";
import injectStyles from "react-jss";
import styles from "./App-css";
import Editor from "./Editor";
import Help from "./Help";
import GlobalShortcut from "./GlobalShortcut";

const urlParams = new URLSearchParams(window.location.search);
let initialCode;
if (urlParams.get("code")) {
  initialCode = LZString.decompressFromEncodedURIComponent(
    urlParams.get("code")
  );
} else {
  initialCode = exampleCode.replace(/(^\s+)/g, "");
}

class App extends React.Component {
  state = {
    svg: null,
    error: null,
    code: initialCode,
    rendering: false,
    helpVisible: false,
    stringsAsValues: true,
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

      const { stringsAsValues } = this.state;

      let toShow = [];

      // The "show" function will be called by the evaled code below.
      // eslint-disable-next-line no-unused-vars
      function show(...args) {
        for (const obj of args) {
          toShow.push(obj);
        }
      }

      // We need to capture this function here otherwise eval can't see it
      // (probably has something to do with webpack)
      // eslint-disable-next-line no-unused-vars
      function produce(...args) {
        return immerProduce(...args);
      }

      // eslint-disable-next-line no-eval
      eval(this.state.code);

      const svg = await render({ stringsAsValues }, ...toShow);
      this.setState({ svg, error: null, rendering: false });
    } catch (e) {
      this.setState({ error: String(e), rendering: false });
    }
  };

  saveToUrl = () => {
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
    this.setState((prev) => ({ helpVisible: !prev.helpVisible }));
  };

  handleStringDisplayChange = (e) => {
    this.setState(
      { stringsAsValues: e.target.value === "true" },
      this.renderGraph
    );
  };

  render() {
    const { classes } = this.props;
    const {
      svg,
      code,
      error,
      rendering,
      helpVisible,
      stringsAsValues,
    } = this.state;

    return (
      <div className={classes.root}>
        <GlobalShortcut keyCode="Alt-Enter" onKey={this.renderGraph} />
        <GlobalShortcut keyCode="Alt-s" onKey={this.saveToUrl} />

        <div className={classes.code}>
          <div className={classes.buttons}>
            <button onClick={this.renderGraph} disabled={rendering}>
              Render (Alt-Enter)
            </button>
            <button onClick={this.saveToUrl}>Save to URL (Alt-s)</button>
            <button onClick={this.toggleHelp}>
              {helpVisible ? "Hide Help" : "Show Help"}
            </button>
            <select
              value={stringsAsValues}
              onChange={this.handleStringDisplayChange}
              disabled={rendering}
            >
              <option value={true}>Strings as values</option>
              <option value={false}>Strings as refs</option>
            </select>
          </div>
          <div className={classes.help}>{helpVisible && <Help />}</div>
          <div className={classes.editor}>
            <Editor code={code} onChange={(code) => this.setState({ code })} />
          </div>
          {error && <div className={classes.error}>{error}</div>}
        </div>

        {svg === null ? (
          <div className={classes.loading}>Loading...</div>
        ) : (
          <div
            className={classes.svg}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </div>
    );
  }
}

export default injectStyles(styles)(App);
