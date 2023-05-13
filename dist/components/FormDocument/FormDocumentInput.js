import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { MenuItem } from "@mui/material";
import update from "immutability-helper";
import { Fragment, useCallback, useMemo } from "react";
import { FirestoreSchemaType } from "../../lib/types";
import { InputAutocompleteAsync } from "../InputAutocompleteAsync/InputAutocompleteAsync";
import { InputFile } from "../InputFile";
import { InputSelect } from "../InputSelect";
import { InputSlider } from "../InputSlider";
import { InputTags } from "../InputTags";
import { InputText } from "../InputText/InputText";
import { RichText } from "../RichText";
import { Spacer } from "../Spacer";
import { DocumentFieldObject } from "./DocumentFieldObject";
export const FormDocumentInput = ({ field, spacer, onChange, isLoading, item: baseItem, value: baseValue, }) => {
    const handleChange = useCallback((e) => {
        if (field.type === FirestoreSchemaType.object) {
            onChange({
                target: {
                    name: field.name,
                    value: update((baseValue || {}), {
                        [e.target.name]: {
                            $set: e.target.value,
                        },
                    }),
                }
            });
            return;
        }
        onChange(e);
    }, [field, baseValue, onChange]);
    const renderField = useCallback((field, options) => {
        const { item, value, } = options;
        if ((typeof field.visible === "function" && !field.visible(item || {})) || (typeof field.visible === "boolean" && !field.visible)) {
            return _jsx("div", {});
        }
        switch (field.type) {
            case FirestoreSchemaType.reference:
                const referenceOptions = typeof field.options === "function"
                    ? field.options(item)
                    : field.options;
                return (_jsx(InputAutocompleteAsync, Object.assign({ margin: true, fullWidth: true, name: field.name, label: field.label, onChange: handleChange, isLoading: isLoading, value: value }, referenceOptions.props)));
            case FirestoreSchemaType.file:
                return (_jsx(InputFile, Object.assign({ name: field.name, label: field.label, onChange: handleChange, disabled: isLoading, value: value }, field.options)));
            case FirestoreSchemaType.select:
                return (_jsx(InputSelect, { name: field.name, label: field.label, isLoading: isLoading, onChange: handleChange, value: value, children: field.options.map((option) => (_jsx(MenuItem, Object.assign({ value: option.key }, { children: option.label }), `${field.name}-key-${option.key}`))) }));
            case FirestoreSchemaType.tags:
                return (_jsx(InputTags, { name: field.name, label: field.label, isLoading: isLoading, onChange: handleChange, value: value }));
            case FirestoreSchemaType.slider:
                return (_jsx(InputSlider, { name: field.name, label: field.label, isLoading: isLoading, onChange: handleChange, value: value || 0 }));
            case FirestoreSchemaType.object:
                const currentItem = (value || {});
                return (_jsx(DocumentFieldObject, Object.assign({ label: field.label }, { children: field.children.map((childField, index) => {
                        return (_jsxs(Fragment, { children: [index > 0 && _jsx(Spacer, {}), renderField(childField, {
                                    item: currentItem,
                                    value: currentItem[childField.name],
                                })] }, `schema-${field.name}-${childField.name}`));
                    }) })));
            case FirestoreSchemaType.richText:
                return (_jsx(RichText, { name: field.name, label: field.label, disabled: isLoading, onChange: handleChange, value: value }));
            default: return (_jsx(InputText, { fullWidth: true, name: field.name, label: field.label, isLoading: isLoading, onChange: handleChange, value: value, type: field.type }));
        }
    }, [isLoading, handleChange]);
    const input = useMemo(() => {
        return renderField(field, {
            value: baseValue,
            item: baseItem,
        });
    }, [field, renderField, baseValue, baseItem]);
    return (_jsxs(_Fragment, { children: [spacer && _jsx(Spacer, {}), input] }));
};
