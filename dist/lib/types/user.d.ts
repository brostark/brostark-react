import { FirestoreDocument } from "./firestoreDocument";
export declare enum DefaultUserRole {
    Regular = "regular",
    Admin = "admin"
}
export interface DefaultUser extends FirestoreDocument {
    role: DefaultUserRole | string;
    email?: string;
    deviceId?: string;
    sessionId?: string;
    sessionTitle?: string;
    sessionLastMessage?: string;
}
//# sourceMappingURL=user.d.ts.map