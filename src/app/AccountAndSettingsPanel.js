import Group from "../alloy/layout/Group";
import Text from "../alloy/Text";
import {useObserverValue} from "react-hook-useobserver/lib/useObserverValue";
import {useContext} from "react";
import {ApplicationContext} from "../Application";
import Button from "../alloy/Button";
import {IoCreateOutline} from "react-icons/io5";

export default function AccountAndSettingsPanel() {
    const appState = useContext(ApplicationContext);
    const user = useObserverValue(appState.$state, (state) => state?.user);
    return <Group style={{flexBasis: '100vw', flexGrow: 0, flexShrink: 0}}>
        <Group style={{backgroundColor: '#F6F6F6', borderBottom: '1px solid #CCC', marginBottom: '1rem'}}>
            <Text size={1.4} style={{padding: '0.5rem'}}>Account and Settings</Text>
        </Group>
        <Group style={{padding: '0rem 1rem', flexGrow: 1}}>
            <Group isHorizontal={true}
                   style={{borderBottom: `1px solid #CCC`, paddingBottom: '0.5rem', marginBottom: '0.5rem'}}>
                <Group style={{flexGrow: 1}}>
                    <Text size={1.3}>{user?.name?.title} {user?.name?.first} {user?.name?.last}</Text>
                    <Text size={1}>{user?.login?.username}</Text>
                    <Text size={1}>{user?.email}</Text>
                </Group>
                <Group>
                    <img src={user?.picture?.medium}
                         style={{borderRadius: '3rem', border: '1px solid #CCC', width: 50, height: 50}}></img>
                </Group>
            </Group>
            <Group style={{borderBottom: `1px solid #CCC`, paddingBottom: '0.5rem', marginBottom: '0.5rem'}}>
                <Text size={1}>{user?.dob?.age} Years</Text>
                <Text size={1.2}>{user?.location?.city}, {user?.location?.country}</Text>
                <Text size={1}>{user?.cell}</Text>
            </Group>
        </Group>
        <Group>
            <Button style={{backgroundColor: '#DDD'}}>
                <Group isHorizontal={true} verticalAlign={'center'} horizontalAlign={'center'}>
                    <IoCreateOutline size={'1.5rem'}/>
                    <Text>Edit Profile</Text>
                </Group>
            </Button>
        </Group>
    </Group>
}