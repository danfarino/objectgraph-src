import * as Viz from "viz.js";

export default function render(...roots) {
  const parts = [
    "digraph {",
    "splines = true",
    "rankdir = LR",
    'node [colorscheme = "pastel16" fontname = courier]',
    'edge [colorscheme = "pastel16"]'
  ];

  let nextId = 1;
  const ids = new WeakMap(); // switch to Map to see the rendering share values

  function escapeString(str) {
    return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  }

  const recurse = (node, color, parentId) => {
    let nodeId = ids.get(node);

    if (!nodeId) {
      nodeId = nextId++;

      try {
        ids.set(node, nodeId);
      } catch (e) {}

      let nodeType = typeof node;
      if (node === null) {
        nodeType = "null";
      }

      switch (nodeType) {
        case "null":
        case "number":
        case "undefined":
        case "boolean":
        case "string":
          parts.push(
            `${nodeId} [label=${escapeString(node)} color="#cccccc" shape=rect]`
          );
          break;

        default:
          const keys = Object.keys(node);

          if (keys.length > 0) {
            let label =
              '<<TABLE BORDER="0" CELLPADDING="5" CELLBORDER="1" CELLSPACING="0">';

            for (let i = 0; i < keys.length; i++) {
              const key = keys[i];

              const labelId = nextId++;
              label += "<TR>";

              if (i === 0) {
                label += `<TD ROWSPAN="${keys.length}" BGCOLOR="#eeeeee"><B>${
                  Array.isArray(node) ? "[]" : "{}"
                }</B></TD>`;
              }

              label += `<TD BGCOLOR="#eeeeee"><B>${escapeString(
                key
              )}</B></TD><TD PORT="${labelId}">`;

              const value = node[key];
              let isValueType = false;

              if (
                value === null ||
                typeof value === "undefined" ||
                typeof value === "number" ||
                typeof value === "boolean"
              ) {
                isValueType = true;
                label += String(value);
              }

              if (typeof value === "string") {
                isValueType = true;
                label += escapeString(value);
              }

              label += "</TD></TR>";

              if (!isValueType) {
                recurse(value, color, `${nodeId}:${labelId}`);
              }
            }

            label += `</TABLE>> shape=plaintext`;

            parts.push(`${nodeId} [label=${label} color=${color}]`);
          } else {
            parts.push(
              `${nodeId} [label=<<B>${
                Array.isArray(node) ? "[]" : "{}"
              }</B>> color=${color} shape=rect fillcolor="#eeeeee" style=filled]`
            );
          }
      }
    }

    if (parentId) {
      parts.push(`${parentId} -> ${nodeId} [color=${color}]`);
    }

    return nodeId;
  };

  let colorNum = 0;

  let index = 0;
  const rootNodeIds = [];
  for (const root of roots) {
    const rootNodeId = nextId++;
    rootNodeIds.push(rootNodeId);

    parts.push(
      `${rootNodeId} [label=<<B>${++index}</B>> shape=cds color=white fontcolor=white fillcolor="#cccccc" style=filled]`
    );
    const nodeId = recurse(root, colorNum++ % 6 + 1);
    parts.push(
      `${rootNodeId} -> ${nodeId} [style=dashed color="#cccccc" arrowhead=none]`
    );
  }

  parts.push(`{ rank=same; ${rootNodeIds.join("->")} [style=invis] }`);

  parts.push("}");

  const dot = parts.join("\n");
  const svg = Viz(dot);
  return svg;
}
