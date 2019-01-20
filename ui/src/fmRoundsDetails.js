import { apiPath } from './vars';
import { devLog } from './util';


class FMRoundsDetails {

    constructor() {
        this.setRoundID();
    }

    setResult() {

    }

    setRoundID() {
        let hash = location.hash;
        if (hash.indexOf('#id=') >= 0) {
            let id = hash.substring(4);
            devLog("pathAfterSubstring", id)
            if (/^\d+$/.test(id)) {
                devLog('id is true', id)
            }
                
        }
            
    }
} 


export default function() {
    new FMRoundsDetails();
}