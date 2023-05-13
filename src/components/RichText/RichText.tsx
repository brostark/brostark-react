import React from "react";
import Quill from "quill";
import ReactQuill from "react-quill";

import "react-quill/dist/quill.snow.css";
import { SpacingValue } from "../../hooks";
import { OnChangeEvent } from "../../lib";
import { Fieldset } from "../Fieldset";
import { styles } from "./richText.styles";

const Delta = Quill.import("delta");
const Clipboard = Quill.import("modules/clipboard");


class PlainClipboard extends Clipboard {
  onPaste(e: any) {
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
    [{"list": "ordered"}, {"list": "bullet"}, {"indent": "-1"}, {"indent": "+1"}],
    ["link"],
    ["clean"]
  ],
};

const formats = [
  "bold", "italic", "underline", "strike",
  "list", "bullet", "indent",
  "link",
];

export interface RichTextProps {
  value: string;
  label?: string;
  name: string;
  disabled?: boolean;
  className?: string;
  spacing?: SpacingValue;
  onChange: (e: OnChangeEvent) => any;
}


export const RichText: React.FC<RichTextProps> = ({
  name,
  value,
  label,
  spacing,
  onChange,
  disabled,
  className,
}) => {
  const handleChange = (value: string) => onChange && onChange({
    target: {
      name,
      value,
    }
  });

  return (
    <Fieldset
      disablePadding
      label={label}
      spacing={spacing}
    >
      <ReactQuill
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        css={styles.root}
        readOnly={disabled}
        placeholder={label}
        className={className}
        onChange={handleChange}
      />
    </Fieldset>
  );
}
