export default {
  root: {
    display: "grid",
    gridTemplateColumns: "6fr 10fr",
    gridTemplateAreas: '"code svg"',
    position: "fixed",
    top: "0px",
    left: "0px",
    height: "100vh",
    width: "100vw",
    fontFamily: "sans-serif"
  },

  error: {
    padding: "0.2em",
    color: "red",
    zIndex: 1,
    backgroundColor: "white",
    borderTop: "1px solid #ddd"
  },

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
    minHeight: 0,
    minWidth: 0,
    maxWidth: "100%"
  },

  editor: {
    marginTop: "0.5em",
    minHeight: 0,
    minWidth: 0
  },

  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(8em, auto))"
  },

  svg: {
    gridArea: "svg",
    marginLeft: "2em",
    overflow: "scroll"
  }
};
