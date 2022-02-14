import classes from "./Button.module.css";

/**
 *
 * @param {function(event):void} onClick
 * @param disabled
 * @param style
 * @param disabled
 * @param style
 * @param {any} props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Button({onClick, disabled, style, ...props}) {
    return <button className={classes.button} disabled={disabled} type={"button"} onClick={onClick}
                   style={style}>{props.children}</button>
}