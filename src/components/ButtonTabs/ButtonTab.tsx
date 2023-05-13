import { css, Typography } from "@mui/material";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import { conditionalCss } from "../../helpers";
import { theme } from "../../lib";
import { ButtonTabsContext } from "./buttonTabs.context";


const styles = {
  underline: css`
    width: 100%;
    opacity: 0;
    height: 2px;
    position: relative;
    background-color: ${theme.palette.primary.main};
    transition: all 0.2s ease-in-out;
  `,

  underlineActive: css`
    opacity: 1;
    transform: translateX(0);
  `,

  underlineInactiveFromLeft: css`
    transform: translateX(-110%);
  `,

  underlineInactiveFromRight: css`
    transform: translateX(110%);
  `,

  root: css`
    overflow: hidden;
    cursor: pointer;
    transition: color 0.25s ease-in-out;

    &:hover {
      color: ${theme.palette.primary.main}
    }
  `,

  active: css`
    color: ${theme.palette.primary.main};
  `,
}

interface ButtonTabProps {
  label: ReactNode;
  value: string;
  index?: number;
  color?: "primary" | "secondary" | "default";
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

enum ButtonTabActiveState {
  Active = "active",
  UnactiveFromLeft = "unactiveLeft",
  UnactiveFromRight = "unactiveRight"
}

export const ButtonTab: React.FC<ButtonTabProps> = ({
  label,
  value,
  index,
  color,
  onClick,
}) => {
  const {
    setValue,
    activeIndex,
    setActiveIndex,
    value: contextValue,
  } = useContext(ButtonTabsContext);
  const [activeState, setActiveState] = useState<ButtonTabActiveState>(Boolean(value && contextValue === value) ? ButtonTabActiveState.Active : ButtonTabActiveState.UnactiveFromLeft);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setValue(value);

    if (typeof index === "number" && setActiveIndex) {
      setActiveIndex(index);
    }

    if (onClick) {
      onClick(e);
    }
  }

  useEffect(() => {
    if (typeof index === "number" && value && contextValue === value && setActiveIndex) {
      setActiveIndex(index);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contextValue !== value) {
      setActiveState(typeof index === "number" && typeof activeIndex === "number" && index < activeIndex
        ? ButtonTabActiveState.UnactiveFromRight
        : ButtonTabActiveState.UnactiveFromLeft
      );
    } else if (activeState !== ButtonTabActiveState.Active && contextValue === value) {
      setActiveState(ButtonTabActiveState.Active);
    }
  }, [contextValue, activeIndex, activeState, index, value]);

  return (
    <div
      role="button"
      onClick={handleClick}
      css={[styles.root, conditionalCss(activeState === ButtonTabActiveState.Active, styles.active)]}
    >
      <Typography variant="h6" color={color}>{label}</Typography>
      <div
        css={[
          styles.underline,
          conditionalCss(
            activeState === ButtonTabActiveState.Active,
            styles.underlineActive,
            conditionalCss(activeState === ButtonTabActiveState.UnactiveFromLeft, styles.underlineInactiveFromLeft, styles.underlineInactiveFromRight
          ))
        ]}
      />
    </div>
  );
};
