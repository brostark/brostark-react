import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useState } from "react";
import { conditionalCss } from "../../helpers";
import { Section } from "../Section";
import { styles } from "./formDocument.styles";
export const DocumentFieldObject = ({ label, children, }) => {
    const [open, setOpen] = useState(true);
    return (_jsx(Section, Object.assign({ open: open, onChange: setOpen, title: label || "", defaultClosed: false, css: [styles.typeObject, conditionalCss(open, styles.typeObjectSelected)] }, { children: _jsx("div", { children: children }) })));
};
