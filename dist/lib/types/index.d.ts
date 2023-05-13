import firebase from "firebase/app";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
export * from "./firestoreDocument";
export * from "./firestoreSchema";
export * from "./inputOption";
export * from "./routeOption";
export interface OnChangeEvent<T = string> {
    target: {
        name: string;
        value: T;
    };
}
export type UnknownObject = Record<string, unknown>;
export type SvgElement = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
};
export type DateType = Date | string | number | firebase.firestore.Timestamp;
export declare enum ValueState {
    Indeterminate = "indeterminate",
    Valid = "valid",
    Invalid = "invalid"
}
//# sourceMappingURL=index.d.ts.map