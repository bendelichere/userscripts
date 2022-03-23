// ==UserScript==
// @name         Jenkins lib
// @namespace    napali.boardriders
// @version      22.3.23.0
// @icon         https://dappv-01.bbgops.com/jenkins/favicon.ico
// @description  let's click faster
// @author       Benjamin Delichere
// @match        https://dappv-01.bbgops.com/jenkins/*
// @grant        none
// @copyright    Benjamin Delichere
// @license      X11 (MIT)
// ==/UserScript==

(function() {
    'use strict';

    // let's get things done
    let runForestRun = function () {
        if (typeof jQuery === 'undefined') return;

        let clickAll = function (nameArray) {
            for(var i=0;i<nameArray.length;i++) jQuery("input[name*='"+nameArray[i]+"']").click();
        };

        // version and build button on top
        var gridDiv = jQuery("form[name='parameters'] > div > div:nth-child(1)");
        var versionDiv = jQuery("form[name='parameters'] > div > div:nth-child(2)");
        var buttonDiv = jQuery("form[name='parameters'] > div > div:nth-child(3)");
        gridDiv.insertAfter(versionDiv);
        buttonDiv.insertAfter(versionDiv);

        // inlinize version div
        buttonDiv.find('div').css('display','inline');
        versionDiv.find('div').css('display','inline');
        versionDiv.css('display','inline-block');
        buttonDiv.css('display','inline');

        // remove useless titles
        versionDiv.find(':contains("Release Version")').remove();
        gridDiv.find('div:contains("BuildConfig")')[0].remove();
        jQuery('#main-panel > h1, #main-panel h3, #main-panel > p').remove();
        jQuery('.setting-main').css('margin-top','0');

        // clicking on the "Realm" cell toggles all the checkboxes
        jQuery('th:contains("Realm")')[0].on('click',function(){clickAll(["DEV","STG"]);});

        // clicking on "Staging" column title cell toggles all the column's checkboxes
        jQuery('th:contains("Staging")')[0].on('click',function(){clickAll(["STG"]);});

        // clicking on "Development" column title cell toggles all the column's checkboxes
        jQuery('th:contains("Development")')[0].on('click',function(){clickAll(["DEV"]);});

        // clicking on the first cell of a row toggles all the row's checkboxes
        jQuery('#editor_BuildConfig_holder input[type=text]').parent().closest('td').on('click',function(){
            jQuery(this).parent("tr").find("input[type=checkbox]").click();
        });

        // clicking on a cell of containing several checkboxes toggles all the cell's checkboxes
        jQuery('#editor_BuildConfig_holder > div > div.well.well-sm > table > tbody > tr > td').on('click',function(e){
            e.stopPropagation();
            jQuery(this).find("input[type=checkbox]").click();
        });

        // clicking on any of a toggles all the checkboxes inside
        jQuery('#editor_BuildConfig_holder > div > div.well.well-sm > table > tbody > tr > td > div > table > tbody > tr > td').on('click',function(e){
            e.stopPropagation();
            if (e.target.localName != 'input')
                jQuery(this).find("input[type=checkbox]").click();
        });
    };

    // let's a RUN !!!
    runForestRun();
})();
