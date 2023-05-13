import { Close, Done, FiberManualRecordOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { StringSchema } from "joi";
import React, { ReactNode } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { conditionalCss } from "../../helpers";
import { styles } from "./inputValidations.styles";
import { ValueState } from "../../lib";

interface InputTextCase {
  schema: StringSchema;
  text: string | ReactNode;
}

interface InputValidationsProps {
  value: string;
  cases: InputTextCase[]
  hidden?: boolean;
  children: ReactNode;
}

const DisplayValueState = ({ state }: { state: ValueState }) => {
  switch (state) {
    case ValueState.Valid: return <Done fontSize="small" htmlColor="green" />;
    case ValueState.Invalid: return <Close fontSize="small" htmlColor="red" />;
    default: return <FiberManualRecordOutlined fontSize="small" />;
  }
}

export const InputValidations: React.FC<InputValidationsProps> = ({
  value,
  cases,
  hidden,
  children,
}) => {
  const [resultValues, setResultValues] = useState<ValueState[]>([]);

  useEffect(() => {
    const nextResultValues = cases.map((testCase) => {
      const result = testCase.schema.validate(value);

      return result.error ? ValueState.Invalid : ValueState.Valid;
    });

    setResultValues(nextResultValues);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  
  return (
    <>
      {children}

      <div css={[styles.root, conditionalCss(hidden, styles.hidden)]}>
        {cases.map((currentCase, i) => {
          let valueState = resultValues[i] || ValueState.Indeterminate;

          return (
            <Grid container alignItems="center">
              <DisplayValueState state={valueState} />
              {typeof currentCase.text === "string" && <Typography variant="caption">&nbsp;{currentCase.text}</Typography>}
            </Grid>
          );
        })}
      </div>
    </>
  )
}