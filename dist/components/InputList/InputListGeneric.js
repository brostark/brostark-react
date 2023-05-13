import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Add } from "@mui/icons-material";
import { List } from "@mui/material";
import { useCallback } from "react";
import { Button } from "../Button";
import { Fieldset } from "../Fieldset";
export const InputListGeneric = ({ name, label, value, limit, spacing, onChange, disabled, renderItem, placeholder, defaultValue, }) => {
    const handleItemChange = (itemValue, index) => {
        if (!itemValue && index >= value.length) {
            return;
        }
        const nextValue = [...value];
        nextValue[index] = itemValue;
        onChange(nextValue);
    };
    const handleDelete = useCallback((index) => {
        console.log("--- deleted index", index);
        const nextValue = [...value];
        nextValue.splice(index, 1);
        onChange(nextValue);
    }, [value, onChange]);
    const handleClickAdd = () => onChange(value.concat(defaultValue instanceof Function ? defaultValue() : defaultValue));
    /*
    const computedValue = useMemo(() => {
      if (value.length === 0) {
        return [defaultValue];
      }
  
      const lastValue = value[value.length - 1];
  
      return lastValue ? value.concat(defaultValue) : value;
    }, [value, defaultValue]);
    console.log("--- computed value", computedValue);
    */
    /*
    useEffect(() => {
      handleClickAdd();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */
    return (_jsxs(Fieldset, Object.assign({ spacing: spacing, label: label }, { children: [_jsx(List, { children: value.map((currentValue, index) => {
                    return renderItem({
                        index,
                        value: currentValue,
                        onDelete: () => handleDelete(index),
                        onChange: (nextValue) => handleItemChange(nextValue, index),
                    });
                }) }), _jsxs(Button, Object.assign({ fullWidth: true, variant: "text", color: "primary", onClick: handleClickAdd, disabled: disabled || (!!limit && value.length >= limit) }, { children: [_jsx(Add, {}), " Ajouter", !!limit && limit > 0 ? ` (${value.length} / ${limit})` : ""] }))] })));
};
