import React from "react";
import injectStyles from "react-jss";

const styles = {
  root: {
    backgroundColor: "#f1f1f1",
    borderBottom: "1px solid #ccc",
    padding: "1.2em",

    "& a:link": {
      textDecoration: "none",
      color: "rgb(0, 0, 238)",
    },

    "& a:hover": {
      textDecoration: "underline",
    },

    "& a:visited": {
      color: "rgb(0, 0, 238)",
    },
  },

  ul: {
    marginTop: "1.2em",
    marginBottom: "0.7em",
    paddingLeft: "1em",

    "& li:not(:last-child)": {
      marginBottom: "0.7em",
    },
  },

  title: {
    fontWeight: "bold",
    fontSize: "1.1em",
  },

  by: {
    fontSize: "0.8em",
    marginTop: "0.3em",
    marginLeft: "0.1em",
  },
};

function Help(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.title}>JavaScript Object Reference Graph</div>
      <div className={classes.by}>by Dan Farino, 2018-2020</div>
      <ul className={classes.ul}>
        <li>
          Call the &ldquo;show&rdquo; function with any objects/values that
          you&rsquo;d like to graph.
        </li>
        <li>
          If you&rsquo;d like to use{" "}
          <a
            href="https://immerjs.github.io/immer/docs/introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            immer 8.0
          </a>
          , it&rsquo;s in scope as &ldquo;produce&rdquo; (
          <a href="?code=MYewdgzgLgBCBGArAjDAvDA3gKBjMAhgLYCmAXDAOQAiBYlANLvgK5HwkBOEFA2ssgYxkAZiHIA7AF1sAXwDc2bBAAWIAO4AKBCgCUi7KEiwdAJnQwADpxAATFsBLakgmLfQA+LM1sA6QqQWlABSICr0irL6Sqoazoim0Ybg0HBIIhbWdg5OZkLuaF44eH5gbBzcvAAMUhYALKaKJf7lXBC+liyqmshVVdFRBrFaOiLRQA">
            example
          </a>
          ).
        </li>
        <li>
          <a
            href="https://github.com/danfarino/objectgraph-src"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source code on GitHub
          </a>
        </li>
        <li>
          <span>
            To keep the graph simple, strings are rendered as value types. For a
            more accurate (and more cluttered) graph, you can choose to render
            strings as reference types.
            <br />
          </span>
          <em>
            Note: the rendering assumes all identical strings are shared. This
            may not be true in all cases (e.g. when you are programmatically
            generating strings).
          </em>
        </li>
      </ul>
    </div>
  );
}

export default injectStyles(styles)(Help);
