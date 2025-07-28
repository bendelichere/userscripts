// ==UserScript==
// @name         NST lib
// @namespace    napali.boardriders
// @version      25.7.28.1
// @icon         https://manager.boardriders-staging.p.newstore.net/favicon.ico
// @description  let's enhance some stuff (order search)
// @author       Benjamin Delichere
// @match        https://*.newstore.net/*
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

    var onFetch = (interceptingCallback) => {
        const {fetch: origFetch} = window;
        window.fetch = async (...args) => {
            const response = await origFetch(...args);
            response
                .clone()
                .json()
                .then(data => interceptingCallback(data))
                .catch(err => console.error(err));

            /* the original response can be resolved unmodified: */
            return response

            /* or mock the response: */
            /*return new Response(JSON.stringify({
                userId: 1,
                id: 1,
                title: "Mocked!!",
                completed: false
            }))*/
        }
    }


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

    var doAddProductSearchForm = () => {
        waitForElm('span.bp3-button-text').then((elm)=>{addProductSearchForm(elm)})
        delegate(document, "click", "a", (event) => {waitForElm('span.bp3-button-text').then((elm)=>{addProductSearchForm(elm)})})
    }

    var addProductSearchForm = (elm) => {
        if (document.getElementById('brdSearchOrder')) return false;

        var leForm = document.createElement("form")
        leForm.setAttribute("method", "get")
        leForm.setAttribute("action", "#")
        leForm.setAttribute("onSubmit", "var laLocation=\"/sales/orders?page=0&pageSize=10&q=\"+document.getElementById(\'brdSearchOrder\').value+\"&sortBy=placedAt&dir=desc\"; document.location= laLocation; return false;")
        var leInput = document.createElement("input")
        leInput.setAttribute('id', 'brdSearchOrder')
        leInput.setAttribute('type', 'text')
        leInput.setAttribute('style', 'width: 300px;height: 34px;padding: 0px 0px 0px 30px;margin: 0px 15px;font-weight: 300;border: none;background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPGcgaWQ9IkdlbmVyYWwtU2hlZXQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC00MDQuMDAwMDAwLCAtMTUwOS4wMDAwMDApIiBmaWxsPSIjNTg2NzZDIj4KICAgICAgPHBhdGggZD0iTTQyMy44OTYzMTQsMTUyOC4zOTU4MyBMNDE4LjI2NDU3NCwxNTIyLjc2Mzc0IEM0MTkuNjA2Njg5LDE1MjEuMzAxNTkgNDIwLjQzMjYwNiwxNTE5LjM1NzU0IDQyMC40MzI2MDYsMTUxNy4yMTYzIEM0MjAuNDMyNjA2LDE1MTIuNjc4NzYgNDE2Ljc1Mzg0NiwxNTA5IDQxMi4yMTYzMDMsMTUwOSBDNDA3LjY3ODc2LDE1MDkgNDA0LDE1MTIuNjc4NzYgNDA0LDE1MTcuMjE2MyBDNDA0LDE1MjEuNzUzODUgNDA3LjY3ODc2LDE1MjUuNDMyNjEgNDEyLjIxNjMwMywxNTI1LjQzMjYxIEM0MTQuMzU3NTQzLDE1MjUuNDMyNjEgNDE2LjMwMTIzNSwxNTI0LjYwNjY5IDQxNy43NjM3MzcsMTUyMy4yNjQ1NyBMNDIzLjM5NTgzNCwxNTI4Ljg5NjMxIEM0MjMuNTM0MDgyLDE1MjkuMDM0NTYgNDIzLjc1ODA2NiwxNTI5LjAzNDU2IDQyMy44OTYzMTQsMTUyOC44OTYzMSBDNDI0LjAzNDU2MiwxNTI4Ljc1ODQyIDQyNC4wMzQ1NjIsMTUyOC41MzQwOCA0MjMuODk2MzE0LDE1MjguMzk1ODMgTDQyMy44OTYzMTQsMTUyOC4zOTU4MyBaIE00MTIuMjE2MzAzLDE1MjQuNzE4MTUgQzQwOC4wNzMxNDMsMTUyNC43MTgxNSA0MDQuNzE0NDYxLDE1MjEuMzU5ODIgNDA0LjcxNDQ2MSwxNTE3LjIxNjMgQzQwNC43MTQ0NjEsMTUxMy4wNzMxNCA0MDguMDczMTQzLDE1MDkuNzE0NDYgNDEyLjIxNjMwMywxNTA5LjcxNDQ2IEM0MTYuMzU5NDYzLDE1MDkuNzE0NDYgNDE5LjcxODE0NSwxNTEzLjA3MzE0IDQxOS43MTgxNDUsMTUxNy4yMTYzIEM0MTkuNzE4MTQ1LDE1MjEuMzU5ODIgNDE2LjM1OTQ2MywxNTI0LjcxODE1IDQxMi4yMTYzMDMsMTUyNC43MTgxNSBMNDEyLjIxNjMwMywxNTI0LjcxODE1IFoiIGlkPSJJbXBvcnRlZC1MYXllcnMtNSI+PC9wYXRoPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==) left center no-repeat !important;')
        leInput.setAttribute('placeholder', 'Search Order ID, Customer, Coupon, SKU')
        leForm.appendChild(leInput)
        var leButton, leDiv
        elm.parentNode.parentNode.querySelectorAll('span').forEach((span) => {
            if (span.innerHTML.toLowerCase() == 'edit shipping info') {
                leButton = span.parentNode
                leDiv = leButton.parentNode
            } else console.log(span.innerHTML)
        })
        if (typeof leDiv !== 'undefined') leDiv.insertBefore(leForm,leButton)
    }

    var doAutoOpenLeftav = () => {
        waitForElm('div.nom menu').then((elm)=>{
            document.querySelectorAll('[data-icon="chevron-right"]').forEach((elm)=>{
                elm.parentNode.click()
            })
        })
    }

    var doAddSkuInventoryLink = () => {
        waitForElm('div.nom-main span.ant-descriptions-item-label').then((elm)=>{
            document.querySelectorAll('span.ant-descriptions-item-label').forEach((elm)=>{
                if (elm.innerHTML=='SKU') {
                    var currentSKU = elm.nextSibling.innerHTML
                    var aLinkToInventory = document.createElement("a")
                    aLinkToInventory.target = '_blank'
                    aLinkToInventory.href = '/catalog/stocks?page=0&pageSize=100&q='+currentSKU
                    aLinkToInventory.innerHTML = currentSKU
                    elm.nextSibling.innerHTML = aLinkToInventory.outerHTML
                }
            });
        })
    }

    var doAutoOpenIfOneOrderFound = () => {
        waitForElm('div.nom-main div.ReactTable div.rt-th span span span').then((elm)=>{
            if (document.querySelectorAll('div.rt-th span span span')[0].innerHTML.indexOf('Order ID')>-1
                   && document.querySelectorAll('div.rt-tr').length == 2) {
               document.querySelectorAll('div.rt-tr')[1].querySelector('div.rt-td a').click()
            }
        })
    }

    var doDisplayOrdersCount = () => {
        onFetch((data)=>{
            if (typeof data.pagination_info === 'undefined') return false
            if (typeof data.pagination_info.total === 'undefined') return false
            if (typeof data.pagination_info.next_url === 'undefined') return false
            if (data.pagination_info.next_url.indexOf('customer_orders') == -1) return false
            if (document.querySelector('[data-id="orders_header"] h1') === null) return false

            document.querySelector('[data-id="orders_header"] h1').innerHTML = 'Orders ('+data.pagination_info.total+')'
        })
    }

    var doSkipLoginRedirectPage = () => {
        waitForElm('div#root a[href*="/login/perform"]').then((elm)=>{
            elm.click();
        });
    }

    var doClickLoginButton = () => {
        waitForElm('#btn-login').then((elm)=>{
            if (document.getElementById("email").value.length > 0
            && document.getElementById("password").value.length > 0) {
                setTimeout(()=>elm.click(), 200);
            }
        });
    }



    var runForestRun = () => {
        // add order search form in order detail page
        doAddProductSearchForm()

        // add link to product's inventory beside product's SKU
        doAddSkuInventoryLink()

        // auto open leftnav submenus
        doAutoOpenLeftav()

        // if 1 order found open order details page
        doAutoOpenIfOneOrderFound()

        // automatically skip login redirect page
        doSkipLoginRedirectPage()

        // try to click login button if we are on login page
        doClickLoginButton()
    }

    // time to RUN !!!
    runForestRun()

})();
