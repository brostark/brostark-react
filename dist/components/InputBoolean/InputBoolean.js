import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Grid, Switch, Typography } from "@mui/material";
import { Fieldset } from "../Fieldset";
export const InputBoolean = ({ name, label, value, spacing, disabled, onChange, labelFalsy, labelTruthy, }) => {
    const handleChange = (e, nextValue) => onChange(nextValue);
    return (_jsx(Fieldset, Object.assign({ label: label, spacing: spacing }, { children: _jsxs(Grid, Object.assign({ container: true, flexWrap: "nowrap", alignItems: "center", justifyContent: "flex-start" }, { children: [_jsx(Typography, { children: labelFalsy }), _jsx(Switch, { name: name, checked: !!value, disabled: disabled, onChange: handleChange }), _jsx(Typography, { children: labelTruthy })] })) })));
};
