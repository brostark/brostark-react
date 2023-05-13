import { Grid } from "@mui/material"
import { styles } from "./twoSideView.styles"
import { TwoSideViewProps } from "./TwoSideViewContainer"


export const TwoSideViewFluid: React.FC<TwoSideViewProps> = ({
  children,
  className,
}) => {
  return (
    <div css={styles.fluidView} className={className}>
      <Grid container direction="column" alignItems="center">
        {children}
      </Grid>
    </div>
  );
}