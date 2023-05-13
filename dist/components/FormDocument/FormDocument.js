import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Add } from "@mui/icons-material";
import update from "immutability-helper";
import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../../contexts/appContext";
import { ErrorTypography } from "../ErrorTypography/ErrorTypography";
import { isFieldValueValid } from "./formDocument.utils";
import { FormDocumentInput } from "./FormDocumentInput";
import { Button } from "../Button/Button";
import { Spacer } from "../Spacer/Spacer";
export const FormDocument = ({ item, schema, onChange, isLoading: parentIsLoading, }) => {
    const { isLoading } = useContext(AppContext);
    const [itemIsEdited, setItemIsEdited] = useState(false);
    const [editedItem, setEditedItem] = useState({});
    const remainsBeforeSubmitting = useMemo(() => {
        const remains = [];
        for (const field of schema) {
            const value = editedItem[field.name];
            if (!field.optional && !isFieldValueValid(field.type, value)) {
                remains.push(field);
            }
        }
        return remains;
    }, [editedItem, schema]);
    const onItemAttributeChange = (e) => {
        setItemIsEdited(true);
        setEditedItem((previousEditedItem) => update(previousEditedItem, {
            [e.target.name]: {
                $set: e.target.value,
            },
        }));
    };
    const handleSave = () => onChange && onChange(editedItem, item);
    useEffect(() => {
        setItemIsEdited(false);
        setEditedItem(item ? Object.assign({}, item) : {});
    }, [item]);
    const isLoadingComputed = isLoading || parentIsLoading;
    return (_jsxs(_Fragment, { children: [schema.map((field, index) => {
                const key = `schema-${field.name}`;
                const value = editedItem[field.name];
                return (_jsx(FormDocumentInput, { field: field, value: value, spacer: index > 0, item: editedItem, isLoading: isLoadingComputed, onChange: onItemAttributeChange }, key));
            }), _jsx(Spacer, { spacing: 6 }), _jsxs(Button, Object.assign({ fullWidth: true, color: "primary", spacing: { top: 2 }, onClick: handleSave, isLoading: isLoadingComputed, disabled: remainsBeforeSubmitting.length > 0 || !itemIsEdited }, { children: [_jsx(Add, {}), "Enregistrer"] })), remainsBeforeSubmitting.length > 0 && (_jsxs(ErrorTypography, Object.assign({ align: "center" }, { children: ["Les champs suivants sont requis pour sauvegarder: ", remainsBeforeSubmitting.map(field => field.label).join(", ")] })))] }));
};
