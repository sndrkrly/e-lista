/* 
    Created by Sándor Király on 03/17/21.

    Copyright © Sándor Király.
    All rights reserved.
*/

import '../jquery/jquery-3.6.0.min.js';

const LINE_THROUGH = "lineThrough";

const UNCHECK = "fa-circle-thin";
const CHECK = "fa-check-circle";

let thingsToBuyList, thingsToBuyID;
let thingsToBuyData = localStorage.getItem("thingsToBuyData");

$(document).ready(function() {
    $.getScript("app/js/cookie/cookie.js", function() {
        const listName = getCookie("lastEditedListName");

        if (listName != "") {
            document.title = listName;
        } else {
            document.title = "Lista #1";
        }
        
        $(".header .title input").val(listName);
    });

    if (thingsToBuyData) {
        thingsToBuyList = JSON.parse(thingsToBuyData);
        thingsToBuyID = thingsToBuyList.lenght;

        loadThingsToBuy(thingsToBuyList);
    } else {
        thingsToBuyList = [];
        thingsToBuyID = 0;
    }
});

function loadThingsToBuy(array) {
    array.forEach(function(thing) {
        addThingToBuy(thing.name, thing.id, thing.have, thing.trash);
    });
}

function addThingToBuy(name, id, have, trash) {
    if (trash) { return; }

    const HAVE = have ? CHECK : UNCHECK;
    const LINE = have ? LINE_THROUGH : "";

    const item = `<li class="item">
                    <i class="fa ${HAVE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${name}</p>
                    <i class="fa fa-times de" job="delete" id="${id}"></i>
                  </li>
                `;

    const position = "beforeend";
    list.insertAdjacentHTML(position, item);       
}

function buyThing(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    thingsToBuyList[element.id].have = thingsToBuyList[element.id].have ? false : true;
}

function deleteThing(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    thingsToBuyList[element.id].trash = true;
}

$(".header .undo-list").bind("click", function() {
    localStorage.clear();
    location.reload();

    $.getScript("app/js/cookie/cookie.js", function() {
        $(".add-to-do input").val("");
        initCookie("lastEditedListName", "", 30);
    });
});

$(document).ready(function() {
    const currentDate = new Date();
    const dateOptions = {
        weekday : "long", 
        month: "long", 
        day: "numeric"
    };

    $(".header .date").html(currentDate.toLocaleDateString("hu-HU", dateOptions));
});

$(document).bind("keyup", function(event) {
    if (event.keyCode == 13) {
        var thingToShop = $(".add-to-do input").val();

        if (thingToShop.length > 0 && thingToShop != "Elem hozzáadása") {
            addThingToBuy(thingToShop, thingsToBuyID, false, false);
            
            thingsToBuyList.push({
                name: thingToShop,
                id: thingsToBuyID,
                have: false,
                trash: false
            });
            
            localStorage.setItem("thingsToBuyData", JSON.stringify(thingsToBuyList));
            thingsToBuyID++;
        }

        $(".add-to-do input").val("");
    }
});

$("#list").bind("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if (elementJob == "complete") {
        buyThing(element);
    } else if (elementJob == "delete") {
        deleteThing(element);
    }
    
    localStorage.setItem("thingsToBuyData", JSON.stringify(thingsToBuyList));
});

$(".header .save-list").bind("click", function() {
    const LIST_NAME = $(".header .title input").val();
    const LIST_DATAS = thingsToBuyData;

    if (LIST_NAME.length == 0) {
        $(".header .popup").html("Nincs megadva lista név!");
        
        setTimeout(function() {
            $('.header .popup').html("");
        }, 1000);

        return;
    }
    
    const listSaveJSON = '{"listName": "' + LIST_NAME + '", "listDatas": "' + LIST_DATAS + '"}';

    $.getScript("app/js/cookie/cookie.js", function() {
        var savedArrayJSON = JSON.parse(listSaveJSON);

        document.title = savedArrayJSON.listName;
        initCookie("lastEditedListName", savedArrayJSON.listName, 30);
    });
});