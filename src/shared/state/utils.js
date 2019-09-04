import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

export const TOKEN_NAME = 'bollingerToken';

const httpLink = createHttpLink({
    uri: process.env.REACT_APP_API
});

const authLink = setContext((_, { headers }) => {
    const token = getCookie(TOKEN_NAME);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Origin': '*'
        }
    };
});

export const client = new ApolloClient({
    uri: process.env.REACT_APP_API,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
};
export const getCookie = name => {
    let nameEQ = name + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};
export const eraseCookie = name => {
    document.cookie = name + '=; Max-Age=-99999999;';
};

export function debounce(f, interval) {
    let timer = null;

    return (...args) => {
        clearTimeout(timer);
        return new Promise(resolve => {
            timer = setTimeout(async () => {
                const result = await f(...args);
                resolve(result);
            }, interval);
        });
    };
}
