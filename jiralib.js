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

    /**
    This function adds buttons that will appear on the "Create Issue" modal window that 
    can be used to insert a "feature" or "bug" template into the description field. 
    */
    function setupDescriptionTemplateButtons() {
        var ticketDescription = $('#description-wiki-edit');
        var btnFeatureExists = $('#btnFeature').length > 0;

        if (ticketDescription.length && !btnFeatureExists) {
            $('#description-wiki-edit')
                .append("<button id='btnFeature'>add feature template</button>")
                .append("<button id='btnBug'>add bug template</button>");

            $('#btnFeature').on('click', function (e) {
                e.preventDefault();
                ticketDescription.find('textarea').val(`{panel:title=GENERAL REQUIREMENTS}
TBD
{panel}
{panel:title=TECHNICAL DESIGN}
The design that the developer is going to implement should be here.
DEV to fill in.
{panel}
{panel:title=METADATA / CONTENT / DEPLOYMENT}
Any metadata needed for this ticket should be defined here.
Deployment instructions should be here too.
DEV to fill in.
{panel}
`);
                return false;
            });

            $('#btnBug').on('click', function (e) {
                 e.preventDefault();
                 ticketDescription.find('textarea').val(`{panel:title=ISSUE}
TBD
{panel}
{panel:title=ANALYSIS}
TBD
{panel}
{panel:title=RESOLUTION}
TBD
{panel}`);
                 return false;
             });
         }
    }

    var realST = window.setTimeout
    window.setTimeout = function(fn,delay) {
        setupDescriptionTemplateButtons();
        return realST(fn,delay);
    };
})();
