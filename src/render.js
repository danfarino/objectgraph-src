import * as Viz from "viz.js";

export default function render(root) {
  const parts = [
    "digraph {",
    "splines = true",
    "rank = sink",
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

            label = "{";
            const keys = Object.keys(node);

            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];

              const labelId = nextId++;
              label += `<${labelId}> ${escapeString(key)}`;
              if (i < keys.length - 1) {
                label += "|";
              }

              recurse(node[key], `${nodeId}:${labelId}`);
            }

            label += "}";
            console.log("label", label);

            parts.push(`${nodeId} [label="${label}" shape=record]`);
          }
      }

      parts.push(`${nodeId} [label="${label}"]`);
    }

    if (parentId) {
      parts.push(`${parentId} -> ${nodeId}`);
    }
  };

  recurse(root);

  parts.push("}");

  const dot = parts.join("\n");
  console.log(dot);
  const svg = Viz(dot);
  return svg;
}
