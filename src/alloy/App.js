import {Component, useEffect, useRef} from "react";
import Group from "./layout/Group";
import classes from "./App.module.css";
import Text from "./Text";

function setupViewPort() {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    document.head.appendChild(meta);

}

function setupBaseFontSize() {
    document.body.style.fontSize = '16px';
}

function visibleWhenFontsAreReady() {
    document.body.style.transition = 'opacity 300ms ease-in-out'

    async function isReady() {
        let ready = await document['fonts'].ready;
        if (ready) {
            document.body.style.opacity = '1';
        }
    }

    isReady().then();
}

function setupViewPortHeight(groupRef) {
    return function setViewPortHeight() {
        document.body.style.margin = '0px';
        document.body.style.padding = '0px';
        document.body.style.height = '100%';
        document.body.parentElement.style.height = '100%'
        document.body.style.boxSizing = 'border-box';
        groupRef.current.parentElement.style.height = '100%';
    };
}

export default function App({...props}) {
    // first we need to setup the html configuration here !
    const groupRef = useRef();
    useEffect(setupViewPort, []);
    useEffect(setupBaseFontSize, []);
    useEffect(visibleWhenFontsAreReady, []);
    useEffect(setupViewPortHeight(groupRef), []);
    return <ErrorBoundary>
        <Group ref={groupRef} className={classes.container}>{props.children}</Group>
    </ErrorBoundary>;
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        //logErrorToMyService(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Group horizontalAlign={'center'} style={{height: '100vh'}} verticalAlign={'center'}><Text
                style={{textAlign: 'center'}}>Something went wrong.</Text></Group>;
        }
        return this.props.children;
    }
}