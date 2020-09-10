import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Multimedia from "../../../../ui/Multimedia";

const MediaOnlySection = ({layout, section}) => {
  return (
    <Box className={cn("flex flex-col")}>
      {section?.media[0] && (
        <AspectRatioBox
          ratio={[1, 1, 2]}
          sx={{ width: "100%" }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Multimedia layout={layout} medium={section?.media[0]} />
        </AspectRatioBox>
      )}
    </Box>
  );
};

export default MediaOnlySection;
