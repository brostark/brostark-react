import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Slider, Stack, Typography } from "@mui/material";
import { useSpacing } from "../../hooks";
import { Fieldset } from "../Fieldset";
export const InputSlider = ({ name, label, value, spacing, min = 0, max = 100, onChange, disabled, isLoading, }) => {
    const styleWithSpacing = useSpacing(spacing);
    const handleChange = (e, value) => onChange({
        target: {
            name,
            value: Array.isArray(value) ? value[0] : value,
        }
    });
    return (_jsx(Fieldset, Object.assign({ label: label, style: styleWithSpacing }, { children: _jsxs(Stack, Object.assign({ spacing: 2, direction: "row" }, { children: [_jsx(Typography, { children: min }), _jsx(Slider, { value: value, onChange: handleChange, valueLabelDisplay: "auto", disabled: isLoading || disabled }), _jsx(Typography, { children: max })] })) })));
};
