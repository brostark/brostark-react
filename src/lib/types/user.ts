import firebase from "firebase/app";
import { FirestoreDocument } from "./firestoreDocument";


export enum DefaultUserRole {
  Regular = "regular",
  Admin = "admin",
}


export interface DefaultUser extends FirestoreDocument {
  role: DefaultUserRole | string;
  email?: string;
  deviceId?: string;
  sessionId?: string;
  sessionTitle?: string;
  sessionLastMessage?: string;
}
