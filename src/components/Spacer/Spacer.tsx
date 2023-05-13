import { useMediaQuery } from "@mui/material";
import { theme } from "../../lib";

export interface SpacerProps {
  spacing?: number;
  mobileSpacing?: number;
  horizontal?: boolean;
}

export const Spacer: React.FC<SpacerProps> = ({
  spacing = 2,
  horizontal,
  mobileSpacing,
}) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const style = {
    [horizontal ? "height" : "width"]: "100%",
    [horizontal ? "width" : "height"]: theme.spacing(isMobile && mobileSpacing !== undefined ? mobileSpacing: spacing),
  };

  return (
    <div
      style={style}
    />
  )
};
