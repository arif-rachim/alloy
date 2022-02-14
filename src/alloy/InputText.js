import classes from "./InputText.module.css";
import {useContext, useEffect} from "react";
import {FormContext} from "./useForm";
import {useObserverListener} from "react-hook-useobserver/lib/useObserverListener";
import Label from "./Label";
import {useObserver} from "react-hook-useobserver/lib/useObserver";
import {ObserverValue} from "react-hook-useobserver/lib/ObserverValue"

/**
 *
 * @param {function({value,old,event}):void} onChange
 * @param {string} value
 * @param {function(event):void} onFocus
 * @param {boolean} autoFocus
 * @param {function(event):void} onClick
 * @param {function(event):void} onBlur
 * @param {string} name
 * @param {string} label
 * @returns  {JSX.Element}
 * @constructor
 */
export default function InputText({
                                      value, onChange,
                                      onFocus, autoFocus, name, onClick, onBlur,
                                      label
                                  }) {
    // noinspection JSCheckFunctionSignatures
    const formContext = useContext(FormContext);
    useObserverListener(formContext.$formState, formState => {
        const newVal = formState ? formState[name] : undefined;
        setVal(newVal);
    })

    const [$val, setVal] = useObserver(() => {
        if (value) {
            return value;
        }
        if (formContext?.$formState?.current) {
            return formContext?.$formState?.current[name];
        }
    });


    useEffect(() => {
        if(value === undefined){
            return;
        }
        setVal(old => {
            if (value === old) {
                return old;
            }
            return value;
        });
    }, [value]);

    function handleOnChange(event) {
        const newValue = event.target.value;
        formContext.setFormState(old => {
            const oldValue = old[name];
            if (onChange) {
                const exit = onChange({value: newValue, oldValue, event, formContext});
                if (exit === false || event.isDefaultPrevented) {
                    return old;
                }
            }
            return {...old, [name]: newValue}
        })
    }


    if (label) {
        return <Label label={label} valueOf={name}>
            <ObserverValue observers={$val} render={(val) => {

                return <input type={'text'} className={classes.inputText} onChange={handleOnChange} value={val || ''}
                              onFocus={onFocus} autoFocus={autoFocus}
                              name={name}
                              onClick={onClick}
                              onBlur={onBlur}
                />
            }}>
            </ObserverValue>
        </Label>
    }
    return <ObserverValue observers={$val} render={(val) => {
        return <input type={'text'} className={classes.inputText} onChange={handleOnChange} value={val || ''}
                      onFocus={onFocus} autoFocus={autoFocus}
                      name={name}
                      onClick={onClick}
                      onBlur={onBlur}
        />
    }}>
    </ObserverValue>;
}