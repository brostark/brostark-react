import React, { ReactNode, useState } from "react";
import { conditionalCss } from "../../helpers";
import { Section } from "../Section";
import { styles } from "./formDocument.styles";


export interface DocumentFieldObjectProps {
  label?: string;
  children?: ReactNode;
}


export const DocumentFieldObject: React.FC<DocumentFieldObjectProps> = ({
  label,
  children,
}) => {
  const [open, setOpen] = useState(true);

  return (
    <Section
      open={open}
      onChange={setOpen}
      title={label || ""}
      defaultClosed={false}
      css={[styles.typeObject, conditionalCss(open, styles.typeObjectSelected)]}
    >
      <div>
        {children}
      </div>
    </Section>
  )
}