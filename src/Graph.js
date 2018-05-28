import React from "react";
import render from "./render";
import provide from "immer";

class Graph extends React.Component {
  state = {
    svg: ""
  };

  componentDidMount() {
    // const root = {
    //   name: 'da"n"',
    //   age: 40,
    //   c1: {},
    //   c2: { name: "haha" }
    // };
    // root.c2 = root.c1;
    // root.c3 = ["ha", root.c1, root];

    // const root2 = provide(root, draft => {
    //   draft.c1.name = "dan";
    //   draft.c3.push(root.c1);
    // });

    // const r1 = {
    //   state: "something",
    //   items: [{ name: "abc", value: 1 }, { name: "dec", value: 2 }]
    // };

    // const r2 = provide(r1, draft => {
    //   draft.items[1].name = "foo";
    //   draft.items.push({ name: "heh", value: 4 });
    // });

    const r1 = {
      sub1: { foo: true },
      sub2: {}
    };

    const r2 = {
      ...r1,
      sub2: []
    };

    const svg = render(r1, r2);
    this.setState({ root, svg });
  }

  render() {
    return (
      <div className="Graph">
        {/* <pre>{JSON.stringify(this.state.root, null, 3)}</pre> */}
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
