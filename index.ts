export type Optional<T> = { [P in keyof T]?: T[P]; };

export interface IAdditionalProps<T> {
    ref?: (element: T) => void;
}

export type Child = string | number | HTMLElement;

declare global {
    namespace JSX {
        type Element = HTMLElement;

        type IntrinsicElements = {
            [P in keyof HTMLElementTagNameMap]: Optional<HTMLElementTagNameMap[P]> & IAdditionalProps<HTMLElementTagNameMap[P]>;
        }
    }
}

export function createElement<T extends HTMLElement>(
    elementName: string,
    props?: Optional<T> & IAdditionalProps<T>,
    ...children: Child[],
): T {
    const element = document.createElement(elementName) as T;

    for (const child of children) {
        if (child instanceof HTMLElement) {
            element.appendChild(child);
            continue;
        }

        element.innerText = String(child);
    }
    
    if (props != undefined) {
        Object.assign(element, props);

        if (props.ref != undefined) {
            props.ref(element);
        }
    }

    return element;
}
