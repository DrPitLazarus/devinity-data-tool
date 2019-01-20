const isDev = true;
const apiUrl = isDev ? 'https://ddtapi.now.sh/api' : '/api'

function debug(...msg) {
    if (debug) console.log(...msg);
}

function handleFetchErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json();
}