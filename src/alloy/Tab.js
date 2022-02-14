import {useRef} from "react";
import Group from "./layout/Group";
import {useObserver} from "react-hook-useobserver/lib/useObserver";
import {useObserverListener} from "react-hook-useobserver/lib/useObserverListener";

export default function Tab({...properties}) {
    const [$selectedTabIndex, setSelectedTabIndex] = useObserver(0);
    const tabItems = useRef(properties.children.filter(c => c?.type?.name === TabItem.name).map(t => t.props)).current;
    const containerRef = useRef();
    const parentContainerRef = useRef();
    useObserverListener($selectedTabIndex, selectedTabIndex => {
        const width = parentContainerRef.current.offsetWidth;
        containerRef.current.style.left = `-${selectedTabIndex * width}px`;
    })
    return <Group style={{flexBasis: '100%', flexGrow: 0}}>
        <Group ref={parentContainerRef} style={{overflow: 'hidden', flexGrow: 1, width: '100vw'}}>
            <Group ref={containerRef} isHorizontal={true}
                   style={{flexGrow: 1, position: 'relative', left: 0, transition: 'left 300ms ease-in-out'}}>
                {tabItems.map((tabItem, index) => {
                    const {component: Component} = tabItem;
                    return <Component key={index} tabItem={tabItem} $selectedTabIndex={$selectedTabIndex}
                                      tabIndex={index} setSelectedTabIndex={setSelectedTabIndex}/>
                })}
            </Group>
        </Group>
        <Group isHorizontal={true}
               style={{borderTop: '1px solid #ccc', padding: '0.5rem 0rem', backgroundColor: '#F5F5F5'}}>
            {tabItems.map((tabItem, index) => {
                const {button: Button} = tabItem;
                return <Button key={index} tabItem={tabItem} $selectedTabIndex={$selectedTabIndex} tabIndex={index}
                               setSelectedTabIndex={setSelectedTabIndex}/>
            })}
        </Group>
    </Group>
}

export function TabItem({button, component}) {

    return false;
}
