# userscripts
## multipurpose multi-site BRD userscripts toolbox

- JENKINS LIB: click heaven !
  - clicking the **Realms** cell toggles ALL the checkboxes 
  - clicking a row toggles all the checkboxes in that row
  - clicking a column toggles all the checkboxes in that column
  - clicking a cell toggles all the checkboxes in that cell
  - bonus feature 1: removed useless labels
  - bonus feature 2: version selector and build button are now at the top of the page

- JIRA LIB:
  - replace durations in the comments title by the real datetime (we don't want to know that a comment was posted 5 days ago, we want the exact date and time)

- SFCC LIB:
  - prevent "Any" required qualifiers unintentional creation in Campaign editor
  - dropdown list of sites in alphabetical order 
  - Manage Sites : added "Open All" links
  - Manage Sites : added direct links to Settings & Cache
  - Site Exports : added "Click all" and "Click all brands" links

- ADYEN LIB:
  - Webhooks listing page : auto-click load-more button until no more page to load

## install instructions

If it's not already installed on your Google Chrome browser, please install the Tampermonkey extenstion.
Then proceed to installing one (or several) of the toolbox libraries provided here.

### install Tampermonkey:
- go to https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
- click the **Add to Chrome** button

### install scripts in Tampermonkey:
- copy the script's URL you want to install
  - SFCC LIB https://raw.githubusercontent.com/bendelichere/userscripts/main/sfcclib.js
  - JENKINS LIB : https://raw.githubusercontent.com/bendelichere/userscripts/main/jenkinslib.js
  - JIRA LIB https://raw.githubusercontent.com/bendelichere/userscripts/main/jiralib.js
  - ADYEN LIB https://raw.githubusercontent.com/bendelichere/userscripts/main/adyenlib.js
- click Chrome's extension button (right of URL bar, puzzle piece shaped icon 🧩)
- click the **Tampermonkey** label (not the 3 dots)
- click the **Dashboard** label (it will open a new browser tab)
- click on the **Utilities** tab
- paste the copied URL in **Import from URL**
- click **Install** button
- click **Install** button (yes, the other one)
- voilà ! (goto Jenkins, Jira, or SFCC and enjoy)

## update instructions
- click Chrome's extension button (right of URL bar, puzzle piece shaped icon 🧩)
- click the **Tampermonkey** label (not the 3 dots)
- click the **Dashboard** label (it will open a new browser tab)
- click SFCC lib's checkbox (on the left of the installed scripts list)
- select **Trigger Update** action in **Apply this to all selected scripts** selectbox
- click **Start** button
- voilà ! (goto Jenkins, Jira, or SFCC and enjoy)

