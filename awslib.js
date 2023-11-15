// ==UserScript==
// @name         AWS lib
// @namespace    napali.boardriders
// @version      23.11.15.1
// @icon         https://d19soru4bzonzg.cloudfront.net/assets/Prod/us-west-2/3890bfbe9059870174d403d8d884fd0e/favicon.png
// @description  let's enhance some stuff (dashboard)
// @author       Benjamin Delichere
// @match        https://cloudwatch.amazonaws.com/dashboard.html*
// @grant        none
// @copyright    Benjamin Delichere
// @license      X11 (MIT)
// ==/UserScript==

(function() {
    'use strict';

    ///////////////////////////////
    //////////// MAIN /////////////
    ///////////////////////////////
    // let's get things done

    var waitForElm = (selector) => {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {return resolve(document.querySelector(selector))}
            const observer = new MutationObserver(mutations => {if (document.querySelector(selector)) {resolve(document.querySelector(selector));observer.disconnect()}})
            observer.observe(document.body, {childList: true,subtree: true})
        })
    }

    var delegate = (el, evt, sel, handler) => {
        el.addEventListener(evt, function(event) {
            var t = event.target;
            while (t && t !== this) {
                if (t.matches(sel)) {handler.call(t, event)}
                t = t.parentNode
            }
        })
    }

    /*
    var myNodeList = document.querySelectorAll('li'); // grabs some <li>
[].forEach.call(myNodeList, function (item) {
  // :) hooray `item` can be used here
});
    */

    var hover = (element, enter, leave) => {
        element.addEventListener('mouseenter', enter)
        element.addEventListener('mouseleave', leave)
    }

    var iterateAndCallback = (element, myCallback) => {
        waitForElm(element).then((elm)=>{
            var logsInsightDivs = document.querySelectorAll(element)
            var myArrayOfDivs = []; // empty at first
            for (var i = 0; i < logsInsightDivs.length; i++) {myArrayOfDivs.push(logsInsightDivs[i])}
            myArrayOfDivs.forEach((e)=>{
                myCallback(e)
            })
        })
    }

    var doAddLinkCallback = (elm) => {
        hover(elm,e=>{
            let logsInsightNodes = e.target.querySelectorAll('div.body-row div.query-results-cell div')
            for (var i = 0; i < logsInsightNodes.length; i++) {
                //if(logsInsightNodes[i].innerHTML.match(/[A-Z]{2}-[A-Z]{2}/) !== null) {}
                if(logsInsightNodes[i].innerHTML.match(/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/) !== null) {
                    let nstId = logsInsightNodes[i].innerHTML
                    logsInsightNodes[i].innerHTML = '<a href="https://manager.boardriders.p.newstore.net/sales/orders/'+nstId+'" target="_blank">'+nstId+'<a>'
                }
            }
        },e=>{})
    }

    var doLinkyfyOrderIds = () => {
        iterateAndCallback('div.cwdb-scrollGrid-container',(elm)=>{doAddLinkCallback(elm)})
        iterateAndCallback('div.cwdb-widget-preview-wrapper',(elm)=>{doAddLinkCallback(elm)})
    }
/*        waitForElm('div.cwdb-scrollGrid-container').then((elm)=>{
            var logsInsightDivs = document.querySelectorAll('div.cwdb-scrollGrid-container')
            var myArrayOfDivs = []; // empty at first
            for (var i = 0; i < logsInsightDivs.length; i++) {myArrayOfDivs.push(logsInsightDivs[i])}
            myArrayOfDivs.forEach((elm)=>{
                //addOrderLink(elm)
                console.log(elm.innerHTML)
                hover(elm,e=>{
                    //console.log('entered',e)
                    e.target
                },e=>{
                    //console.log('leaved',e)
                })
            })
        })
    }*/

    var runForestRun = () => {
        // add order search form in order detail page
        doLinkyfyOrderIds()
    }

    // time to RUN !!!
    runForestRun()

})();
