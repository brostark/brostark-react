import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { ClassNames } from "@emotion/react";
import { useState } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { Fieldset } from "../Fieldset";
import { createClassNames } from "./inputTags.styles";
const KeyCodes = {
    comma: 188,
    enter: 13,
};
export const InputTags = ({ name, value, label, spacing, disabled, onChange, isLoading, placeholder, autoComplete, }) => {
    const [focused, setFocused] = useState(false);
    const handleFocus = () => setFocused(true);
    const handleBlur = () => setFocused(false);
    const handleDelete = (index) => onChange({
        target: {
            name,
            value: (value || []).filter((v, i) => i !== index),
        }
    });
    const handleAddition = (tag) => onChange({
        target: {
            name,
            value: (value || []).concat(tag.text),
        }
    });
    return (_jsx(ClassNames, { children: ({ css }) => {
            const classNames = createClassNames(css);
            return (_jsx(Fieldset, Object.assign({ label: label, spacing: spacing, focused: focused, className: classNames.fieldset }, { children: _jsx(ReactTags, { autocomplete: true, suggestions: [], allowDragDrop: false, inputFieldPosition: "top", handleDelete: handleDelete, handleInputBlur: handleBlur, handleInputFocus: handleFocus, handleAddition: handleAddition, readOnly: disabled || isLoading, tags: (value || []).map(v => ({
                        id: v,
                        text: v,
                    })), delimiters: [KeyCodes.comma, KeyCodes.enter], placeholder: `${label || "Tags"}: Appuyer sur Entrée pour créer un nouveau tag`, classNames: {
                        tag: classNames.tag,
                        selected: classNames.tags,
                        remove: classNames.tagRemove,
                        tagInput: classNames.tagInput,
                        tagInputField: classNames.tagInputField,
                    } }) })));
        } }));
};
