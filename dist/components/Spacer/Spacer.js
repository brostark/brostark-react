import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useMediaQuery } from "@mui/material";
import { theme } from "../../lib";
export const Spacer = ({ spacing = 2, horizontal, mobileSpacing, }) => {
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const style = {
        [horizontal ? "height" : "width"]: "100%",
        [horizontal ? "width" : "height"]: theme.spacing(isMobile && mobileSpacing !== undefined ? mobileSpacing : spacing),
    };
    return (_jsx("div", { style: style }));
};
