export var FirestoreSchemaType;
(function (FirestoreSchemaType) {
    FirestoreSchemaType["text"] = "text";
    FirestoreSchemaType["date"] = "date";
    FirestoreSchemaType["email"] = "email";
    FirestoreSchemaType["password"] = "password";
    FirestoreSchemaType["number"] = "number";
    FirestoreSchemaType["phone"] = "phone";
    FirestoreSchemaType["tags"] = "tags";
    FirestoreSchemaType["arrayText"] = "arrayText";
    FirestoreSchemaType["file"] = "file";
    FirestoreSchemaType["custom"] = "custom";
    FirestoreSchemaType["richText"] = "richText";
    FirestoreSchemaType["boolean"] = "boolean";
    FirestoreSchemaType["checkbox"] = "checkbox";
    FirestoreSchemaType["select"] = "select";
    FirestoreSchemaType["object"] = "object";
    FirestoreSchemaType["slider"] = "slider";
    FirestoreSchemaType["reference"] = "reference";
})(FirestoreSchemaType || (FirestoreSchemaType = {}));
export class FirestoreSchemaReferenceOption {
    constructor(props) {
        this.props = props;
    }
}
