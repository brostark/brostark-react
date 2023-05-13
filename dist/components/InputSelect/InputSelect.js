import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Chip, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select as MuiSelect, Typography } from "@mui/material";
import { useCallback } from "react";
import { useSpacing } from "../../hooks";
import { styles } from "./inputSelect.styles";
export const InputSelect = ({ name, label, value, spacing, mulitple, children, onChange, disabled, errorText, isLoading, disableDefault, renderMultipleLabel, }) => {
    const styleWithSpacing = useSpacing(spacing);
    const createOnDeleteHandler = useCallback((valueToDelete) => (e) => {
        if (Array.isArray(value)) {
            e.stopPropagation();
            const nextValue = value.filter(x => x !== valueToDelete);
            onChange({
                target: {
                    name: name || "",
                    value: nextValue,
                }
            });
        }
    }, [name, value, onChange]);
    const renderMultipleValues = useCallback((selected) => {
        const values = selected.filter(x => x);
        return (_jsx(Grid, Object.assign({ container: true, alignItems: "center" }, { children: values.map((currentValue) => {
                const handleDelete = createOnDeleteHandler(currentValue);
                return (_jsx(Chip, { onClick: handleDelete, onDelete: handleDelete, label: renderMultipleLabel ? renderMultipleLabel(currentValue) : currentValue }, `${name}-${currentValue}`));
            }) })));
    }, [createOnDeleteHandler, name, renderMultipleLabel]);
    return (_jsxs(_Fragment, { children: [_jsxs(FormControl, Object.assign({ fullWidth: true, variant: "outlined", style: styleWithSpacing }, { children: [_jsx(InputLabel, Object.assign({ shrink: true, htmlFor: "outlined-age-simple" }, { children: label })), _jsxs(MuiSelect, Object.assign({ fullWidth: true, displayEmpty: true, name: name, value: value, label: label, defaultValue: "", css: styles.root, variant: "outlined", disabled: isLoading || disabled, renderValue: mulitple ? renderMultipleValues : undefined, onChange: onChange, input: _jsx(OutlinedInput, { notched: true, label: label, id: "outlined-age-simple" }) }, { children: [_jsx(MenuItem, Object.assign({ value: "", disabled: disableDefault }, { children: label })), children] }))] })), errorText && _jsx(Typography, Object.assign({ color: "error" }, { children: errorText }))] }));
};
