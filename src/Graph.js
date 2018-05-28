import React from "react";
import render from "./render";
import produce from "immer";

class Graph extends React.Component {
  state = {
    svg: ""
  };

  componentDidMount() {
    // example data. Change this to experiment:

    const r1 = {
      sub1: {
        sub2: [5, 6, 7],
        other: {}
      },
      name: "woot"
    };

    const r2 = produce(r1, d => {
      d.sub1.abc = false;
      d.sub1.name = r1.name;
    });

    const r3 = produce(r2, d => {
      d.sub1.sub2.pop();
    });

    const svg = render(r1, r2, r3);
    this.setState({ root, svg });
  }

  render() {
    return (
      <div className="Graph">
        <div dangerouslySetInnerHTML={{ __html: this.state.svg }} />
      </div>
    );
  }
}

export default Graph;
