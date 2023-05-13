import { ClassNames } from "@emotion/react";
import React, { useState } from "react";
import { Tag, WithContext as ReactTags } from "react-tag-input";
import { SpacingValue } from "../../hooks";
import { OnChangeEvent } from "../../lib";
import { Fieldset } from "../Fieldset";
import { createClassNames } from "./inputTags.styles";


export interface InputTagsProps {
  name: string;
  label?: string;
  value: string[];
  disabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  spacing?: SpacingValue;
  autoComplete?: boolean;
  onChange: (e: OnChangeEvent<string[]>) => void;
}


const KeyCodes = {
  comma: 188,
  enter: 13,
}


export const InputTags: React.FC<InputTagsProps> = ({
  name,
  value,
  label,
  spacing,
  disabled,
  onChange,
  isLoading,
  placeholder,
  autoComplete,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);

  const handleDelete = (index: number) => onChange({
    target: {
      name,
      value: (value || []).filter((v, i: number) => i !== index),
    }
  });

  const handleAddition = (tag: Tag) => onChange({
    target: {
      name,
      value: (value || []).concat(tag.text),
    }
  });

  return (
    <ClassNames>
      {({ css }) => {
        const classNames = createClassNames(css);

        return (
          <Fieldset
            label={label}
            spacing={spacing}
            focused={focused}
            className={classNames.fieldset}
          >
            <ReactTags
              autocomplete
              suggestions={[]}
              allowDragDrop={false}
              inputFieldPosition="top"
              handleDelete={handleDelete}
              handleInputBlur={handleBlur}
              handleInputFocus={handleFocus}
              handleAddition={handleAddition}
              readOnly={disabled || isLoading}
              tags={(value || []).map(v => ({
                id: v,
                text: v,
              }))}
              delimiters={[KeyCodes.comma, KeyCodes.enter]}
              placeholder={`${label || "Tags"}: Appuyer sur Entrée pour créer un nouveau tag`}
              classNames={{
                tag: classNames.tag,
                selected: classNames.tags,
                remove: classNames.tagRemove,
                tagInput: classNames.tagInput,
                tagInputField: classNames.tagInputField,
              }}
            />
          </Fieldset>
        );
      }}
    </ClassNames>
  )
}
