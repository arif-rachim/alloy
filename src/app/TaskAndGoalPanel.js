import Group from "../alloy/layout/Group";
import Text from "../alloy/Text";

export default function TaskAndGoalPanel() {
    return <Group style={{flexBasis: '100vw', flexGrow: 0, flexShrink: 0}}>
        <Text size={1.3} style={{padding: '1rem'}}>Task and Goal</Text>
        <Group style={{padding: '0rem 1rem'}}>
            <Text>You may view pending tasks and goals here. These objectives and activities are established by your
                coach, who will continue to provide you with targets based on your own growth progress.</Text>
        </Group>
    </Group>
}