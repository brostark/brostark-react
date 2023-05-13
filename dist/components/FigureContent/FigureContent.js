import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { conditionalCss } from "../../helpers";
import { styles } from "./figureContent.styles";
export const FigureContent = ({ imageUrl, children, reversed, className, }) => {
    return (_jsxs("div", Object.assign({ css: [styles.root, conditionalCss(reversed, styles.reversed)], className: className }, { children: [_jsx("div", Object.assign({ css: styles.backgroundImageContainer }, { children: _jsx("div", { css: [styles.backgroundImage, conditionalCss(reversed, styles.backgroundImageReversed)], style: { backgroundImage: `url(${imageUrl})` } }) })), _jsx("div", Object.assign({ css: styles.content }, { children: children }))] })));
};
