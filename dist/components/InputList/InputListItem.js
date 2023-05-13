import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { Delete } from "@mui/icons-material";
import { IconButton, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { InputText } from "../InputText";
import { styles } from "./inputList.styles";
export const InputListItem = ({ name, index, label, value, onBlur, onFocus, onChange, disabled, onDelete, placeholder, LeftComponent, }) => {
    const [nextValue, setNextValue] = useState(value);
    const handleChange = (e) => setNextValue(e.target.value);
    const handleDelete = () => {
        if (onDelete) {
            onDelete(index);
        }
    };
    const handleBlur = (e) => {
        onChange(nextValue, index);
        if (onBlur) {
            onBlur(e, index);
        }
    };
    const handleFocus = (e) => {
        if (onFocus) {
            onFocus(e, index);
        }
    };
    useEffect(() => {
        setNextValue(value);
    }, [value]);
    return (_jsx(ListItem, Object.assign({ css: styles.listItem }, { children: _jsx(InputText, { fullWidth: true, value: nextValue, onBlur: handleBlur, disabled: disabled, onFocus: handleFocus, onChange: handleChange, placeholder: placeholder, LeftComponent: LeftComponent, RightComponent: nextValue.length > 0 ? (_jsx(IconButton, Object.assign({ color: "primary", disabled: disabled, onClick: handleDelete }, { children: _jsx(Delete, {}) }))) : undefined }) })));
};
