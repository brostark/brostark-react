import { jsx as _jsx } from "@emotion/react/jsx-runtime";
const TabPanel = ({ hidden, children, className, }) => {
    return (_jsx("div", Object.assign({ role: "tabpanel", hidden: hidden, className: className }, { children: !hidden && children })));
};
export default TabPanel;
