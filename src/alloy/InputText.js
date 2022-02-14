import classes from "./InputText.module.css";
import {useContext, useEffect} from "react";
import {FormContext} from "./useForm";
import {useObserverListener} from "react-hook-useobserver/lib/useObserverListener";
import Label from "./Label";
import {useObserver} from "react-hook-useobserver/lib/useObserver";
import {ObserverValue} from "react-hook-useobserver/lib/ObserverValue"

function onValueChange(value, setVal) {
    return function valueChange() {
        if (value === undefined) {
            return;
        }
        setVal(old => {
            if (value === old) {
                return old;
            }
            return value;
        });
    };
}

function observerInitialValue(value, formContext, name) {
    return function getInitialValue() {
        if (value) {
            return value;
        }
        if (formContext?.$formState?.current) {
            return formContext?.$formState?.current[name];
        }
    };
}

function onFormStateChange(name, setVal) {
    return function handleFormStateChange(formState) {
        const newVal = formState ? formState[name] : undefined;
        setVal(newVal);
    }
}

function onFormErrorsChange(name, setErrors) {
    return function handleFormErrorChange(formErrors) {
        const errors = formErrors ? formErrors[name] : undefined;
        setErrors(errors);
    }
}

/**
 *
 * @param {function({value,old,event,formContext}):void} onChange
 * @param {string} value
 * @param {function(event):void} onFocus
 * @param {boolean} autoFocus
 * @param {function(event):void} onClick
 * @param {function(event):void} onBlur
 * @param {function({value,old,event,formContext}):[string]} validator
 * @param {string} name
 * @param {string} label
 * @returns  {JSX.Element}
 * @constructor
 */
export default function InputText({
                                      value, onChange,
                                      onFocus, autoFocus, name, onClick, onBlur,
                                      label, validator
                                  }) {
    // noinspection JSCheckFunctionSignatures
    const formContext = useContext(FormContext);
    const [$val, setVal] = useObserver(observerInitialValue(value, formContext, name));
    const [$errors, setErrors] = useObserver({});
    useObserverListener(formContext.$formState, onFormStateChange(name, setVal));
    useObserverListener(formContext.$formErrors, onFormErrorsChange(name, setErrors));
    useEffect(onValueChange(value, setVal), [value]);

    function handleOnChange(event) {
        const newValue = event.target.value;
        // first validate against validator
        if (validator) {
            let errors = validator({value: newValue, oldValue: $val.current, event, formContext});
            formContext.setFormErrors(oldErrors => {
                if (errors) {
                    if (typeof errors === 'string') {
                        errors = [errors];
                    }
                    return {...oldErrors, [name]: errors};
                }
                const newErrors = {...oldErrors};
                delete newErrors[name];
                return newErrors;
            })
        }

        // now update the state
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


    return <Label label={label} valueOf={name}>
        <ObserverValue observers={$val} render={(val) => {
            const errors = $errors.current;
            const classNames = [classes.inputText];
            if (errors && errors.length > 0) {
                classNames.push(classes.errors);
            } else {
                classNames.push(classes.normal);
            }
            return <input type={'text'} className={classNames.join(' ')} onChange={handleOnChange} value={val || ''}
                          onFocus={onFocus} autoFocus={autoFocus}
                          name={name}
                          onClick={onClick}
                          onBlur={onBlur}
            />
        }}>
        </ObserverValue>
    </Label>
}