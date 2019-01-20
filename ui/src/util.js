import { isDev } from './vars';

function devLog(...msg) {
    if (isDev) console.info(...msg);
}

function setHash(arrData) {
    location.hash = (arrData.map(el => el.join('='))).join('&');
}

export { devLog, setHash };