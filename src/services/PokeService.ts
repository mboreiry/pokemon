import { pokeUrl } from "../config/config";

export async function fetchUrl(url: string) {
    // await delay(1000);
    return execute(url, null);
}

export function getPokeId(url: string) {
    const tmpUrl = (url.charAt(url.length - 1) === '/') ? url.substr(0, url.length - 1) : url;
    return tmpUrl.substr(tmpUrl.lastIndexOf('/') + 1);
}

export async function getPokeImage(id: string) {
    // await delay(1000);
    return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
}

export async function getSpecies(id: number) {
    if (id) {
        return execute(`${pokeUrl}-species/${id}`, null);
    }
}

async function execute(edge: string, defaultValue: any): Promise<any> {
    // all the services can be call with this function, 
    // so error handling can be handled and change in one point
    try {
        const response = await fetch(edge);
        if (response.status < 300) {
            const data = await response.json();
            return data;
        } else {
            onError("error ocurred Response status : " + response.status);
            return defaultValue;
        }
    } catch (ex) {
        onError(ex);
        return defaultValue;
    }
}

export function delay(millis: number): Promise<void> {
    return new Promise(resolve => setInterval(() => resolve(), millis))
}

function onError(ex: string) {
    // log error
    console.log("error-", ex);
}