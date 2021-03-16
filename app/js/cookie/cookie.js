/* 
    Created by Király Sándor on 03/16/21.

    Copyright © Király Sándor.
    All rights reserved.
*/

import '../jquery/jquery-3.6.0.min.js';

$(window).ready(function() {
    checkCookie();
});

function initCookie(name, value, days) {  
    var currentlyDate = new Date();
    currentlyDate.setTime(
        currentlyDate.getTime() + (days * 24 * 60 * 60 * 1000)
    );

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

function checkCookie() {
    var status = getCookie("cookie-status");

    if (status == 1) {
        $('#cookie').css("display", "none");
    } else {
        $('#cookie').css("display", "flex");
        $('#cookie .content .close').click(function() {
            $('#cookie .content').addClass('close-animation');
                
            setTimeout(function() {
                $('#cookie .content').css("display", "none");
            }, 1000);

            initCookie("cookie-status", 1, 30);
        });
    }
};