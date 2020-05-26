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

