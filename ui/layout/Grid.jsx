import React from "react";
const Box = (
  {
    height = false,
    justifyContent = "center",
    alignItems = "center",
    flexDirection = "row",
    backgroundColor = false,
    padding = 0,
    paddingLeft = 0,
    paddingRight = 0,
    paddingTop = 0,
    paddingBottom = 0,

    marginBottom = 0,
    children,
    position,
    flexBasis = "100%",
    className = null,
    tabIndex = "0",
    onKeyDown = () => {},
    ...restOfProps
  } = {}
) => {
  return (
    <div
      className={className}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      style={{
        ...restOfProps,
        display: "flex",
        flexWrap: "wrap",
        flexBasis: `${flexBasis}`,
        fontFamily: "Josefin Slab",
        width: `${position == "fixed" ? "100%" : null}`,
        height: `${height ? height + "em" : "100%"}`,
        padding: `${padding}em`,
        paddingLeft: `${paddingLeft}em`,
        paddingRight: `${paddingRight}em`,
        paddingTop: `${paddingTop}em`,
        paddingBottom: `${paddingBottom}em`,
        marginBottom: `${marginBottom}em`,
        justifyContent: `${justifyContent}`,
        alignItems: `${alignItems}`,
        flexDirection: `${flexDirection}`,
        backgroundColor: `${backgroundColor}`
      }}
    >
      {children}
    </div>
  );
};
const Column = (
  {
    height = false,
    justifyContent = "center",
    alignItems = "center",
    flexDirection = "row",
    backgroundColor = false,
    children,
    width,
    ...restOfProps
  } = {}
) => {
  return (
    <div
      style={{
        ...restOfProps,
        display: "flex",
        flexWrap: "wrap",
        flexBasis: `${width * 100 / 12}%`,
        justifyContent: `${justifyContent}`,
        alignItems: `${alignItems}`,
        flexDirection: `${flexDirection}`,
        backgroundColor: `${backgroundColor}`
      }}
    >
      {children}
    </div>
  );
};

const ProgressBar = (
  {
    height = 1,
    percent = 0,
    barColor = "red",
    backgroundColor = "lightgrey"
  } = {}
) => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      backgroundColor={backgroundColor}
      flexBasis="auto"
      height={height}
      justifyContent="start"
      marginBottom={0.5}
    >
      <Box
        display="flex"
        flexBasis={`${percent}%`}
        backgroundColor={barColor}
      />
    </Box>
  );
};
const Typography = ({
  tag,
  fontSize = 1,
  fontWeight,
  display = "inline-flex",
  textAlign = "start",
  color,
  fontFamily = "Josefin Slab",
  backgroundColor,
  lineHeight,
  marginBottom = 0,
  children
}) => {
  const customTag = `${tag}`;
  return (
    <customTag
      style={{
        fontFamily,
        display,
        textAlign,
        backgroundColor,
        fontSize: `${fontSize}em`,
        fontWeight,
        color,
        lineHeight: `${lineHeight}em`,
        marginBottom: `${marginBottom}em`
      }}
    >
      {children}
    </customTag>
  );
};
export { Typography, Box, Column, ProgressBar };
