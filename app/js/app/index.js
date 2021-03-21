/* 
    Created by Sándor Király on 03/17/21.

    Copyright © Sándor Király.
    All rights reserved.
*/

import '../jquery/index.js';

const CHECK = "fa-check-square";
const UNCHECK = "fa-square";

const LINE_THROUGH = "lineThrough";

let thingsToBuyList, thingsToBuyID;
let thingsToBuyData = localStorage.getItem("thingsToBuyData");

$(document).ready(function() {
    $.getScript("app/js/cookie/index.js", function() {
        const listName = getCookie("lastEditedListName");

        if (listName != "") {
            document.title = listName;
        } else {
            document.title = "Lista #1";
        }
        
        $("#container .header .title input").val(listName);
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
    array.forEach(function(v) {
        addThingToBuy(v.name, v.id, v.have, v.trash);
    });
}

function addThingToBuy(name, id, have, trash) {
    if (trash) { 
        return; 
    }

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

$("#container .header .undo-list").bind("click", function() {
    localStorage.clear();
    location.reload();

    $.getScript("app/js/cookie/index.js", function() {
        $("#container .add-an-item input").val("");
        initCookie("lastEditedListName", "", 30);
    });
});

$(document).ready(function() {
    const currentDate = new Date();
    const currentDateOptions = {
        weekday : "long", 
        month: "long", 
        day: "numeric"
    };

    $("#container .header .date").html(currentDate.toLocaleDateString("hu-HU", currentDateOptions).replace(",", " · ").replace(".", " "));
});

$(document).bind("keyup", function(event) {
    if (event.keyCode == 13) {
        var thingToShop = $("#container .add-an-item input").val();

        if (thingToShop.length > 0 && thingToShop != "Elem hozzáadása") {
            addThingToBuy(thingToShop, thingsToBuyID, false, false);
            
            thingsToBuyList.push({
                "name": thingToShop,
                "id": thingsToBuyID,
                "have": false,
                "trash": false
            });
            
            localStorage.setItem("thingsToBuyData", JSON.stringify(thingsToBuyList));
            thingsToBuyID++;
        }

        $("#container .add-an-item input").val("");
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

$("#container .header .save-list").bind("click", function() {
    const LIST_NAME = $("#container .header .title input").val();
    const LIST_DATAS = thingsToBuyData;

    if (LIST_NAME.length == 0) {
        $("#container .header .popup").html("Nincs megadva lista név!");
        
        setTimeout(function() {
            $('#container .header .popup').html("");
        }, 1000);

        return;
    }
    
    const listSaveJSON = '{"listName": "' + LIST_NAME + '"}';

    $.getScript("app/js/cookie/index.js", function() {
        var savedArrayJSON = JSON.parse(listSaveJSON);

        document.title = savedArrayJSON.listName;
        initCookie("lastEditedListName", savedArrayJSON.listName, 30);
    });
});

$(document).ready(function() {
    $.getScript("app/js/cookie/index.js", function() {
        $("#container .header .title input").on("change", function() {            
            document.title = $("#container .header .title input").val();;
        });
    });
});