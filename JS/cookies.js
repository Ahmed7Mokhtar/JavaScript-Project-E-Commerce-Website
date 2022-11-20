function CreateCookie(Key, Value, Exp) {
    if (Key != "" && Value != "" && Exp instanceof Date) {
        document.cookie = `${Key}=${Value};expires=${Exp.toUTCString()}`;
        return true;
    }
    else {
        var error = new TypeError("Inputs was not in the correct format");
        throw error;
    }
}

function DeleteCookie(Key) {
    var Exp = new Date();
    Exp.setDate(Exp.getDate() - 1);
    document.cookie = `${Key}=;expires=${Exp.toUTCString()}`;
    return true;
}

function AllCookies() {
    if (document.cookie) {
        var KeyValueArray = [];
        //"username=Mrihan; Branch=Minia"
        var CookieString = document.cookie;
        //["username=Mrihan","Branch=Minia"]
        var CookiePairs = CookieString.split("; ");
        for (pair of CookiePairs) {
            //["username","Mrihan"]
            //["Branch","Minia"]
            var keyValue = pair.split("=");
            //KeyValueArray["Username"] = "Mrihan"
            //KeyValueArray["Branch"] = "Minia"
            KeyValueArray[keyValue[0]] = keyValue[1];
        }
        return KeyValueArray;
    }
    else {
        var error = new Error("No Cookies Found");
        throw error;
    }
}

function GetCookie(Key) {
    var CookiesArray = AllCookies();
    if (CookiesArray[Key]) {
        return CookiesArray[Key];
    }
    else {
        var error = new Error("Key not Found");
        throw error;
    }
}