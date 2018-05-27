import * as Viz from "viz.js";

export default function render(root) {
  const parts = [
    "digraph {",
    "splines = true",
    'rank = "sink"',
    'edge [color="#999999"]'
  ];

  let nextId = 1;
  const ids = new WeakMap();

  function escapeString(str) {
    return str.replace(/"/g, '\\"');
  }

  const recurse = (node, parentId) => {
    let nodeId = ids.get(node);
    if (!nodeId) {
      nodeId = nextId++;

      try {
        ids.set(node, nodeId);
      } catch (e) {}

      let label;

      switch (typeof node) {
        case "number":
          label = node;
          break;
        case "string":
          label = escapeString(node);
          console.log(label);
          break;
        default:
          if (Array.isArray(node)) {
            // array:

            label = "[]";
            for (const item of node) {
              recurse(item, nodeId);
            }
          } else {
            // object:

            label = "{}";
            for (const key in node) {
              const keyNodeId = nextId++;
              const label = escapeString(key);

              parts.push(
                `node_${keyNodeId} [label="${label}" shape="invhouse"]`
              );
              parts.push(`node_${nodeId} -> node_${keyNodeId}`);

              recurse(node[key], keyNodeId);
            }
          }
      }

      parts.push(`node_${nodeId} [label="${label}"]`);
    }

    if (parentId) {
      parts.push(`node_${parentId} -> node_${nodeId}`);
    }
  };

  recurse(root);

  parts.push("}");

  const dot = parts.join("\n");
  console.log(dot);
  const svg = Viz(dot);
  return svg;
}
