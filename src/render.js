import * as Viz from "viz.js";

export default function render(root) {
  const parts = [
    "digraph {",
    "splines = true",
    "rank = max",
    'edge [color="#999999"]'
  ];

  let nextId = 1;
  const ids = new WeakMap();

  const recurse = (node, parentId) => {
    let nodeId = ids.get(node);
    if (!nodeId) {
      nodeId = nextId++;

      let label;
      switch (typeof node) {
        case "number":
          label = node;
          break;
        case "string":
          label = node.replace(/"/g, '\\"');
          console.log(label);
          break;
        default:
          if (Array.isArray(node)) {
            label = "[]";
          } else {
            label = "{}";
          }
      }

      parts.push(`node_${nodeId} [label="${label}"]`);

      try {
        ids.set(node, nodeId);
      } catch (e) {}

      if (Array.isArray(node)) {
        for (const item of node) {
          recurse(item, nodeId);
        }
      } else if (typeof node === "object") {
        for (const key in node) {
          recurse(node[key], nodeId);
        }
      }
    }

    if (parentId) {
      parts.push(`node_${parentId} -> node_${nodeId}`);
    }
  };

  recurse(root);

  parts.push("}");

  const dot = parts.join("\n");
  const svg = Viz(dot);
  return svg;
}
