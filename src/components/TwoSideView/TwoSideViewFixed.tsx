import { styles } from "./twoSideView.styles";
import { TwoSideViewProps } from "./TwoSideViewContainer";

export const TwoSideViewFixed: React.FC<TwoSideViewProps> = ({
  children,
  className,
}) => {
  return (
    <div css={styles.fixedView} className={className}>
      {children}
    </div>
  );
};
