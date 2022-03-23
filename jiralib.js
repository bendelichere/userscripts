// ==UserScript==
// @name         JIRA lib
// @namespace    napali.boardriders
// @version      22.3.21.0
// @description  let's ticket better
// @author       Benjamin Delichere
// @match        https://jira.boardriders.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=boardriders.com
// @grant        none
// @copyright    Benjamin Delichere
// @license      X11 (MIT)
// ==/UserScript==

(function(){
    // no durations, REAL DATES !!!
    var realST = window.setTimeout
    window.setTimeout = function(fn,delay) {
        $('time.livestamp').each(function(){$(this).text($(this).parent()[0].title);});
        return realST(fn,delay);
    };
})();
