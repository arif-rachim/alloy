import App from "./alloy/App";
import Group from "./alloy/layout/Group";
import Tab, {TabItem} from "./alloy/Tab";
import {
    IoHome,
    IoHomeOutline,
    IoMedal,
    IoMedalOutline,
    IoPeopleCircle,
    IoPeopleCircleOutline,
    IoPersonCircle,
    IoPersonCircleOutline,
} from "react-icons/io5";
import HomePanel from "./app/HomePanel";
import IndustryExpertPanel from "./app/IndustryExpertPanel";
import AccountAndSettingsPanel from "./app/AccountAndSettingsPanel";
import TaskAndGoalPanel from "./app/TaskAndGoalPanel";
import {useObserverValue} from "react-hook-useobserver/lib/useObserverValue";
import {useObserver} from "react-hook-useobserver/lib/useObserver";
import {createContext, useEffect} from "react";

export const ApplicationContext = createContext({
    $state: undefined, setState: () => {
    }
});
export default function Application() {
    const [$state, setState] = useObserver({});
    useEffect(() => {
        (async () => {
            const result = await fetch('https://randomuser.me/api/');
            const person = await result.json();
            setState(old => ({...old, user: person.results[0]}));
        })();
    }, []);
    return <ApplicationContext.Provider value={{$state, setState}}><App>
        <Tab>
            <TabItem button={TabButton}
                     icon={IoHomeOutline}
                     iconSelected={IoHome}
                     component={HomePanel}/>
            <TabItem button={TabButton} icon={IoPeopleCircleOutline}
                     iconSelected={IoPeopleCircle}
                     component={IndustryExpertPanel}/>
            <TabItem button={TabButton} icon={IoMedalOutline}
                     iconSelected={IoMedal}
                     component={TaskAndGoalPanel}/>
            <TabItem button={TabButton} icon={IoPersonCircleOutline}
                     iconSelected={IoPersonCircle}
                     component={AccountAndSettingsPanel}/>
        </Tab>
    </App>
    </ApplicationContext.Provider>
}

function TabButton({tabItem, tabIndex, $selectedTabIndex, setSelectedTabIndex, ...props}) {
    const isSelected = useObserverValue($selectedTabIndex) === tabIndex;
    const Icon = isSelected ? tabItem.iconSelected : tabItem.icon;
    return <Group style={{flexGrow: 1, color: isSelected ? '#000' : '#666'}} horizontalAlign={'center'}
                  onClick={() => setSelectedTabIndex(tabIndex)}>

        <Icon size={'2rem'}/>

    </Group>
}
