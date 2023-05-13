import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { Close, Done, FiberManualRecordOutlined } from "@mui/icons-material";
import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { conditionalCss } from "../../helpers";
import { styles } from "./inputValidations.styles";
import { ValueState } from "../../lib";
const DisplayValueState = ({ state }) => {
    switch (state) {
        case ValueState.Valid: return _jsx(Done, { fontSize: "small", htmlColor: "green" });
        case ValueState.Invalid: return _jsx(Close, { fontSize: "small", htmlColor: "red" });
        default: return _jsx(FiberManualRecordOutlined, { fontSize: "small" });
    }
};
export const InputValidations = ({ value, cases, hidden, children, }) => {
    const [resultValues, setResultValues] = useState([]);
    useEffect(() => {
        const nextResultValues = cases.map((testCase) => {
            const result = testCase.schema.validate(value);
            return result.error ? ValueState.Invalid : ValueState.Valid;
        });
        setResultValues(nextResultValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return (_jsxs(_Fragment, { children: [children, _jsx("div", Object.assign({ css: [styles.root, conditionalCss(hidden, styles.hidden)] }, { children: cases.map((currentCase, i) => {
                    let valueState = resultValues[i] || ValueState.Indeterminate;
                    return (_jsxs(Grid, Object.assign({ container: true, alignItems: "center" }, { children: [_jsx(DisplayValueState, { state: valueState }), typeof currentCase.text === "string" && _jsxs(Typography, Object.assign({ variant: "caption" }, { children: ["\u00A0", currentCase.text] }))] })));
                }) }))] }));
};
