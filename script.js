/*  Project 01_11_04

    Author: Nathan Howard
    Date:   09.05.18

    Filename: script.js
*/

"use strict";

var httpRequest = false;  //variable to store XHR request in 
var countrySel = null;

//function that will check the country selection
function checkButtons() {
    var germany = document.getElementById("germany");
    var us = document.getElementById("us");
    if (germany.checked || us.checked) {
        document.getElementById("zipset").style.visibility = "visible"
        if (germany.checked) {
            countrySel = "de"
        } else {
            countrySel = "us"
        }
    }
}

//function that will process and display the data gotten from the AJAX request
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText)
        var city = document.getElementById("city")
        var state = document.getElementById("state")
        city.value = resultData.places[0]["place name"]
        state.value = resultData.places[0]["state abbreviation"]
        document.getElementById("zip").blur()
        document.getElementById("csset").style.visibility = "visible"
    }
}

//function to create a new request object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest
    }
    catch (requestError) {
        document.getElementById("csset").style.visibility = "visible"
        var zip = document.getElementById("zip").value
        if (zip.addEventListener) {
            zip.removeEventListener("keyup", checkInput, false)
        } else if (zip.attachEvent) {
            zip.detachEvent("onkeyup", checkInput);
        }
        return false;
    }
    
    return httpRequest;
}

//function to find the location
function getLocation() {
    var zip = document.getElementById("zip").value
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/" + countrySel + "/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}

//function to check inputs
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation()
    } else {
        document.getElementById('city').value = "";
        document.getElementById('state').value = "";
    }
}

//event handlers

//event handler to which country is selected
var germany = document.getElementById("germany");
var us = document.getElementById("us");
if (us.addEventListener) {
    germany.addEventListener("click", checkButtons, false);
    us.addEventListener("click", checkButtons, false);
} else if (us.attachEvent) {
    germany.attachEvent("onclick", checkButtons);
    us.attachEvent("onclick", checkButtons);
}

//event handler to get location
var zip = document.getElementById("zip").value;
if (window.addEventListener) {
    window.addEventListener("keyup", checkInput, false)
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput)
};
