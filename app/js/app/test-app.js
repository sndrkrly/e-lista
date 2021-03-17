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

let loadedShoppingLists = [];
let shoppingList, shoppingListID;
let shoppingListData = localStorage.getItem("shoppingListData");

$(document).ready(function() {
    if (thingsToBuyData) {
        thingsToBuyList = JSON.parse(thingsToBuyData);
        thingsToBuyID = thingsToBuyList.lenght;

        loadThingsToBuy(thingsToBuyList);
    } else {
        thingsToBuyList = [];
        thingsToBuyID = 0;
    }

    if (shoppingListData) {
        shoppingList = JSON.parse(shoppingListData);
        shoppingListID = shoppingList.lenght;

        loadShoppingLists(shoppingList);
    } else {
        shoppingList = [];
        shoppingListID = 0;
    } 
});

function loadThingsToBuy(array) {
    array.forEach(function(thing) {
        addThingToBuy(thing.name, thing.id, thing.have, thing.trash);
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
    
    thingsToBuyList[element.thingsToBuyID].have = thingsToBuyList[element.thingsToBuyID].have ? false : true;
}

function deleteThing(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    thingsToBuyList[element.thingsToBuyID].trash = true;
}

function loadShoppingLists(array) {
    array.forEach(function(list) {
        addShoppingList(list.name, list.date); 
    });
}

function addShoppingList(name, date, lists) {
    lists = localStorage.getItem("thingsToBuyData");
    loadedShoppingLists[name] = {
        "name": name,
        "date": date,
        "lists": lists,
    };

        
    console.log(loadedShoppingLists[name].name);
}

$(".header .refresh-list").bind("click", function() {
    let hasItems = localStorage.getItem("thingsToBuyData");

    if (hasItems) {
        localStorage.clear();
        location.reload();
    } else {
        console.log("üres, nincs mit törölni");
    }
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
            addThingToBuy(thingToShop, shoppingListID, false, false);
            
            thingsToBuyList.push({
                name : thingToShop,
                id : shoppingListID,
                have : false,
                trash : false
            });
            
            localStorage.setItem("thingsToBuyData", JSON.stringify(thingsToBuyList));
            thingsToBuyID++;
        }
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
    addShoppingList();
});