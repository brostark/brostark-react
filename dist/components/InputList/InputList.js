import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { List } from "@mui/material";
import { useCallback, useMemo } from "react";
import { Fieldset } from "../Fieldset";
import { InputListItem } from "./InputListItem";
export const InputList = ({ name, label, value, spacing, onChange, disabled, placeholder, inputListItemProps, }) => {
    const handleItemChange = (itemValue, index) => {
        if (!itemValue && index >= value.length) {
            return;
        }
        const nextValue = [...value];
        nextValue[index] = itemValue;
        onChange(nextValue);
    };
    const handleDelete = useCallback((index) => {
        const nextValue = [...value];
        nextValue.splice(index, 1);
        onChange(nextValue);
    }, [value, onChange]);
    const computedValue = useMemo(() => {
        if (value.length === 0) {
            return [""];
        }
        const lastValue = value[value.length - 1];
        return lastValue ? value.concat("") : value;
    }, [value]);
    return (_jsx(Fieldset, Object.assign({ spacing: spacing, label: label }, { children: _jsx(List, { children: computedValue.map((currentValue, index) => {
                const currentInputListItemProps = inputListItemProps ? inputListItemProps(currentValue, index) : {};
                return (_jsx(InputListItem, Object.assign({ index: index, disabled: disabled, value: currentValue, onDelete: handleDelete, name: `${name}-${index}`, placeholder: placeholder, onChange: handleItemChange, label: `${label} - ${index + 1}` }, currentInputListItemProps), `${name}-${index}`));
            }) }) })));
};
