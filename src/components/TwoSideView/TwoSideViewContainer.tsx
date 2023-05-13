import React from "react";
import { conditionalCss } from "../../helpers";
import { styles } from "./twoSideView.styles";

export interface TwoSideViewProps {
  children?: React.ReactNode;
  className?: string;
}


export const TwoSideViewContainer: React.FC<TwoSideViewProps> = ({
  children,
  className,
}) => {
  const sideCount = React.Children.toArray(children).length;

  return (
    <div
      css={[styles.root, conditionalCss(sideCount < 2, styles.rootOneSide)]}
      className={className}
    >
      {children}
    </div>
  );
}
