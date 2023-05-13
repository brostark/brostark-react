var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { conditionalCss } from "../../helpers/utils";
import { styles } from "./inputAutocompleteAsync.styles";
export const InputAutocompleteAsync = ({ model, name, label, value, margin, onChange, fullWidth, noOptionsText, getDocumentLabel, isLoading: parentIsLoading, }) => {
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleRefresh = () => __awaiter(void 0, void 0, void 0, function* () {
        setIsLoading(true);
        try {
            const getAllResult = yield model.getItems();
            setOptions(getAllResult.items.map((item) => ({
                key: item.id,
                label: getDocumentLabel(item),
            })));
        }
        catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    });
    const handleChange = (event, nextValue) => {
        onChange({
            target: {
                name,
                value: nextValue ? nextValue.key : "",
            },
        });
    };
    useEffect(() => {
        handleRefresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (_jsx(Autocomplete, { options: options, loading: isLoading, fullWidth: fullWidth, onChange: handleChange, disabled: parentIsLoading, noOptionsText: noOptionsText, css: [conditionalCss(margin, styles.margin), conditionalCss(fullWidth, styles.fullWidth)], renderInput: (params) => (_jsx(TextField, Object.assign({}, params, { name: name, label: label, fullWidth: fullWidth, variant: "outlined", InputProps: Object.assign(Object.assign({}, params.InputProps), { disabled: parentIsLoading, endAdornment: (_jsxs(_Fragment, { children: [isLoading && _jsx(CircularProgress, { color: "inherit", size: 20 }), params.InputProps.endAdornment] })) }) }))) }));
};
