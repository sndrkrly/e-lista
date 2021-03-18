/* 
    Created by Sándor Király on 03/17/21.

    Copyright © Sándor Király.
    All rights reserved.
*/

function initCookie(name, value, days) {  
    var currentlyDate = new Date();
    currentlyDate.setTime(currentlyDate.getTime() + (days * 24 * 60 * 60 * 1000));

    var expires = "expires=" + currentlyDate.toGMTString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    name = name + "=";

    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }

        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}