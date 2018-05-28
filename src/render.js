import * as Viz from "viz.js";

export default function render(...roots) {
  const parts = [
    "digraph {",
    "splines = true",
    "rankdir = LR",
    'node [colorscheme = "pastel16"]',
    'edge [colorscheme = "pastel16"]'
  ];

  let nextId = 1;
  const ids = new Map();

  function escapeString(str) {
    return str.replace(/"/g, '\\"');
  }

  const recurse = (node, color, rank, parentId) => {
    let nodeId = ids.get(node);

    if (!nodeId) {
      nodeId = nextId++;

      try {
        ids.set(node, nodeId);
      } catch (e) {}

      switch (typeof node) {
        case "number":
        case "boolean":
          parts.push(`${nodeId} [label=${node} color=${color}]`);
          break;

        case "string":
          parts.push(
            `${nodeId} [label="${escapeString(
              node
            )}" rank=${rank} color=${color}]`
          );
          break;

        default:
          if (Array.isArray(node)) {
            parts.push(`${nodeId} [label="[]" color=${color}]`);
          } else {
            parts.push(`${nodeId} [label="{}" color=${color}]`);
          }

          const keys = Object.keys(node);

          if (keys.length > 0) {
            const keyTableId = nextId++;

            let label = '<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0">';

            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];

              const labelId = nextId++;
              label += `<TR><TD PORT="${labelId}">${escapeString(
                key
              )}</TD></TR>`;

              recurse(node[key], color, rank + 1, `${keyTableId}:${labelId}`);
            }

            label += `</TABLE>> shape=plaintext color="${color}"`;

            parts.push(`${nodeId} -> ${keyTableId} [color=${color}]`);
            parts.push(`${keyTableId} [label=${label} color=${color}]`);
          }
      }
    }

    if (parentId) {
      parts.push(`${parentId} -> ${nodeId} [color=${color}]`);
    }
  };

  let colorNum = 0;

  for (const root of roots) {
    recurse(root, colorNum++ % 6 + 1, 1);
  }

  parts.push("}");

  const dot = parts.join("\n");
  console.log(dot);
  const svg = Viz(dot);
  return svg;
}
