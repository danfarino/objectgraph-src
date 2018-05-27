import React from "react";
import render from "./render";

class Graph extends React.Component {
  state = {
    svg: ""
  };

  componentDidMount() {
    const root = {
      name: 'da"n"',
      age: 40,
      c1: {}
    };
    root.c2 = root.c1;
    root.c3 = ["ha", root.c1];

    const svg = render(root);
    this.setState({ root, svg });
  }

  render() {
    return (
      <div className="Graph">
        <pre>{JSON.stringify(this.state.root, null, 3)}</pre>
        <div
          className="main-rendering"
          onClick={this.clicked}
          dangerouslySetInnerHTML={{ __html: this.state.svg }}
        />
      </div>
    );
  }
}

export default Graph;
