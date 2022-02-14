import hClass from "./Horizontal.module.css";
import vClass from "./Vertical.module.css";
import {useMemo} from "react";

function lookVerticalAlign(isHorizontal, position) {
    return ({
        top: (isHorizontal ? hClass : vClass).alignTop,
        bottom: (isHorizontal ? hClass : vClass).alignBottom,
        center: (isHorizontal ? hClass : vClass).alignVerticalCenter
    })[position];
}

function lookHorizontalAlign(isHorizontal, position) {
    return ({
        left: (isHorizontal ? hClass : vClass).alignLeft,
        right: (isHorizontal ? hClass : vClass).alignRight,
        center: (isHorizontal ? hClass : vClass).alignHorizontalCenter
    })[position];
}

/**
 *
 * @param {boolean} isHorizontal
 * @param {'top' | 'bottom' | 'center'} verticalAlign
 * @param {'left' | 'right' | 'center'} horizontalAlign
 * @param {string} className
 * @param {*} style
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Group({isHorizontal, verticalAlign, horizontalAlign, className, style, ...props}) {
    const summaryClassName = useMemo(() => {
        const clazz = [isHorizontal ? hClass.container : vClass.container];
        verticalAlign && clazz.push(lookVerticalAlign(isHorizontal, verticalAlign));
        horizontalAlign && clazz.push(lookHorizontalAlign(isHorizontal, verticalAlign));
        className && clazz.push(className);
        return clazz.join(' ');
    }, [verticalAlign, horizontalAlign, isHorizontal, className])
    return <div className={summaryClassName} style={style}>{props.children}</div>
}