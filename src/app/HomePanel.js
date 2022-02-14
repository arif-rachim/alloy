import Group from "../alloy/layout/Group";
import Text from "../alloy/Text";
import {ApplicationContext} from "../Application";
import {useObserverValue} from "react-hook-useobserver/lib/useObserverValue";
import {useContext} from "react";

export default function HomePanel() {
    const appState = useContext(ApplicationContext);
    const user = useObserverValue(appState.$state, (state) => state?.user);
    return <Group style={{flexBasis: '100vw', flexGrow: 0, flexShrink: 0}}>
        <Text size={1.3} style={{padding: '1rem'}}>Hello {user?.name?.first},</Text>
        <Group style={{padding: '0rem 1rem'}}>
            <Text>This is the home page for your account. You may check who is presently mentoring you, when you should
                plan a session with your mentor, and view crucial messages.
                You must pay close attention to the upcoming session's timetable.</Text>
            <Text style={{marginTop: '1rem'}}>At the moment, you have not chosen a career path. Not to worry; we're here
                to assist you in
                identifying a career path that matches your interests and abilities.</Text>
        </Group>

    </Group>
}