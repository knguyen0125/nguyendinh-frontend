import React from "react";
import { Box } from "theme-ui";
import cn from "classnames";
import AspectRatioBox from "../../../../ui/AspectRatioBox";
import Wysiwyg from "../../../../renderer/wysiwyg";
import SectionAddon from "../../SectionAddons";
import { getWysiwygOverrides } from "../../../HeroBanner/utils";
import Multimedia from "../../../../ui/Multimedia";

const TopSection = ({ section }) => {
  const hasMobileMedia = !!section?.mobileMedia;

  return (
    <Box className={cn("flex flex-col")}>
      {section?.media[0] && (
        <AspectRatioBox
          ratio={[1, 1, 4 / 3]}
          sx={{
            width: "100%",
            display: hasMobileMedia && ["none", "none", "initial"],
          }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Multimedia medium={section?.media[0]} />
        </AspectRatioBox>
      )}
      {hasMobileMedia && section?.mobileMedia && (
        <AspectRatioBox
          ratio={[1, 1, 4 / 3]}
          sx={{ width: "100%", display: ["initial", "initial", "none"] }}
          className={cn(
            section.offsetMedia && "top-0 md:-top-5 left-0 md:-left-5"
          )}
          keepAspectRatio={!section.offsetMedia}
        >
          <Multimedia
            medium={section?.mobileMedia}
            sx={{ objectFit: "contain", height: "auto" }}
          />
        </AspectRatioBox>
      )}
      <Box className="w-full p-4 text-center">
        <Wysiwyg data={section.text} overrides={getWysiwygOverrides(section)} />
        {section.addons.map((addon, index) => (
          <SectionAddon addon={addon} key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default TopSection;
