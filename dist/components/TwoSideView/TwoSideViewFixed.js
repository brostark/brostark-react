import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { styles } from "./twoSideView.styles";
export const TwoSideViewFixed = ({ children, className, }) => {
    return (_jsx("div", Object.assign({ css: styles.fixedView, className: className }, { children: children })));
};
