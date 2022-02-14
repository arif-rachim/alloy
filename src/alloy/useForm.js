import {createContext, useMemo} from "react";
import {useObserver} from "react-hook-useobserver/lib/useObserver";

export const FormContext = createContext({$formState: undefined, setFormState: undefined});


function handleOnSubmit(onSubmit) {
    return function submit(event) {
        event.preventDefault();
        if (onSubmit) {
            onSubmit(event);
        }
        return false;
    }
}

export default function useForm(initialValue){
    const [$formState, setFormState] = useObserver(initialValue);

    const Form = useMemo(() => {
        return function Form({onSubmit, ...props}){
            return <FormContext.Provider value={{$formState, setFormState}}>
                <form onSubmit={handleOnSubmit(onSubmit)}>
                    {props.children}
                </form>
            </FormContext.Provider>
        }
    },[$formState, setFormState]);

    return {$formState,setFormState,Form};
}