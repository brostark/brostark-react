var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { useContext, useEffect } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import { styles } from "./viewDocument.styles";
import { Section } from "../Section/Section";
import { AppContext } from "../../contexts/appContext";
import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDocument";
import { FormDocument } from "../FormDocument/FormDocument";
import { InlineLabelValue } from "../InlineLabelValue/InlineLabelValue";
import { Spacer } from "../Spacer/Spacer";
import { formatDate } from "../../helpers/utils";
import { TwoSideViewContainer, TwoSideViewFixed, TwoSideViewFluid } from "../TwoSideView";
export const ViewDocument = ({ model, infos, sidebar, children, onSaveItem, onItemChange, avatarIcon: AvatarIcon, avatarBackgroundColor, }) => {
    const { id } = useParams();
    const { item } = useDocument(model, id);
    const { isLoading } = useContext(AppContext);
    useEffect(() => {
        if (onItemChange) {
            onItemChange(item);
        }
    }, [item, onItemChange]);
    const handleSaveItem = (nextItem, previousItem) => __awaiter(void 0, void 0, void 0, function* () {
        if (onSaveItem) {
            yield onSaveItem(nextItem, previousItem);
        }
    });
    console.log("--- item", model.schema, item);
    return (_jsxs(TwoSideViewContainer, { children: [_jsxs(TwoSideViewFluid, { children: [model.schema.length > 0 && (_jsx(Section, Object.assign({ title: "Contenu" }, { children: _jsx(FormDocument, { item: item, schema: model.schema, isLoading: isLoading, onChange: handleSaveItem }) }))), children] }), item && (_jsx(TwoSideViewFixed, { children: _jsxs(Grid, Object.assign({ container: true, direction: "column", alignItems: "center" }, { children: [_jsx(Section, Object.assign({ title: "Informations" }, { children: _jsxs(Grid, Object.assign({ container: true, direction: "column", alignItems: "center" }, { children: [_jsx(Avatar, Object.assign({ css: styles.avatar, sx: { bgcolor: avatarBackgroundColor } }, { children: AvatarIcon && _jsx(AvatarIcon, { fontSize: "large" }) })), _jsx(Spacer, {}), _jsx(InlineLabelValue, Object.assign({ label: "Id:" }, { children: _jsx(Typography, { children: item.id }) })), _jsx(InlineLabelValue, Object.assign({ label: "Cr\u00E9\u00E9 le:" }, { children: _jsx(Typography, { children: formatDate(item.createdAt) }) })), _jsx(InlineLabelValue, Object.assign({ label: "Mise \u00E0 jour le:" }, { children: _jsx(Typography, { children: formatDate(item.createdAt) }) })), infos] })) })), sidebar] })) }))] }));
};
