import { resourceI, is_pressedI,
         effectOptionsI, userEffectOptionsI, enableEffectFuncI } from "./types";
import { preProcessElement, preProcessElements, preProcessSelector,
         enableNormalBackgroundEffetcs, enableChildrenBackgroundEffetcs,
         enableNormalClickEffects,      enableChildrenClickEffects,
         enableBorderEffects } from "./helpers";

// ** Option *******************************************************************
function applyEffectOption(userOptions: userEffectOptionsI): effectOptionsI {
    const defaultOptions: effectOptionsI = {
        lightColor: "rgba(255,255,255,0.25)",
        gradientSize: 150,
        clickEffect: false,
        isContainer: false,
        children: {
            borderSelector: ".eff-reveal-border",
            elementSelector: ".eff-reveal",
            lightColor: "rgba(255,255,255,0.25)",
            gradientSize: 150
        }
    };

    return Object.assign(defaultOptions, userOptions);
}

// ** Children Effect **********************************************************
function applyChildrenElementEffect(
    resource: resourceI, options: effectOptionsI, is_pressed: is_pressedI,
    enableBackgroundEffectsFunc: enableEffectFuncI, enableClickEffectsFunc: enableEffectFuncI
) {
    enableBackgroundEffectsFunc(resource, options, is_pressed);

    if (options.clickEffect) {
        enableClickEffectsFunc(resource, options, is_pressed);
    }
}

function applyChildrenEffect(
    resources: resourceI[], options: effectOptionsI, is_pressed: is_pressedI,
    enableBackgroundEffectsFunc: enableEffectFuncI, enableClickEffectsFunc: enableEffectFuncI
) {
    const resourceL = resources.length;

    for(let i = 0; i < resourceL; i++) {
        const resource = resources[i];
        applyChildrenElementEffect(resource, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
}

// ** Container Effect *********************************************************
function applyContainerElementEffect(
    resource: resourceI, options: effectOptionsI, is_pressed: is_pressedI,
    enableBackgroundEffectsFunc: enableEffectFuncI, enableClickEffectsFunc: enableEffectFuncI
) {
    // Container
    const childrenBorders = preProcessSelector(options.children.borderSelector);
    enableBorderEffects(resource, childrenBorders, options, is_pressed);

    // Children
    const childrens = preProcessSelector(options.children.elementSelector);
    applyChildrenEffect(childrens, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
}

function applyContainerEffect(
    resources: resourceI[], options: effectOptionsI, is_pressed: is_pressedI,
    enableBackgroundEffectsFunc: enableEffectFuncI, enableClickEffectsFunc: enableEffectFuncI
) {
    const resourceL = resources.length;

    for(let i = 0; i < resourceL; i++) {
        const resource = resources[i];
        applyContainerElementEffect(resource, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
}

// ** Apply Effect *************************************************************
export function applyElementEffect(element: HTMLElement, userOptions: userEffectOptionsI = {}) {
    const is_pressed: is_pressedI = [false];
    const options  = applyEffectOption(userOptions);
    const resource = preProcessElement(element);

    if (!options.isContainer) {
        const enableBackgroundEffectsFunc = enableNormalBackgroundEffetcs;
        const enableClickEffectsFunc      = enableNormalClickEffects;
        applyChildrenElementEffect(resource, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
    else {
        const enableBackgroundEffectsFunc = enableChildrenBackgroundEffetcs;
        const enableClickEffectsFunc      = enableChildrenClickEffects;
        applyContainerElementEffect(resource, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
}

export function applyElementsEffect(elements: NodeListOf<HTMLElement>, userOptions: userEffectOptionsI = {}) {
    const is_pressed: is_pressedI = [false];
    const options   = applyEffectOption(userOptions);
    const resources = preProcessElements(elements);

    if (!options.isContainer) {
        const enableBackgroundEffectsFunc = enableNormalBackgroundEffetcs;
        const enableClickEffectsFunc      = enableNormalClickEffects;
        applyChildrenEffect(resources, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
    else {
        const enableBackgroundEffectsFunc = enableChildrenBackgroundEffetcs;
        const enableClickEffectsFunc      = enableChildrenClickEffects;
        applyContainerEffect(resources, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
}

export function applyEffect(selector: string, userOptions: userEffectOptionsI = {}) {
    const is_pressed: is_pressedI = [false];
    const options  = applyEffectOption(userOptions);
    const resoures = preProcessSelector(selector);

    if (!options.isContainer) {
        const enableBackgroundEffectsFunc = enableNormalBackgroundEffetcs;
        const enableClickEffectsFunc      = enableNormalClickEffects;
        applyChildrenEffect(resoures, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
    else {
        const enableBackgroundEffectsFunc = enableChildrenBackgroundEffetcs;
        const enableClickEffectsFunc      = enableChildrenClickEffects;
        applyContainerEffect(resoures, options, is_pressed, enableBackgroundEffectsFunc, enableClickEffectsFunc);
    }
}
