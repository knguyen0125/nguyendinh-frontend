const text = {
  caption: {
    color: "gray.5",
  },
  heading: {
    fontFamily: "heading",
  },
  styled: {
    variant: "text.heading",
    fontFamily: "styled",
    fontWeight: "normal",
    lineHeight: "styled",
  },
  styledH1: {
    variant: "text.styled",
    fontSize: [6, 9, 10, 11],
  },
  styledH2: {
    variant: "text.styled",
    fontSize: [5, 8, 9, 10],
  },
  styledH3: {
    variant: "text.styled",
    fontSize: [4, 7, 8, 9],
  },
  styledH4: {
    variant: "text.styled",
    fontSize: [3, 6, 7, 8],
  },
};

const buttons = {
  simple: {
    py: 2,
    px: 3,
    cursor: "pointer",
    fontSize: "100%",
    lineHeight: "inherit",
    backgroundColor: "primary",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primaryHover",
    },
  },
  pill: {
    py: 2,
    px: 3,
    cursor: "pointer",
    fontSize: "100%",
    lineHeight: "inherit",
    backgroundColor: "primary",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "full",
    "&:hover": {
      backgroundColor: "primaryHover",
    },
  },
  outline: {
    py: 2,
    px: 3,
    cursor: "pointer",
    fontSize: "100%",
    lineHeight: "inherit",
    backgroundColor: "transparent",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "primary",
    color: "primary",
    fontWeight: "semibold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primary",
      color: "white",
      borderColor: "transparent",
    },
  },
  bordered: {
    py: 2,
    px: 3,
    cursor: "pointer",
    fontSize: "100%",
    lineHeight: "inherit",
    backgroundColor: "primary",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "primaryHover",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    "&:hover": {
      backgroundColor: "primaryHover",
    },
  },
  disabled: {
    py: 2,
    px: 3,
    cursor: "not-allowed",
    fontSize: "100%",
    lineHeight: "inherit",
    backgroundColor: "primary",
    border: "none",
    opacity: 0.5,
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
  },
  "3D": {
    py: 2,
    px: 3,
    cursor: "pointer",
    fontSize: "100%",
    lineHeight: "inherit",
    backgroundColor: "primary",
    border: "none",
    borderBottomWidth: "4px",
    borderBottomStyle: "solid",
    borderBottomColor: "primaryHover",
    color: "white",
    fontWeight: "bold",
    borderRadius: "default",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)",
    },
  },
  elevated: {
    py: 2,
    px: 3,
    cursor: "pointer",
    fontSize: "100%",
    lineHeight: "inherit",
    backgroundColor: "white",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "gray.4",
    color: "text",
    fontWeight: "bold",
    borderRadius: "default",
    boxShadow: "default",
    "&:hover": {
      backgroundColor: "gray.1",
    },
  },
  icon: {
    p: 2,
    "&:focus": {
      outline: "none",
    },
  },
  primary: {
    py: 2,
    px: 3,
    backgroundColor: "red.6",
    fontFamily: "heading",
    fontSize: "2",
    "&:hover": {
      backgroundColor: "red.7",
    },
  },
};

const inputs = {
  shadow: {
    py: 2,
    px: 3,
    fontSize: "100%",
    borderRadius: "default",
    appearance: "none",
    lineHeight: "tight",
    border: "none",
    color: "gray.7",
    boxShadow: "default",
    "&:focus": {
      outline: "none",
      boxShadow: "outline",
    },
  },
  inline: {
    py: 2,
    px: 3,
    fontSize: "100%",
    borderRadius: "default",
    appearance: "none",
    lineHeight: "tight",
    backgroundColor: "gray.2",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "gray.2",
    color: "gray.7",
    "&:focus": {
      outline: "none",
      borderColor: "primary",
      backgroundColor: "white",
    },
  },
  underline: {
    py: 2,
    px: 3,
    fontSize: "100%",
    borderRadius: "0px",
    appearance: "none",
    lineHeight: "tight",
    backgroundColor: "transparent",
    border: "none",
    borderBottomWidth: "2px",
    borderBottomStyle: "solid",
    borderBottomColor: "primary",
    color: "gray.7",
    "&:focus": {
      outline: "none",
      borderColor: "primary",
      backgroundColor: "white",
    },
  },
};
module.exports = {
  text,
  buttons,
  inputs,
};
