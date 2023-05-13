import firebase from "firebase";


export interface FirestoreDocument {
  id: string;
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;

  [key: string]: unknown;
}
