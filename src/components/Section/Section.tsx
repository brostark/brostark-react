import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography, TypographyProps } from "@mui/material";
import React, { ReactNode, useMemo } from "react";
import { conditionalCss } from "../../helpers";
import { styles } from "./section.styles";


interface SectionProps {
  title: string;
  open?: boolean;
  first?: boolean;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  leftIcon?: ReactNode;
  defaultClosed?: boolean;
  titleProps?: TypographyProps;
  onChange?: (open: boolean) => void;
}

export const Section: React.FC<SectionProps> = ({
  open,
  title,
  first,
  onChange,
  children,
  leftIcon,
  disabled,
  className,
  titleProps,
  defaultClosed,
}) => {
  const expanded = useMemo(() => {
    return typeof open !== "undefined" ? open : undefined;
  }, [open]);

  const handleChange = (e: React.SyntheticEvent, nextExpanded: boolean) => onChange && onChange(nextExpanded);

  return (
    <Accordion
      disabled={disabled}
      expanded={expanded}
      className={className}
      onChange={onChange ? handleChange : undefined}
      defaultExpanded={disabled ? false : !defaultClosed}
      css={[styles.root, conditionalCss(first, styles.first)]}
    >
      <AccordionSummary
        color="primary"
        css={styles.header}
        expandIcon={disabled ? undefined : <ExpandMore />}
      >
        {leftIcon}
        <Typography variant="h4" {...titleProps}>{title}</Typography>
      </AccordionSummary>

      {!disabled && (
        <AccordionDetails css={styles.details}>
          {children}
        </AccordionDetails>
      )}
    </Accordion>
  );
}
