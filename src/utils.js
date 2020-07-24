import * as CONFIG from './config';

export function checkJWTValidate() {
    var token = localStorage.getItem("user-memorize-token");
    if(token === null) {
        return false;
    }
    var jwt = require('jsonwebtoken');
    var chk = jwt.verify(token, CONFIG.SECRET_KEY, (err, decode) => {
        if(err){
            return false;
        }
        return true;
    })
    return chk;
}

export function getRandomDouble(mini, maxm){
    return Math.random()*(maxm-mini)+mini;
}

export function getFontSizeStable(rate){
    var size = Math.floor(rate*1.5);
    if(size < 12) return 12;
    if(size >= 12 && size < 14) return 12;
    if(size >= 14 && size < 16) return 14;
    if(size >= 16 && size < 18) return 16;
    if(size >= 18 && size < 20) return 18;
    if(size > 20) return 20;
}

export function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
  
      // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}
