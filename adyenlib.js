// ==UserScript==
// @name         ADYEN lib
// @namespace    napali.boardriders
// @version      22.6.16.1
// @description  let's capture better
// @author       Benjamin Delichere
// @match        https://*.adyen.com/*
// @icon         https://ca-test.adyen.com/ca/img/adyen/favicon.ico
// @grant        none
// @copyright    Benjamin Delichere
// @license      X11 (MIT)
// ==/UserScript==

(function(){

    var runForestRun = function () {
        jQuery('#app-content').on('click', '.loading-button',() => {autoClickLoadMoreWebhooks();});
        autoClickLoadMoreWebhooks();
    };

    var waitForElm = function (selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {return resolve(document.querySelector(selector));}
            const observer = new MutationObserver(mutations => {if (document.querySelector(selector)) {resolve(document.querySelector(selector));observer.disconnect();}});
            observer.observe(document.body, {childList: true,subtree: true});
        });
    };

    var autoClickLoadMoreWebhooks = function () {
        waitForElm('.loading-button').then((elm) => {window.setTimeout(()=>{jQuery(elm).click();},500);});
    }

    runForestRun();
})();
