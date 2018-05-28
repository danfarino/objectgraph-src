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

      switch (typeof node) {
        case "number":
          parts.push(`${nodeId} [label=${node}]`);
          break;

        case "string":
          parts.push(`${nodeId} [label="${escapeString(node)}"]`);
          break;

        default:
          if (Array.isArray(node)) {
            parts.push(`${nodeId} [label="[]"]`);

            for (const item of node) {
              recurse(item, nodeId);
            }
          } else {
            parts.push(`${nodeId} [label="{}"]`);

            const keys = Object.keys(node);

            if (keys.length > 0) {
              const keyTableId = nextId++;

              let label =
                '<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0"><TR>';

              for (let i = 0; i < keys.length; i++) {
                const key = keys[i];

                const labelId = nextId++;
                label += `<TD PORT="${labelId}">${escapeString(key)}</TD>`;

                recurse(node[key], `${keyTableId}:${labelId}`);
              }

              label += "</TR></TABLE>> shape=plaintext";

              parts.push(`${nodeId} -> ${keyTableId}`);
              parts.push(`${keyTableId} [label=${label}]`);
            }
          }
      }
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
