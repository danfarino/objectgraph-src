import React from "react";
import injectStyles from "react-jss";

const styles = {
  root: {
    backgroundColor: "#f1f1f1",
    borderBottom: "1px solid #ccc",
    padding: "1.2em",

    "& a:link": {
      textDecoration: "none",
      color: "rgb(0, 0, 238)"
    },

    "& a:hover": {
      textDecoration: "underline"
    },

    "& a:visited": {
      color: "rgb(0, 0, 238)"
    }
  },

  ul: {
    marginTop: "1.2em",
    marginBottom: "0.7em",
    paddingLeft: "1em",

    "& li:not(:last-child)": {
      marginBottom: "1em"
    }
  },

  title: {
    fontWeight: "bold",
    fontSize: "1.1em"
  },

  by: {
    fontSize: "0.8em",
    marginTop: "0.3em",
    marginLeft: "0.1em"
  }
};

function Help(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.title}>JavaScript Object Reference Graph</div>
      <div className={classes.by}>by Dan Farino, 2018</div>
      <ul className={classes.ul}>
        <li>
          Call the &ldquo;show&rdquo; function with any objects/values that
          you&rsquo;d like to graph.
        </li>
        <li>
          If you&rsquo;d like to use{" "}
          <a
            href="https://github.com/mweststrate/immer#example"
            target="_blank"
            rel="noopener noreferrer"
          >
            immer
          </a>, it&rsquo;s in scope as &ldquo;produce&rdquo;.
        </li>
      </ul>
    </div>
  );
}

export default injectStyles(styles)(Help);
