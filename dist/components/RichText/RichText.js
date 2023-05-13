import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import Quill from "quill";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Fieldset } from "../Fieldset";
import { styles } from "./richText.styles";
const Delta = Quill.import("delta");
const Clipboard = Quill.import("modules/clipboard");
class PlainClipboard extends Clipboard {
    onPaste(e) {
        e.preventDefault();
        const range = this.quill.getSelection();
        const text = e.clipboardData.getData("text/plain");
        const delta = new Delta()
            .retain(range.index)
            .delete(range.length)
            .insert(text);
        const index = text.length + range.index;
        const length = 0;
        this.quill.updateContents(delta, "silent");
        this.quill.setSelection(index, length, "silent");
        this.quill.scrollIntoView();
    }
}
Quill.register("modules/clipboard", PlainClipboard, true);
const modules = {
    toolbar: [
        ["bold", "italic", "underline", "strike"],
        [{ "list": "ordered" }, { "list": "bullet" }, { "indent": "-1" }, { "indent": "+1" }],
        ["link"],
        ["clean"]
    ],
};
const formats = [
    "bold", "italic", "underline", "strike",
    "list", "bullet", "indent",
    "link",
];
export const RichText = ({ name, value, label, spacing, onChange, disabled, className, }) => {
    const handleChange = (value) => onChange && onChange({
        target: {
            name,
            value,
        }
    });
    return (_jsx(Fieldset, Object.assign({ disablePadding: true, label: label, spacing: spacing }, { children: _jsx(ReactQuill, { theme: "snow", value: value, modules: modules, formats: formats, css: styles.root, readOnly: disabled, placeholder: label, className: className, onChange: handleChange }) })));
};
