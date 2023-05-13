import React, { ReactNode } from "react";
import { FirestoreModel } from "../../lib/firestoreModel";
import { FirestoreEditedItem } from "../FormDocument/FormDocument";
import { FirestoreDocument, SvgElement } from "../../lib/types";
interface ViewDocumentProps<T extends FirestoreDocument> {
    children?: React.ReactNode;
    model: FirestoreModel<T>;
    avatarIcon?: SvgElement;
    infos?: React.ReactNode;
    avatarBackgroundColor?: string;
    sidebar?: ReactNode;
    onItemChange?: (nextItem: T | null) => void;
    onSaveItem?: (nextItem: FirestoreEditedItem, previousItem?: T | null) => Promise<void>;
}
export declare const ViewDocument: <T extends FirestoreDocument>({ model, infos, sidebar, children, onSaveItem, onItemChange, avatarIcon: AvatarIcon, avatarBackgroundColor, }: ViewDocumentProps<T>) => import("@emotion/react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ViewDocument.d.ts.map