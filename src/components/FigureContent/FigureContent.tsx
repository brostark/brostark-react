import React from "react";
import { conditionalCss } from "../../helpers";
import { styles } from "./figureContent.styles";


interface FigureContentProps {
  imageUrl: string;
  className?: string;
  reversed?: boolean;
  children: React.ReactNode;
}

export const FigureContent: React.FC<FigureContentProps> = ({
  imageUrl,
  children,
  reversed,
  className,
}) => {
  return (
    <div css={[styles.root, conditionalCss(reversed, styles.reversed)]} className={className}>

      <div css={styles.backgroundImageContainer}>
        <div css={[styles.backgroundImage, conditionalCss(reversed, styles.backgroundImageReversed)]} style={{ backgroundImage: `url(${imageUrl})` }} />
      </div>

      <div css={styles.content}>
        {children}
      </div>
    </div>
  );
}
