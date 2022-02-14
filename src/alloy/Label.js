import Group from "./layout/Group";
import {createContext, useContext, useMemo} from "react";
import classes from "./Label.module.css";
import Text from "./Text";

/**
 *
 * @param {boolean} isHorizontal
 * @param {string} label
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Label({label,valueOf, ...props}) {
    const labelGroupValue = useContext(LabelGroupContext);
    const isHorizontal = labelGroupValue?.isHorizontal;
    const widthRem = labelGroupValue?.widthRem;
    return <label className={classes.marginBottom} >
        <Group isHorizontal={isHorizontal} verticalAlign={"center"}>
            <Text style={{width: widthRem ? widthRem + 'rem' : undefined, flexShrink: 0}}>{label}</Text>
            <Group className={classes.flexGrow}>{props.children}</Group>
        </Group>
    </label>
}
const LabelGroupContext = createContext({isHorizontal: false, labelWidth: undefined});

/**
 *
 * @param {boolean} isHorizontal
 * @param {number} widthRem - with in REM
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export function LabelGroup({isHorizontal=true, widthRem, ...props}) {
    const contextValue = useMemo(() => ({isHorizontal, widthRem}), [isHorizontal, widthRem]);
    return <LabelGroupContext.Provider value={contextValue}>
        {props.children}
    </LabelGroupContext.Provider>
}