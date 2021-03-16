/* 
    Created by Király Sándor on 03/16/21.

    Copyright © Király Sándor.
    All rights reserved.
*/

import '../jquery/jquery-3.6.0.min.js';

$(window).bind('scroll', function (e) {
    if (!$('#header nav').hasClass('open'))
        checkHeader();
});

if ($('#header nav').hasClass('open'))
    checkHeader();

$('#header .toggle-button').click(function() {        
    if (!$('#header nav').hasClass('open')) {
        $('#header nav').addClass('open');
        $('#header .toggle-button').addClass('close');
                
        $('#header').removeClass('dark');
        $('#header .background').removeClass('blur');
    } else {
        $('#header nav').removeClass('open');
        $('#header .toggle-button').removeClass('close');
        
        if(!$("#header nav").hasClass('open')) { 
            var lastScroll = $(window).scrollTop();
           
            if (lastScroll >= 250 + 250) {
                setTimeout(function() {
                    $('#header .background').addClass('blur');
                }, 400);
            }
        }
    }
});

var lastScroll = $(window).scrollTop();
var deltaScroll = lastScroll - $(window).scrollTop();

function checkHeader() {
    var hidden = false;
    var isHiding = false;

    if (deltaScroll < 0) {
        hidden = false;
    } else {
        hidden = true;
    }

    deltaScroll = lastScroll - $(window).scrollTop();

    if ($(window).scrollTop() > 250 + 250) {
        $('#header .background').addClass('blur');
    } else {
         $('#header .background').removeClass('blur');
    }

    lastScroll = $(window).scrollTop()
}

$('a[href*="#"]').click(function(event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000, function() {
                var $target = $(target);
                $target.focus();

                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex','-1');
                    $target.focus(); 
                };
            });
        }
    }
});