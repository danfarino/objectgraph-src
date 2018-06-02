export default {
  root: {
    display: "grid",
    gridTemplateColumns: "34em 1fr",
    gridTemplateAreas: '"code svg"',
    position: "fixed",
    top: "0px",
    left: "0px",
    height: "100vh",
    width: "100vw",
    fontFamily: "sans-serif"
  },

  error: { padding: "0.2em", color: "red" },

  loading: {
    fontSize: "4em",
    color: "#ccc",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },

  code: {
    gridArea: "code",
    borderRight: "1px solid #ddd",
    display: "grid",
    gridTemplateRows: "auto auto 1fr auto",

    "& .CodeMirror": { height: "100%", fontSize: "1.3em" }
  },

  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(0, 1fr))"
  },

  svg: {
    gridArea: "svg",
    marginLeft: "2em",
    overflow: "scroll"
  },

  help: {
    backgroundColor: "#f1f1f1",
    borderBottom: "1px solid #ccc",

    "& ul": {
      paddingLeft: "2em",
      paddingBottom: "0.1em"
    },

    "& li": { marginBottom: "0.5em" },

    "& .title": { fontWeight: "bold", paddingLeft: "1em", paddingTop: "1em" },

    "& .by": {
      marginBottom: "0.5em",
      paddingLeft: "1.3em",
      paddingTop: "0.3em",
      fontSize: "0.8em"
    }
  }
};
