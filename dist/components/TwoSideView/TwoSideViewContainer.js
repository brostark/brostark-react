import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import React from "react";
import { conditionalCss } from "../../helpers";
import { styles } from "./twoSideView.styles";
export const TwoSideViewContainer = ({ children, className, }) => {
    const sideCount = React.Children.toArray(children).length;
    return (_jsx("div", Object.assign({ css: [styles.root, conditionalCss(sideCount < 2, styles.rootOneSide)], className: className }, { children: children })));
};
