import Group from "../alloy/layout/Group";
import Text from "../alloy/Text";

export default function IndustryExpertPanel() {
    return <Group style={{flexBasis: '100vw', flexGrow: 0, flexShrink: 0}}>
        <Text size={1.3} style={{padding: '1rem'}}>Industry Expert</Text>
        <Group style={{padding: '0rem 1rem'}}>
            <Text>We are extremely selective in recruiting industry expertise to join our team. Our industry experts are
                individuals with a minimum of five years of experience in their field. They are accredited and certified
                on an international level. You must first talk with your career coach before consulting with our
                industry specialists.</Text>
            <Text style={{marginTop: '1rem'}}>Consider yourself a professional athlete; your coach serves as your
                manager, always monitoring your progress. Meanwhile, industry specialists are highly skilled expert who
                command a premium hourly fee in the field in which they operate. That is why, when you begin a session
                with an industry expert, you must be in the finest possible condition.</Text>
        </Group>

    </Group>
}