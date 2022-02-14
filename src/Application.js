import App from "./alloy/App";
import Text from "./alloy/Text";
import InputText from "./alloy/InputText";
import Group from "./alloy/layout/Group";
import {LabelGroup} from "./alloy/Label";
import Form from "./alloy/useForm";
import useForm from "./alloy/useForm";
import {ObserverValue} from "react-hook-useobserver/lib/ObserverValue";

export default function Application() {
    const {Form,$formState} = useForm({name:'Arif',age:40});
    return <App>
        <Group>
            <ObserverValue observers={$formState} render={(value) => {
                return <Text>{JSON.stringify(value)}</Text>
            }}/>
            <Form>
                <Text size={2}>Hello World</Text>
                <LabelGroup widthRem={10}>
                    <InputText name={"name"} label={'Name'} />
                    <InputText name={"age"} label={'Age'} />
                </LabelGroup>
            </Form>
        </Group>
    </App>
}