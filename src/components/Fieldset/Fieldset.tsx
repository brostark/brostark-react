import { Typography } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";
import { conditionalCss } from "../../helpers";
import { SpacingValue, useSpacing } from "../../hooks";
import { styles } from "./fieldset.styles";


interface FieldsetProps {
  label?: string;
  fullWidth?: boolean;
  className?: string;
  focused?: boolean;
  children?: ReactNode;
  style?: CSSProperties;
  spacing?: SpacingValue;
  disableHover?: boolean;
  disablePadding?: boolean;
  onClick?: (e: React.MouseEvent<HTMLFieldSetElement>) => void;
}


export const Fieldset: React.FC<FieldsetProps> = ({
  label,
  style,
  spacing,
  onClick,
  focused,
  children,
  fullWidth,
  className,
  disableHover,
  disablePadding,
}) => {
  const styleWithSpacing = useSpacing(spacing, style);

  return (
    <fieldset
      onClick={onClick}
      className={className}
      style={styleWithSpacing}
      css={[
        styles.root,
        conditionalCss(fullWidth, styles.fullWidth),
        conditionalCss(!!onClick, styles.clickable),
        conditionalCss(!disableHover, styles.hoverable),
        conditionalCss(focused, styles.focused),
        conditionalCss(disablePadding, styles.noPadding),
      ]}
    >
      <legend css={styles.legend}>
        <Typography component="span" css={styles.legendLabel}>{label}</Typography>
      </legend>

      <Typography component="span" css={styles.label}>{label}</Typography>

      {children}
    </fieldset>
  );
};
