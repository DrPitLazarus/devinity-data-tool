import fmRoundsList from './fmRoundsList';
import fmRoundsDetails from './fmRoundsDetails';

function isPathExecute(target, callback) {
    location.pathname === target && callback();
}

isPathExecute('/fmRoundsList', fmRoundsList);
isPathExecute('/fmRoundsDetails', fmRoundsDetails);
