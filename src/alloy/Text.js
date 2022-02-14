
import classes from "./Text.module.css";

/**
 *
 * @param {number} size - size in rem
 * @param {*} style
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Text({size=1,style,...props}){
    const fontClass = size > 1.33 ? classes.display : classes.text;
    return <span className={fontClass} style={{fontSize:`${size}rem`,fontWeight:'lighter',...style}}>{props.children}</span>
}