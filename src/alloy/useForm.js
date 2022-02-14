import {createContext, useCallback, useMemo} from "react";
import {useObserver} from "react-hook-useobserver/lib/useObserver";

export const FormContext = createContext({
    $formState: undefined,
    setFormState: undefined,
    $formErrors: undefined,
    setFormErrors: undefined
});


function handleOnSubmit(onSubmit) {
    return function submit(event) {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }
        return false;
    }
}

export default function useForm(initialValue) {
    const [$formState, setFormState] = useObserver(initialValue);
    const [$formErrors, setFormErrors] = useObserver({});
    const isValid = useCallback(function isValid() {
        return Object.keys($formErrors.current).length === 0;
    },[]);
    const Form = useMemo(() => {
        return function Form({onSubmit, ...props}) {
            return <FormContext.Provider value={{$formState, setFormState, $formErrors, setFormErrors}}>
                <form onSubmit={handleOnSubmit(onSubmit)}>
                    {props.children}
                </form>
            </FormContext.Provider>
        }
    }, [$formState, setFormState, $formErrors, setFormErrors]);

    return {$formState, setFormState, Form, $formErrors, setFormErrors, isValid};
}