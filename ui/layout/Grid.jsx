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
    children,
    position,
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
        flexBasis: "100%",
        fontFamily: "Josefin Slab",
        width: `${position == "fixed" ? "100%" : null}`,
        height: `${height ? height + "em" : "100%"}`,
        padding: `${padding}em`,
        paddingLeft: `${paddingLeft}em`,
        paddingRight: `${paddingRight}em`,
        paddingTop: `${paddingTop}em`,
        paddingBottom: `${paddingBottom}em`,
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
export { Box, Column };
