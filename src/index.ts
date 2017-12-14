export type Optional<T> = { [P in keyof T]?: T[P]; };

export interface IAdditionalProps<T> {
    ref?: (element: T) => void;
}

export type IndexSignature = { [key: string]: any; };

export type Child = string | number | HTMLElement;

declare global {
    namespace JSX {
        type Element = HTMLElement;

        type IntrinsicElements = {
            [P in keyof HTMLElementTagNameMap]: Optional<HTMLElementTagNameMap[P]> & IAdditionalProps<HTMLElementTagNameMap[P]>;
        }
    }
}

export function createElement<P extends keyof HTMLElementTagNameMap>(
    elementName: P,
    props?: Optional<HTMLElementTagNameMap[P]> & IAdditionalProps<HTMLElementTagNameMap[P]> & IndexSignature,
    ...children: Child[],
): HTMLElementTagNameMap[P] & IAdditionalProps<HTMLElementTagNameMap[P]> {
    const element = document.createElement(elementName) as HTMLElementTagNameMap[P] & IndexSignature;

    for (const child of children) {
        if (child instanceof HTMLElement) {
            element.appendChild(child);
            continue;
        }

        element.innerText = String(child);
    }
    
    if (props != undefined) {
        for (const key of Object.keys(props)) {
            if (key in element) {
                element[key] = props[key];
            } else {
                element.setAttribute(key, props[key]);
            }
        }

        if (props.ref != undefined) {
            props.ref(element);
        }
    }

    return element as HTMLElementTagNameMap[P] & IAdditionalProps<HTMLElementTagNameMap[P]>;
}
