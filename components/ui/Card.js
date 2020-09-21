import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";

const Card = ({ className, children, ...props }) => {
  return (
    <Box
      className={cn(
        "shadow-elevation-12 bg-white print:shadow-elevation-1",
        className
      )}
      {...props}
    >
      {children}
    </Box>
  );
};

export default Card;
