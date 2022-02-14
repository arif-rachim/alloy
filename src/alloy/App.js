import {useEffect} from "react";
import Group from "./layout/Group";
import classes from "./App.module.css";
function setupViewPort() {
    const meta = document.createElement('meta');
    meta.setAttribute('name', 'viewport');
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    document.head.appendChild(meta);
    document.body.style.margin = '0px';
    document.body.style.padding = '0px';
    document.body.style.boxSizing = 'border-box';
}

function setupBaseFontSize(){
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

export default function App({...props}) {
    // first we need to setup the html configuration here !
    useEffect(setupViewPort, []);
    useEffect(setupBaseFontSize, []);
    useEffect(visibleWhenFontsAreReady, []);
    return <Group className={classes.container}>{props.children}</Group>;
}