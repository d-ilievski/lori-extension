import Vue from 'vue';
const vm = new Vue();

/* eslint-disable */

// The Browser API key obtained from the Google API Console.
// Replace with your own Browser API key, or your own key.
var developerKey = "AIzaSyDWDxLYGPA-dE55v5kzpkQs7T3O4k2QspA";

// Replace with your own project number from console.developers.google.com.
// See "Project number" under "IAM & Admin" > "Settings"
var appId = "184372812916";

var pickerApiLoaded = false;

var oauthToken;

// Use the Google API Loader script to load the google.picker script.
function loadPicker() {
    gapi.load('auth', { 'callback': onAuthApiLoad });
    gapi.load('picker', { 'callback': onPickerApiLoad });
}

function onAuthApiLoad() {

    // eslint-disable-next-line
    chrome.identity.getAuthToken(
        {
            interactive: true
        },
        handleAuthResult);
}

function onPickerApiLoad() {
    pickerApiLoaded = true;
    createPicker();
}

function handleAuthResult(accessToken) {
    if (accessToken) {
        oauthToken = accessToken;
        createPicker(accessToken);
    }
}

// Create and render a Picker object for searching images.
function createPicker(oauthToken) {
    if (pickerApiLoaded && oauthToken) {
        var view = new google.picker.View(google.picker.ViewId.DOCS_IMAGES);
        // view.setMimeTypes("image/png,image/jpeg,image/jpg");
        var picker = new google.picker.PickerBuilder()
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            // .enableFeature(google.picker.Feature.SUPPORT_DRIVES)
            .setAppId(appId)
            .setOAuthToken(oauthToken)
            .addView(view)
            .setDeveloperKey(developerKey)
            .setOrigin(window.location.protocol + '//' + window.location.host)
            .setCallback(pickerCallback)
            .build();
        picker.setVisible(true);
    }
}

// A simple callback implementation.
function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
        
        vm.$eventBus.$emit('goolgeDrivePicked', {id: data.docs[0].id, token: oauthToken});
    }
}

export default loadPicker;